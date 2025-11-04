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
  it('renderiza o título do manifesto e um CTA para assinar', () => {
    const onOpenManifesto = vi.fn()
    render(
      <MemoryRouter>
        <QuemSomos onOpenManifesto={onOpenManifesto} />
      </MemoryRouter>,
    )

    // Headline
    expect(
      screen.getByText(/O Manifesto \+Creator/i)
    ).toBeInTheDocument()

  // CTA button (há mais de um na página; usamos o primeiro)
  const ctas = screen.getAllByRole('button', { name: /Assinar o Manifesto/i })
  expect(ctas.length).toBeGreaterThan(0)
  const cta = ctas[0]

  fireEvent.click(cta)
    expect(onOpenManifesto).toHaveBeenCalledTimes(1)
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
