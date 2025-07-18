import { useState, useEffect } from 'react'
import { 
  signUp, 
  signInWithPassword, 
  signOut, 
  getCurrentSession, 
  onAuthStateChange,
  AuthService 
} from '@/services/AuthService'
import { clearAuthData } from '@/utils/authUtils'
import { useNavigate } from 'react-router-dom'

export function useAuth() {
  const [user, setUser] = useState<any>(null)
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [initialized, setInitialized] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  // Só use useNavigate se estiver dentro de um contexto de navegador
  let navigate: ReturnType<typeof useNavigate> | null = null;
  try {
    navigate = useNavigate();
  } catch {
    // Se não estiver em contexto de navegador, ignore
    navigate = null;
  }

  // Monitora mudanças na autenticação
  useEffect(() => {
    let isMounted = true

    const unsubscribe = onAuthStateChange((session) => {
      if (!isMounted) return


      setSession(session)
      setUser(session?.user || null)
      setIsAuthenticated(!!session)
      
      // Só define loading como false após a primeira verificação
      if (!initialized) {
        setInitialized(true)
        setLoading(false)
      }
      
      // Atualiza localStorage
      if (session) {
        localStorage.setItem('supabase_session', JSON.stringify(session))
        localStorage.setItem('user', JSON.stringify(session.user))
      } else {
        localStorage.removeItem('supabase_session')
        localStorage.removeItem('user')
      }
    })

    // Inicializa o estado de autenticação após configurar o listener
    initializeAuth()

    return () => {
      isMounted = false
      unsubscribe()
    }
  }, [])

  const initializeAuth = async () => {
    try {
      const sessionResult = await getCurrentSession()
      // Se já foi inicializado pelo listener, não sobrescreve
      if (initialized) return
      if (sessionResult.success) {
        setSession(sessionResult.session)
        setUser(sessionResult.user)
        setIsAuthenticated(true)
        setRetryCount(0) // Reset retry count on success
      } else {
        setSession(null)
        setUser(null)
        setIsAuthenticated(false)
        clearAuthData()
        // Não redireciona para login aqui!
        // O controle de redirecionamento fica nas rotas (PublicRoute/PrivateRoute)
        // Se sessão expirada ou inválida, redireciona para login
        if (
          (sessionResult.error === 'Sessão expirada' ||
          sessionResult.error === 'Nenhuma sessão ativa encontrada') &&
          navigate
        ) {
          // navigate('/login', { replace: true })
        }
        // Se houve erro e ainda não tentou muitas vezes, tenta novamente
        if (retryCount < 3 && sessionResult.error !== 'Nenhuma sessão ativa encontrada') {
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
            initializeAuth();
          }, 1000 * (retryCount + 1)); // Backoff exponencial
          return; // Não define loading como false ainda
        }
      }
    } catch (error) {
      setSession(null)
      setUser(null)
      setIsAuthenticated(false)
      clearAuthData()
      // Retry logic para erros de rede
      if (retryCount < 3) {
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
          initializeAuth();
        }, 1000 * (retryCount + 1));
        return;
      }
    } finally {
      // Só define loading como false se ainda não foi inicializado
      if (!initialized) {
        setInitialized(true)
        setLoading(false)
      }
    }
  }

  const handleSignUp = async (email: string, password: string): Promise<AuthService.AuthResponse> => {
    setLoading(true)
    try {
      const result = await signUp({ email, password })
      return result
    } finally {
      setLoading(false)
    }
  }

  const handleSignIn = async (email: string, password: string): Promise<AuthService.AuthResponse> => {
    setLoading(true)
    try {
      const result = await signInWithPassword({ email, password })
      return result
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async (): Promise<AuthService.AuthResponse> => {
    setLoading(true)
    try {
      const result = await signOut()
      
      if (result.success) {
        setSession(null)
        setUser(null)
        setIsAuthenticated(false)
        clearAuthData()
      }
      
      return result
    } finally {
      setLoading(false)
    }
  }

  const refreshSession = async (): Promise<void> => {
    try {
      const sessionResult = await getCurrentSession()
      
      if (sessionResult.success) {
        setSession(sessionResult.session)
        setUser(sessionResult.user)
        setIsAuthenticated(true)
      }
    } catch (error) {
    }
  }

  return {
    user,
    session,
    loading,
    isAuthenticated,
    signUp: handleSignUp,
    signIn: handleSignIn,
    signOut: handleSignOut,
    refreshSession,
  }
}
