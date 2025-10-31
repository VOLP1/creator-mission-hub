import React from 'react'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { describe, it, expect, afterEach, vi } from 'vitest'
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
    render(<QuemSomos onOpenManifesto={onOpenManifesto} />)

    // Headline
    expect(
      screen.getByText(/O Manifesto \+Creator/i)
    ).toBeInTheDocument()

    // CTA button
    const cta = screen.getByRole('button', { name: /Assinar o Manifesto/i })
    expect(cta).toBeInTheDocument()

    fireEvent.click(cta)
    expect(onOpenManifesto).toHaveBeenCalledTimes(1)
  })

  it('mostra partes do manifesto', () => {
    render(<QuemSomos />)
    expect(
      screen.getByText(/A ética foi substituída pela métrica/i)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/O processo humano da criação/i)
    ).toBeInTheDocument()
  })
})
