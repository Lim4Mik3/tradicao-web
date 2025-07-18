import { useEffect, useRef } from 'react';
import { useAuth } from './useAuth';

/**
 * Hook para detectar e recuperar de estados inconsistentes da aplicação
 */
export function useAuthRecovery() {
  const { isAuthenticated, loading, user, session } = useAuth();
  const timeoutRef = useRef<NodeJS.Timeout>();
  const mountTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    // Limpa timeout anterior
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Se está carregando por mais de 10 segundos, pode haver um problema
    if (loading) {
      timeoutRef.current = setTimeout(() => {
        const loadingTime = Date.now() - mountTimeRef.current;
        
        if (loadingTime > 10000) { // 10 segundos

          // Em casos extremos, força refresh
          if (loadingTime > 30000) { // 30 segundos
            window.location.reload();
          }
        }
      }, 10000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [loading, isAuthenticated, user, session]);

  // Detecta estados inconsistentes
  useEffect(() => {
    if (!loading) {
      // Estado inconsistente: tem session mas não está autenticado
      if (session && !isAuthenticated) {
        
      
      }

      // Estado inconsistente: autenticado mas sem user
      if (isAuthenticated && !user) {
      }
    }
  }, [loading, isAuthenticated, user, session]);

  return {
    isLoading: loading,
    hasInconsistentState: (session && !isAuthenticated) || (isAuthenticated && !user)
  };
}
