import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { beforeEach, afterEach, describe, it, vi, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import * as matchers from '@testing-library/jest-dom/matchers'

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers as any)

// Mocks
const mockUseQuery = vi.fn()

vi.mock('@tanstack/react-query', async () => ({
  ...(await vi.importActual<typeof import('@tanstack/react-query')>('@tanstack/react-query')),
  useQuery: (options: any) => mockUseQuery(options),
}))

// Page under test (doesn't exist yet, TDD red phase expected)
import Fundadores from './Fundadores.tsx'

beforeEach(() => {
  vi.clearAllMocks()
})

afterEach(() => {
  cleanup()
})

describe('Fundadores page (/fundadores)', () => {
  it('Estado de Carregamento: deve mostrar texto de loading quando isLoading=true', () => {
    mockUseQuery.mockReturnValue({ data: undefined, isLoading: true, isError: false })

    render(
      <MemoryRouter>
        <Fundadores />
      </MemoryRouter>,
    )

    expect(screen.getByText('Carregando fundadores...')).toBeInTheDocument()
  })

  it('Estado de Erro: deve mostrar texto de erro quando isError=true', () => {
    mockUseQuery.mockReturnValue({ data: undefined, isLoading: false, isError: true })

    render(
      <MemoryRouter>
        <Fundadores />
      </MemoryRouter>,
    )

    expect(screen.getByText('Não foi possível carregar o Muro.')).toBeInTheDocument()
  })

  it('Renderização com Sucesso: deve mostrar o título e os nomes quando a query resolve', () => {
    mockUseQuery.mockReturnValue({
      data: [
        { id: 1, name: 'Eduardo' },
        { id: 2, name: 'William' },
      ],
      isLoading: false,
      isError: false,
    })

    render(
      <MemoryRouter>
        <Fundadores />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { name: 'O Muro dos Fundadores' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Eduardo')).toBeInTheDocument()
    expect(screen.getByText('William')).toBeInTheDocument()
  })

  it('Destaque do Novo Membro (Opção B): item com state.newName deve ter data-highlight="true"', () => {
    mockUseQuery.mockReturnValue({
      data: [
        { id: 1, name: 'Eduardo' },
        { id: 2, name: 'William' },
      ],
      isLoading: false,
      isError: false,
    })
    // Provide location state via MemoryRouter so useLocation() inside the
    // component receives the expected state.newName
    render(
      <MemoryRouter initialEntries={[{ state: { newName: 'William' } }]}>
        <Fundadores />
      </MemoryRouter>,
    )

    const highlightedName = screen.getByText('William')
    expect(highlightedName).toHaveAttribute('data-highlight', 'true')
  })
})
