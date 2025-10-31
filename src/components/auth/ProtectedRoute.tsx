import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth()

  // 1. Loading: não renderiza nada (ou um spinner)
  if (isLoading) {
    return null
  }

  // 2. Deslogado: redireciona para Home
  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  // 3. Logado: renderiza children
  return <>{children}</>
}

export default ProtectedRoute
