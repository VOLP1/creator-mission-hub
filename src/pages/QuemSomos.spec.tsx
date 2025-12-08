import React from 'react'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { describe, it, expect, afterEach, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import * as matchers from '@testing-library/jest-dom/matchers'

// Extend expect with jest-dom
expect.extend(matchers as any)

import QuemSomos from './QuemSomos'

afterEach(() => {
  cleanup()
})

describe('QuemSomos manifesto page', () => {
  it('renderiza o título e CTAs atualizados para comunidade', () => {
    render(
      <MemoryRouter>
        <QuemSomos />
      </MemoryRouter>,
    )

    expect(screen.getByText(/O Manifesto \+Creator/i)).toBeInTheDocument()
  // Novo(s) CTA(s) para comunidade (podem existir mais de um)
  const communityLinks = screen.getAllByRole('link', { name: /Entrar na Comunidade/i })
  expect(communityLinks.length).toBeGreaterThan(0)
    // Não deve mais existir botão de Assinar o Manifesto
    expect(screen.queryByRole('button', { name: /Assinar o Manifesto/i })).not.toBeInTheDocument()
  })

  it('mostra partes do manifesto', () => {
    render(
      <MemoryRouter>
        <QuemSomos />
      </MemoryRouter>,
    )
    // A frase aparece em um bloco e também em uma "marquee" (várias vezes)
    expect(screen.getAllByText(/A ética foi substituída pela métrica/i).length).toBeGreaterThan(0)
    expect(
      screen.getByText(/O processo humano da criação/i)
    ).toBeInTheDocument()
  })
})
