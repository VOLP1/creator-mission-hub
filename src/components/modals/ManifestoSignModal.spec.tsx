import React from 'react'
import { expect } from 'vitest'
import * as matchers from '@testing-library/jest-dom/matchers'
import '@testing-library/jest-dom'
import { toast } from 'sonner'  
// extend vitest's expect with jest-dom matchers
expect.extend(matchers as any)
import { render, screen, cleanup } from '@testing-library/react'
import { waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, it, vi } from 'vitest'
import * as Dialog from '@radix-ui/react-dialog'

// --- Mocks (router, react-query, and toast) ---
const mockNavigate = vi.fn()
const mockUseMutation = vi.fn()

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual<typeof import('react-router-dom')>('react-router-dom')),
  useNavigate: () => mockNavigate,
}))

vi.mock('@tanstack/react-query', async () => ({
  ...(await vi.importActual<typeof import('@tanstack/react-query')>('@tanstack/react-query')),
  useMutation: () => mockUseMutation(),
}))

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    loading: vi.fn(),
  },
}))


// Spy para localStorage.setItem (armazenar o "crachá")
const setItemSpy = vi.spyOn(Storage.prototype, 'setItem')


// The component under test does not exist yet — that's intentional for TDD purity.
import ManifestoSignModal from './ManifestoSignModal'

afterEach(() => {
  vi.clearAllMocks()
  cleanup()
})

beforeEach(() => {
  // Provide a safe default for tests that don't stub a specific mutation
  mockUseMutation.mockReturnValue({ mutateAsync: vi.fn().mockResolvedValue({}), isPending: false })
})

describe('ManifestoSignModal (TDD - fase 1.1)', () => {
  it('Renderização: quando aberto deve mostrar título, campos e botão', () => {
    const handleOpenChange = vi.fn()

    render(
      <Dialog.Root open={true} onOpenChange={handleOpenChange}>
        <ManifestoSignModal />
      </Dialog.Root>,
    )

    // Título
    expect(
      screen.getByRole('heading', {
        name: 'Assine o Manifesto. Torne-se um Fundador.',
      }),
    ).toBeInTheDocument()

    // Campos pelo label
    expect(
      screen.getByLabelText('Nome ou Pseudônimo'),
    ).toBeInTheDocument()

    expect(screen.getByLabelText('E-mail')).toBeInTheDocument()

    // Botão
    expect(
      screen.getByRole('button', { name: 'Confirmar Assinatura' }),
    ).toBeInTheDocument()
  })

  it('Validação de campos vazios: ao submeter sem preencher deve mostrar mensagens de erro', async () => {
    const user = userEvent.setup()
    const handleOpenChange = vi.fn()

    render(
      <Dialog.Root open={true} onOpenChange={handleOpenChange}>
        <ManifestoSignModal />
      </Dialog.Root>,
    )

    const submitButton = screen.getByRole('button', {
      name: 'Confirmar Assinatura',
    })

    await user.click(submitButton)

    // React Hook Form + zod errors are usually rendered asynchronously
    expect(await screen.findByText('Nome é obrigatório')).toBeInTheDocument()
    expect(await screen.findByText('E-mail é obrigatório')).toBeInTheDocument()
  })

  it('Validação de e-mail inválido: deve mostrar mensagem de formato inválido', async () => {
    const user = userEvent.setup()
    const handleOpenChange = vi.fn()

    render(
      <Dialog.Root open={true} onOpenChange={handleOpenChange}>
        <ManifestoSignModal />
      </Dialog.Root>,
    )

    const nameInput = screen.getByLabelText('Nome ou Pseudônimo') as HTMLInputElement
    const emailInput = screen.getByLabelText('E-mail') as HTMLInputElement
    const submitButton = screen.getByRole('button', {
      name: 'Confirmar Assinatura',
    })

    await user.type(nameInput, 'Eduardo')
    await user.type(emailInput, 'eduardo@invalid')
    await user.click(submitButton)

    expect(await screen.findByText('Formato de e-mail inválido')).toBeInTheDocument()
  })

  it('Submissão com Sucesso: deve chamar a API, salvar o token, disparar toast e redirecionar', async () => {
    const user = userEvent.setup()

    const userData = { id: 1, name: 'Eduardo' }
    const apiResponse = { user: userData, token: 'mockToken123' }

    // Configura o mock para usar mutate (com onSuccess), seguindo o novo contrato
    mockUseMutation.mockReturnValue({
      mutate: vi.fn().mockImplementation((_data, { onSuccess }) => {
        onSuccess(apiResponse)
      }),
      isPending: false,
    })

    render(
      <Dialog.Root open={true} onOpenChange={vi.fn()}>
        <ManifestoSignModal onClose={vi.fn()} />
      </Dialog.Root>,
    )

    await user.type(screen.getByLabelText('Nome ou Pseudônimo'), 'Eduardo')
    await user.type(screen.getByLabelText('E-mail'), 'eduardo@teste.com')
    await user.click(screen.getByRole('button', { name: 'Confirmar Assinatura' }))

    // 1) token salvo
    expect(setItemSpy).toHaveBeenCalledWith('founder_token', 'mockToken123')
    // 2) toast chamado
    expect(toast.success).toHaveBeenCalledWith(expect.any(String), expect.any(Object))
    // 3) navegação com nome do usuário (aninhado)
    expect(mockNavigate).toHaveBeenCalledWith('/fundadores', { state: { newName: 'Eduardo' } })
  })

  it('Submissão com Erro: deve chamar a API e disparar toast de erro', async () => {
    const user = userEvent.setup()

    const mutateAsync = vi.fn().mockRejectedValue(new Error('E-mail já existe'))
    mockUseMutation.mockReturnValue({ mutateAsync })

    render(
      <Dialog.Root open={true} onOpenChange={vi.fn()}>
        <ManifestoSignModal />
      </Dialog.Root>,
    )

    await user.type(screen.getByLabelText('Nome ou Pseudônimo'), 'Eduardo')
    await user.type(screen.getByLabelText('E-mail'), 'eduardo@teste.com')
    await user.click(screen.getByRole('button', { name: 'Confirmar Assinatura' }))

    await waitFor(() => {
      expect(mutateAsync).toHaveBeenCalledWith({ name: 'Eduardo', email: 'eduardo@teste.com' })
    })

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled()
      expect(mockNavigate).not.toHaveBeenCalled()
    })
  })
})
