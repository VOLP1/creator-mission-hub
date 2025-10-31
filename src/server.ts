import express from 'express'
import cors from 'cors'
import { z } from 'zod'
import jwt from 'jsonwebtoken'
import pool from './db.js'
import authMiddleware from './auth.middleware.js'

const app = express()
app.use(cors())
app.use(express.json())

const signSchema = z.object({
  name: z.string().min(2, 'Nome é obrigatório'),
  email: z.string().email('Formato de e-mail inválido').min(1, 'E-mail é obrigatório'),
})

// Schema para criação de missão
const missionSchema = z.object({
  mission_type: z.enum(['PHYSICAL', 'DIGITAL', 'COMMUNITY']),
  suggestion: z.string().min(5, 'Sugestão muito curta'),
})

// GET signatures
app.get('/api/v1/manifesto/signatures', async (_req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, created_at FROM manifesto_signatures ORDER BY created_at ASC',
    )
    return res.status(200).json((result as any).rows)
  } catch (err) {
    return res.status(500).json({ message: 'Erro ao buscar assinaturas' })
  }
})

// POST sign manifesto
app.post('/api/v1/manifesto/sign', async (req, res) => {
  // 1) validação
  const validation = signSchema.safeParse(req.body)
  if (!validation.success) {
    return res.status(400).json({ message: validation.error.errors[0]?.message || 'Dados inválidos' })
  }

  const { name, email } = validation.data
  const jwtSecret = process.env.JWT_SECRET || 'segredo-padrao'

  try {
    // 2) tenta inserir novo fundador (201)
    const insertQuery =
      'INSERT INTO manifesto_signatures (name, email) VALUES ($1, $2) RETURNING id, name, created_at'
    const insertResult = await pool.query(insertQuery, [name, email])
    const newFounder = (insertResult as any).rows[0]
    const token = jwt.sign({ id: newFounder.id }, jwtSecret, { expiresIn: '30d' })
    return res.status(201).json({ user: newFounder, token })
  } catch (err: any) {
    // 3) se for unique violation, faz login (200)
    if (err?.code === '23505') {
      try {
        const findQuery = 'SELECT id, name, created_at FROM manifesto_signatures WHERE email = $1'
        const findResult = await pool.query(findQuery, [email])
        if (!(findResult as any).rows?.length) {
          return res.status(404).json({ message: 'E-mail duplicado, mas não encontrado.' })
        }
        const existingUser = (findResult as any).rows[0]
        const token = jwt.sign({ id: existingUser.id }, jwtSecret, { expiresIn: '30d' })
        return res.status(200).json({ user: existingUser, token })
      } catch (findErr) {
        return res.status(500).json({ message: 'Erro interno ao buscar usuário existente.' })
      }
    }
    // 4) outros erros
    return res.status(500).json({ message: 'Erro interno do servidor.' })
  }
})

// POST criar missão (protegido)
app.post('/api/v1/missions', authMiddleware, async (req, res) => {
  const validation = missionSchema.safeParse(req.body)
  if (!validation.success) {
    return res.status(400).json({ message: 'Dados inválidos' })
  }

  const { mission_type, suggestion } = validation.data
  const founderId = (req as any).user?.id

  if (!founderId) {
    return res.status(401).json({ message: 'ID do fundador não encontrado no token.' })
  }

  try {
    const query = `
      INSERT INTO missions (founder_id, mission_type, suggestion)
      VALUES ($1, $2, $3)
      RETURNING id, founder_id, mission_type, suggestion
    `
    const result = await pool.query(query, [founderId, mission_type, suggestion])
    return res.status(201).json((result as any).rows[0])
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Erro ao salvar a missão.' })
  }
})

export default app

// Start HTTP server only outside of test runs
const PORT = process.env.PORT || 4000

if (!process.env.VITEST) {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
  })
}
