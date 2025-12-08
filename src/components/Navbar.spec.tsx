import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import * as matchers from '@testing-library/jest-dom/matchers'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
import { Navbar } from './Navbar'

expect.extend(matchers as any)

const renderNavbar = () => render(
  <MemoryRouter>
    <Navbar />
  </MemoryRouter>
)

describe('Navbar simplificada (src/components/Navbar.tsx)', () => {
  it('renderiza links de navegação principais', () => {
    renderNavbar()
    expect(screen.getByRole('link', { name: /Home/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /O Problema/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Manifesto/i })).toBeInTheDocument()
  })

  it('renderiza CTA "Entrar na Comunidade"', () => {
    renderNavbar()
    // Como usamos Button asChild com <a>, o elemento é um link
    expect(screen.getByRole('link', { name: /Entrar na Comunidade/i })).toBeInTheDocument()
  })
})
