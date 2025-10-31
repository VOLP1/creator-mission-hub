import { vi, describe, it, expect, beforeEach } from 'vitest'
import jwt from 'jsonwebtoken'
import type { Request, Response, NextFunction } from 'express'
// Import will intentionally fail until middleware is implemented (RED phase)
import authMiddleware from './auth.middleware'

// Helpers simples para mocks de req/res compatíveis com Vitest
function getMockReq(overrides: Partial<Request> = {} as any) {
  const base: Partial<Request> = {
    headers: {},
  }
  return { ...(base as any), ...(overrides as any) } as Request & { user?: any }
}

function getMockRes() {
  const res: Partial<Response> & {
    status: ReturnType<typeof vi.fn>
    json: ReturnType<typeof vi.fn>
  } = {
    status: vi.fn(function (this: any, code: number) {
      // chainable
      return this
    }),
    json: vi.fn(),
  }
  const next = vi.fn()
  return { res: res as Response, next }
}

// Mock o JWT
vi.mock('jsonwebtoken')
const mockedJwt = vi.mocked(jwt)

// Mock o .env
process.env.JWT_SECRET = 'segredo-de-teste'

describe('Auth Middleware (src/auth.middleware.ts)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('Deve retornar 401 (Unauthorized) se o header Authorization não existir', () => {
    const req = getMockReq() as unknown as Request
    const { res, next } = getMockRes() as unknown as { res: Response; next: NextFunction }

    authMiddleware(req, res, next)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({ message: 'Acesso negado. Nenhum token fornecido.' })
    expect(next).not.toHaveBeenCalled()
  })

  it('Deve retornar 401 (Unauthorized) se o token for mal formatado (sem "Bearer ")', () => {
    const req = getMockReq({ headers: { authorization: 'token-errado' } }) as unknown as Request
    const { res, next } = getMockRes() as unknown as { res: Response; next: NextFunction }

    authMiddleware(req, res, next)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({ message: 'Token mal formatado.' })
    expect(next).not.toHaveBeenCalled()
  })

  it('Deve retornar 401 (Unauthorized) se o token for inválido (JWT verify falha)', () => {
    // Simula o JWT falhando
    mockedJwt.verify.mockImplementation(() => {
      throw new Error('Token inválido')
    })

    const req = getMockReq({ headers: { authorization: 'Bearer token-invalido' } }) as unknown as Request
    const { res, next } = getMockRes() as unknown as { res: Response; next: NextFunction }

    authMiddleware(req, res, next)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({ message: 'Token inválido.' })
    expect(next).not.toHaveBeenCalled()
  })

  it('Deve chamar next() e anexar o ID do usuário no req.user se o token for válido', () => {
    const mockPayload = { id: 123 }
    // Simula o JWT retornando o payload
    mockedJwt.verify.mockReturnValue(mockPayload as any)

    const req = getMockReq({ headers: { authorization: 'Bearer token-valido' } }) as unknown as Request & { user?: any }
    const { res, next } = getMockRes() as unknown as { res: Response; next: NextFunction }

    authMiddleware(req, res, next)

    // Anexou o usuário?
    expect((req as any).user).toEqual(mockPayload)
    // Deixou passar?
    expect(next).toHaveBeenCalledTimes(1)
    // Não retornou erro?
    expect(res.status).not.toHaveBeenCalled()
  })
})
