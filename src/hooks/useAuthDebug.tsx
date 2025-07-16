import { useEffect } from 'react';
import { useAuth } from './useAuth';

/**
 * Hook para debug do estado de autenticação
 * Apenas para desenvolvimento
 */
export function useAuthDebug() {
  const auth = useAuth();

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.group('🔐 Auth Debug');
      console.log('Loading:', auth.loading);
      console.log('Is Authenticated:', auth.isAuthenticated);
      console.log('User:', auth.user);
      console.log('Session:', auth.session);
      console.groupEnd();
    }
  }, [auth.loading, auth.isAuthenticated, auth.user, auth.session]);

  return auth;
}
