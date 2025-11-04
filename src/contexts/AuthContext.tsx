import React, { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
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
  token: string | null
  isLoading: boolean // Útil para "spinner"
  login: (token: string) => void
  logout: () => void
}

// O Contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// O Provedor
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserPayload | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true) // Começa carregando

  // Função centralizada de login
  const login = useCallback((newToken: string) => {
    try {
      const decoded = jwtDecode<UserPayload>(newToken)
      localStorage.setItem('founder_token', newToken)
      setUser(decoded)
      setToken(newToken)
    } catch (error) {
      // Garante estado deslogado em falha
      try { localStorage.removeItem('founder_token') } catch {}
      setUser(null)
      setToken(null)
    }
  }, [])

  // Função centralizada de logout
  const logout = useCallback(() => {
    try { localStorage.removeItem('founder_token') } catch {}
    setUser(null)
    setToken(null)
  }, [])

  useEffect(() => {
    // Esta lógica roda na montagem do App
    try {
      const storedToken = localStorage.getItem('founder_token')
      if (storedToken) {
        login(storedToken)
      }
    } catch (_error) {
      logout()
    } finally {
      setIsLoading(false)
    }
  }, [login, logout])

  const value: AuthContextType = {
    isAuthenticated: !!user, // Verdadeiro se 'user' não for nulo
    user,
    token,
    isLoading,
    login,
    logout,
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
