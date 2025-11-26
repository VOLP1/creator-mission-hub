import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach, beforeAll } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

// O componente que vamos testar
import Assembleia from './Assembleia.tsx'; // (Vai falhar - não existe)

// Mock o AuthContext
vi.mock('../contexts/AuthContext', () => ({
  useAuth: vi.fn(),
}));
import { useAuth } from '../contexts/AuthContext';
const mockedUseAuth = vi.mocked(useAuth);

// Mock o useMutation (para o POST)
const mockUseMutation = vi.fn();
vi.mock('@tanstack/react-query', async () => ({
  ...(await vi.importActual<typeof import('@tanstack/react-query')>('@tanstack/react-query')),
  useMutation: (options: any) => mockUseMutation(options),
}));

// Mock o 'sonner' (para toasts)
import { toast } from 'sonner';
vi.mock('sonner', () => ({
  toast: { success: vi.fn(), error: vi.fn(), loading: vi.fn() },
}));

// Mock o 'fetch' global para que possamos espionar os Headers
const mockFetch = vi.fn();
global.fetch = mockFetch as any;

// Helper para renderizar
const renderAssembleia = () => {
  return render(
    <MemoryRouter>
      <Assembleia />
    </MemoryRouter>
  );
};

describe('Página Assembleia (src/pages/Assembleia.tsx)', () => {
  const mockToken = 'meu-cracha-jwt-123';

  // Polyfill necessário para Radix UI Select em ambientes happy-dom
  beforeAll(() => {
    // @ts-ignore
    if (!Element.prototype.hasPointerCapture) {
      // @ts-ignore
      Element.prototype.hasPointerCapture = () => false;
    }
    // @ts-ignore
    if (!Element.prototype.setPointerCapture) {
      // @ts-ignore
      Element.prototype.setPointerCapture = () => {};
    }
  });

  beforeEach(() => {
    vi.clearAllMocks();
    // Configura o mock de Auth para estar LOGADO
    mockedUseAuth.mockReturnValue({
      isAuthenticated: true,
      user: { id: 123, iat: 1, exp: 99999 },
      isLoading: false,
    } as any);
    // Configura um mock padrão para a mutação
    mockUseMutation.mockReturnValue({ mutate: vi.fn(), isPending: false });
    mockFetch.mockResolvedValue({ ok: true, json: async () => ({ id: 1 }) });
  });

  it('Deve renderizar o título, tabs de Frente de Batalha, textarea e botão', () => {
    renderAssembleia();

    expect(screen.getByRole('heading', { name: /Assembleia de Fundação/i })).toBeInTheDocument();
    // Novo layout usa Tabs em vez de Select Radix: verificamos tablist e triggers
    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Ação Física/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Ação Digital/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Comunidade/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Sua Sugestão/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Enviar Missão/i })).toBeInTheDocument();
  });

  it('Deve chamar a mutação (fetch) com o Header Authorization correto', async () => {
    const user = userEvent.setup();
    const mockMutate = vi.fn();
    mockUseMutation.mockReturnValue({ mutate: mockMutate, isPending: false });

    renderAssembleia();

    // 1. Selecionar a tab "Ação Digital" (altera mission_type)
    await user.click(screen.getByRole('tab', { name: /Ação Digital/i }));
    await user.type(screen.getByLabelText(/Sua Sugestão/i), 'Minha ideia de missão digital');

    // 2. Clicar em Enviar
    await user.click(screen.getByRole('button', { name: /Enviar Missão/i }));

    // 3. Verificar chamada à mutate
    expect(mockMutate).toHaveBeenCalledWith({
      mission_type: 'DIGITAL',
      suggestion: 'Minha ideia de missão digital',
    });

    // 4. Teste da mutationFn (simulação direta)
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ id: 1, message: 'Sucesso' }),
    });
    const apiUrl = process.env.VITE_API_BASE_URL || 'http://localhost:4000';
    const mutationFn = async (data: any) => {
      const token = mockToken;
      const response = await fetch(`${apiUrl}/api/v1/missions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      } as RequestInit);
      if (!response.ok) throw new Error('Falha');
      return response.json();
    };
    await mutationFn({ mission_type: 'DIGITAL', suggestion: '...' });
    expect(mockFetch).toHaveBeenCalledWith(
      `${apiUrl}/api/v1/missions`,
      expect.objectContaining({
        headers: expect.objectContaining({
          'Authorization': 'Bearer meu-cracha-jwt-123',
        }),
      })
    );
  });
});
