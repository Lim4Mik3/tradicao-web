import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

interface AuthGuardProps {
  children: ReactNode
  redirectTo?: string
  requireAuth?: boolean
}

/**
 * Componente para proteger rotas baseado no estado de autenticação
 */
export function AuthGuard({ 
  children, 
  redirectTo = '/login',
  requireAuth = true 
}: AuthGuardProps) {
  const { isAuthenticated, loading } = useAuth()

  // Mostra loading enquanto verifica autenticação
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Verificando autenticação...
          </h2>
          <p className="text-gray-600">
            Aguarde um momento.
          </p>
        </div>
      </div>
    )
  }

  // Se requer autenticação e usuário não está autenticado, redireciona
  if (requireAuth && !isAuthenticated) {
    return <Navigate to={redirectTo} replace />
  }

  // Se não requer autenticação mas usuário está autenticado, redireciona para dashboard
  if (!requireAuth && isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}
