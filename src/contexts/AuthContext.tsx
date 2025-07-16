import { createContext, useContext, ReactNode } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { AuthService } from '@/services/AuthService'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { DiagnosticScreen } from '@/components/DiagnosticScreen'

interface AuthContextType {
  user: any
  session: any
  loading: boolean
  isAuthenticated: boolean
  signUp: (email: string, password: string) => Promise<AuthService.AuthResponse>
  signIn: (email: string, password: string) => Promise<AuthService.AuthResponse>
  signOut: () => Promise<AuthService.AuthResponse>
  refreshSession: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

/**
 * Provider de contexto de autenticação para toda a aplicação
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const auth = useAuth()

  return (
    <AuthContext.Provider value={auth}>
      <ErrorBoundary fallback={<DiagnosticScreen />}>
        {children}
      </ErrorBoundary>
    </AuthContext.Provider>
  )
}

/**
 * Hook para usar o contexto de autenticação
 */
export function useAuthContext() {
  const context = useContext(AuthContext)
  
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  
  return context
}
