import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { jwtDecode } from 'jwt-decode'

// O payload que nosso backend coloca no JWT
export interface UserPayload {
  id: number
  iat: number // Issued at
  exp: number // Expires
}

export interface AuthContextType {
  isAuthenticated: boolean
  user: UserPayload | null
  isLoading: boolean // Útil para "spinner"
  // (No futuro, adicionaremos 'login' e 'logout' aqui)
  token?: string | null // Expor o "crachá" quando disponível
}

// O Contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// O Provedor
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserPayload | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true) // Começa carregando

  useEffect(() => {
    // Esta lógica roda na montagem do App
    try {
      const storedToken = localStorage.getItem('founder_token')

      // Teste 1: Se não há token, está deslogado
      if (!storedToken) {
        setIsLoading(false)
        return
      }

      // Teste 2 e 3: Tenta decodificar
      const decoded = jwtDecode<UserPayload>(storedToken)

      // Teste 2 (Sucesso): Token válido
      setUser(decoded)
      setToken(storedToken)
    } catch (_error) {
      // Teste 3 (Falha): Token inválido ou expirado
      try {
        localStorage.removeItem('founder_token') // Limpa o "crachá" ruim
      } catch {}
      setUser(null)
      setToken(null)
    } finally {
      setIsLoading(false)
    }
  }, []) // Array vazio = roda apenas 1 vez na montagem

  const value: AuthContextType = {
    isAuthenticated: !!user, // Verdadeiro se 'user' não for nulo
    user,
    isLoading,
    token,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// O Hook
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}
