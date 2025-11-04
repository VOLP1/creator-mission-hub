import { vi, describe, it, expect, beforeEach } from 'vitest'
import jwt from 'jsonwebtoken'
import request from 'supertest'

// 1) Mock DB module BEFORE importing the server
vi.mock('./db', () => ({
  default: {
    query: vi.fn(),
  },
}))

// 2) Import server and the mocked pool AFTER the mocks are set up
// These imports will fail until server/db are implemented (TDD RED phase)
import app from './server.ts'
import pool from './db.ts'

// Helper: strongly type the mocked pool
const mockedPool = vi.mocked(pool as unknown as { query: ReturnType<typeof vi.fn> })

describe('API /api/v1', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('GET /manifesto/signatures: retorna 200 e uma lista de fundadores (sem e-mails)', async () => {
    const mockData = [
      { id: 1, name: 'Fundador 1', created_at: new Date().toISOString() },
      { id: 2, name: 'Fundador 2', created_at: new Date().toISOString() },
    ]

    mockedPool.query.mockResolvedValueOnce({ rows: mockData } as any)

    const res = await request(app).get('/api/v1/manifesto/signatures')

    expect(res.status).toBe(200)
    expect(res.body).toEqual(mockData)
    expect(mockedPool.query).toHaveBeenCalledWith(
      'SELECT id, name, created_at FROM manifesto_signatures ORDER BY created_at ASC',
    )
  })

  it('POST /manifesto/sign: retorna 201 e o novo fundador (sem e-mail) com dados válidos', async () => {
    const newFounderData = { id: 3, name: 'Novo Fundador', created_at: new Date().toISOString() }

    mockedPool.query.mockResolvedValueOnce({ rows: [newFounderData] } as any)

    const payload = { name: 'Novo Fundador', email: 'novo@teste.com' }
    const res = await request(app).post('/api/v1/manifesto/sign').send(payload)

    expect(res.status).toBe(201)
    // Espera estrutura { user, token }
    expect(res.body.user).toEqual(newFounderData)
    expect(res.body).toHaveProperty('token')
    expect(mockedPool.query).toHaveBeenCalledWith(expect.any(String), ['Novo Fundador', 'novo@teste.com'])
  })

  it('POST /manifesto/sign: retorna 400 (Bad Request) se o e-mail for inválido', async () => {
    const payload = { name: 'Nome Valido', email: 'email-invalido' }
    const res = await request(app).post('/api/v1/manifesto/sign').send(payload)

    expect(res.status).toBe(400)
    expect(res.body.message).toContain('inválido')
    expect(mockedPool.query).not.toHaveBeenCalled()
  })

  it('POST /manifesto/sign: retorna 200 (Login) e o usuário existente se o e-mail já existir', async () => {
    // 1) INSERT falha com unique_violation
    mockedPool.query.mockRejectedValueOnce({ code: '23505' })

    // 2) SELECT retorna usuário existente
    const existingUser = { id: 1, name: 'Ja Existe', created_at: new Date().toISOString() }
    mockedPool.query.mockResolvedValueOnce({ rows: [existingUser] } as any)

    // 3) Faz a requisição
    const payload = { name: 'Ja Existe', email: 'ja@existe.com' }
    const res = await request(app).post('/api/v1/manifesto/sign').send(payload)

    // 4) Assertivas
    expect(res.status).toBe(200)
    expect(res.body.user).toEqual(existingUser)
    expect(res.body).toHaveProperty('token')
    expect(mockedPool.query).toHaveBeenCalledTimes(2)
  })

  // --- INÍCIO DO NOVO BLOCO DE TESTES ---
  describe('POST /api/v1/missions', () => {
    // Helper: Gera um token válido para os testes
    const generateValidToken = (userId: number) => {
      return jwt.sign({ id: userId }, process.env.JWT_SECRET || 'segredo-padrao', { expiresIn: '1m' })
    }

    it('Deve retornar 401 (Unauthorized) se nenhum token for enviado', async () => {
      const res = await request(app)
        .post('/api/v1/missions')
        .send({
          mission_type: 'DIGITAL',
          suggestion: 'Uma sugestão de teste.',
        })

      // Deixa o auth.middleware real (que já testamos) fazer seu trabalho
      expect(res.status).toBe(401)
      expect(res.body.message).toContain('Nenhum token fornecido')
    })

    it('Deve retornar 400 (Bad Request) se os dados da missão forem inválidos (ex: falta suggestion)', async () => {
      const token = generateValidToken(1) // Token válido para o Fundador ID 1

      const res = await request(app)
        .post('/api/v1/missions')
        .set('Authorization', `Bearer ${token}`) // Envia o "crachá"
        .send({
          mission_type: 'DIGITAL',
          // 'suggestion' está faltando
        })

      expect(res.status).toBe(400)
      expect(res.body.message).toContain('inválidos')
      expect(mockedPool.query).not.toHaveBeenCalled() // Não deve salvar no DB
    })

    it('Deve retornar 201 (Created) e salvar a missão se o token e os dados forem válidos', async () => {
      const token = generateValidToken(123) // Token válido para o Fundador ID 123
      const mockMissionData = {
        mission_type: 'PHYSICAL',
        suggestion: 'Limpar o parque local.',
      }
      const mockDbResponse = { id: 1, founder_id: 123, ...mockMissionData }

      // Mock da query INSERT do banco
      mockedPool.query.mockResolvedValueOnce({ rows: [mockDbResponse] } as any)

      const res = await request(app)
        .post('/api/v1/missions')
        .set('Authorization', `Bearer ${token}`) // Envia o "crachá"
        .send(mockMissionData)

      expect(res.status).toBe(201)
      expect(res.body).toEqual(mockDbResponse)

      // Verifica se o INSERT foi chamado com o ID 123 (do token)
      expect(mockedPool.query).toHaveBeenCalledWith(
        expect.any(String), // O texto do INSERT
        [123, 'PHYSICAL', 'Limpar o parque local.'],
      )
    })
  })
  // --- FIM DO NOVO BLOCO DE TESTES ---
})
