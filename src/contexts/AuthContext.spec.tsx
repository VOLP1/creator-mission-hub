import { render, screen } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import * as matchers from '@testing-library/jest-dom/matchers'
import '@testing-library/jest-dom'
// extend vitest's expect with jest-dom matchers
expect.extend(matchers as any)
import React from 'react'

// O AuthContext e o hook que vamos criar
import { AuthProvider, useAuth } from './AuthContext.tsx' // (Vai falhar)

// Mock o jwt-decode (named export nas versões atuais)
vi.mock('jwt-decode', () => ({
  jwtDecode: vi.fn(),
}))
import { jwtDecode } from 'jwt-decode'
const mockedJwtDecode = vi.mocked(jwtDecode)

// Mocks do localStorage
const getItemSpy = vi.spyOn(Storage.prototype, 'getItem')
const removeItemSpy = vi.spyOn(Storage.prototype, 'removeItem')

// Um componente "Consumidor" de teste para ler o contexto
const TestComponent = () => {
  const auth = useAuth()
  if (auth.isLoading) return <div>Carregando...</div>
  if (!auth.isAuthenticated) return <div>Deslogado</div>
  return <div>Logado como ID: {auth.user?.id}</div>
}

describe('AuthContext (src/contexts/AuthContext.tsx)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    getItemSpy.mockClear()
    removeItemSpy.mockClear()
  })

  it('Estado Inicial (Sem Token): deve renderizar como "Deslogado"', () => {
    // Simula localStorage vazio
    getItemSpy.mockReturnValue(null)

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    )

    expect(screen.getByText('Deslogado')).toBeInTheDocument()
  })

  it('Estado Inicial (Com Token Válido): deve decodificar o token e renderizar "Logado"', () => {
    const mockToken = 'token-valido'
    const mockUser = { id: 123, iat: 12345, exp: 99999 }

    // Simula localStorage COM token
    getItemSpy.mockReturnValue(mockToken)
    // Simula o decode do token
  mockedJwtDecode.mockReturnValue(mockUser as any)

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    )

    expect(screen.getByText('Logado como ID: 123')).toBeInTheDocument()
  })

  it('Estado Inicial (Com Token Expirado): deve tentar decodificar, falhar e renderizar "Deslogado"', () => {
    // Simula localStorage COM token
    getItemSpy.mockReturnValue('token-expirado')
    // Simula o decode FALHANDO (token expirado)
    mockedJwtDecode.mockImplementation(() => {
      throw new Error('Token expirado')
    })

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    )

    expect(screen.getByText('Deslogado')).toBeInTheDocument()
    // Deve também ter limpado o token inválido
    expect(removeItemSpy).toHaveBeenCalledWith('founder_token')
  })
})
