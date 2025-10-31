import React from 'react'
import { render, screen } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import * as matchers from '@testing-library/jest-dom/matchers'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'

// extend vitest's expect with jest-dom matchers
expect.extend(matchers as any)

// Mock o nosso hook customizado
vi.mock('@/contexts/AuthContext', () => ({
  useAuth: vi.fn(),
}))
import { useAuth } from '@/contexts/AuthContext'
const mockedUseAuth = vi.mocked(useAuth as any)

// O componente que vamos testar
import { Navbar } from './Navbar'

// Helper para renderizar com o Router
const renderNavbar = () => {
  return render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>,
  )
}

describe('Navbar (src/components/Navbar.tsx)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('Estado Deslogado: deve mostrar "Assine o Manifesto" se isAuthenticated for false', () => {
    // 1. Configura o mock do useAuth
    mockedUseAuth.mockReturnValue({
      isAuthenticated: false,
      user: null,
      isLoading: false,
    })

    renderNavbar()

    // 2. Procura pelo botão de Assinar
    expect(screen.getByRole('button', { name: /Assine o Manifesto/i })).toBeInTheDocument()

    // 3. Garante que o botão/link do QG não está lá
    expect(screen.queryByRole('link', { name: /Acessar QG/i })).not.toBeInTheDocument()
  })

  it('Estado Logado: deve mostrar "Acessar QG" se isAuthenticated for true', () => {
    // 1. Configura o mock do useAuth
    mockedUseAuth.mockReturnValue({
      isAuthenticated: true,
      user: { id: 123, iat: 1, exp: 99999 },
      isLoading: false,
    })

    renderNavbar()

    // 2. Procura pelo link do QG (será um <Link> do router)
    expect(screen.getByRole('link', { name: /Acessar QG/i })).toBeInTheDocument()

    // 3. Garante que o botão de Assinar não está lá
    expect(screen.queryByRole('button', { name: /Assine o Manifesto/i })).not.toBeInTheDocument()
  })
})
