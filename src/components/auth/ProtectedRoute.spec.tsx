import React from 'react'
import { render, screen } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import * as matchers from '@testing-library/jest-dom/matchers'
import '@testing-library/jest-dom'
import { MemoryRouter, Routes, Route } from 'react-router-dom'

// extend vitest's expect with jest-dom matchers
expect.extend(matchers as any)

// O hook que vamos mockar
vi.mock('@/contexts/AuthContext', () => ({
  useAuth: vi.fn(),
}))
import { useAuth } from '@/contexts/AuthContext'
const mockedUseAuth = vi.mocked(useAuth as any)

// O componente que vamos testar
import ProtectedRoute from '@/components/auth/ProtectedRoute'

// Uma página "secreta" e uma página "pública" para os testes
const PaginaSecreta = () => <div>PÁGINA SECRETA</div>
const PaginaHome = () => <div>PÁGINA HOME</div>

// Helper para renderizar a rota
const renderComRotas = (caminhoInicial: string) => {
  render(
    <MemoryRouter initialEntries={[caminhoInicial]}>
      <Routes>
        <Route path="/" element={<PaginaHome />} />
        <Route
          path="/secreta"
          element={
            <ProtectedRoute>
              <PaginaSecreta />
            </ProtectedRoute>
          }
        />
      </Routes>
    </MemoryRouter>,
  )
}

describe('ProtectedRoute (src/components/auth/ProtectedRoute.tsx)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('Estado Deslogado: deve redirecionar para a Home ("/")', () => {
    // 1. Configura o mock (Deslogado)
    mockedUseAuth.mockReturnValue({
      isAuthenticated: false,
      user: null,
      isLoading: false,
    })

    // 2. Tenta acessar a página secreta
    renderComRotas('/secreta')

    // 3. Verifica se foi redirecionado para a Home
    expect(screen.getByText('PÁGINA HOME')).toBeInTheDocument()
    expect(screen.queryByText('PÁGINA SECRETA')).not.toBeInTheDocument()
  })

  it('Estado Logado: deve renderizar a página secreta (o "children")', () => {
    // 1. Configura o mock (Logado)
    mockedUseAuth.mockReturnValue({
      isAuthenticated: true,
      user: { id: 123, iat: 1, exp: 99999 },
      isLoading: false,
    })

    // 2. Tenta acessar a página secreta
    renderComRotas('/secreta')

    // 3. Verifica se está na página secreta
    expect(screen.getByText('PÁGINA SECRETA')).toBeInTheDocument()
    expect(screen.queryByText('PÁGINA HOME')).not.toBeInTheDocument()
  })

  it('Estado Carregando (Loading): deve renderizar um spinner (ou nada)', () => {
    // 1. Configura o mock (Carregando)
    mockedUseAuth.mockReturnValue({
      isAuthenticated: false,
      user: null,
      isLoading: true,
    })

    // 2. Tenta acessar a página secreta
    renderComRotas('/secreta')

    // 3. Verifica se não renderizou nenhuma das páginas (está "carregando")
    expect(screen.queryByText('PÁGINA SECRETA')).not.toBeInTheDocument()
    expect(screen.queryByText('PÁGINA HOME')).not.toBeInTheDocument()
    // (Poderíamos testar por um "Carregando..." se o componente o renderizar)
  })
})
