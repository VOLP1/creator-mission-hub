import express from 'express'
import cors from 'cors'
import z from 'zod'
import pool from './db'

const app = express()
app.use(cors())
app.use(express.json())

const emailSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().min(1, 'E-mail é obrigatório').email('E-mail inválido'),
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
  const parsed = emailSchema.safeParse(req.body)
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message || 'E-mail inválido'
    return res.status(400).json({ message })
  }

  const { name, email } = parsed.data

  try {
    const result = await pool.query(
      'INSERT INTO manifesto_signatures (name, email) VALUES ($1, $2) RETURNING id, name, created_at',
      [name, email],
    )
    const row = (result as any).rows?.[0]
    return res.status(201).json(row)
  } catch (err: any) {
    if (err && err.code === '23505') {
      return res.status(409).json({ message: 'Este e-mail já assinou' })
    }
    return res.status(500).json({ message: 'Erro ao salvar assinatura' })
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
