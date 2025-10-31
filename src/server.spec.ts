import { vi, describe, it, expect, beforeEach } from 'vitest'
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
    expect(res.body).toEqual(newFounderData)
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
})
