/**
 * Utilitários para gerenciar a autenticação
 */

/**
 * Limpa dados de autenticação do localStorage
 */
export function clearAuthData() {
  localStorage.removeItem('supabase_session');
  localStorage.removeItem('user');
  localStorage.removeItem('sb-' + import.meta.env.VITE_SUPABASE_URL?.replace('https://', '').replace('.supabase.co', '') + '-auth-token');
}

/**
 * Verifica se existe dados de autenticação no localStorage
 */
export function hasStoredAuthData(): boolean {
  const session = localStorage.getItem('supabase_session');
  const user = localStorage.getItem('user');
  
  return !!(session && user);
}

/**
 * Recupera dados de autenticação do localStorage
 */
export function getStoredAuthData() {
  try {
    const sessionData = localStorage.getItem('supabase_session');
    const userData = localStorage.getItem('user');
    
    if (!sessionData || !userData) {
      return null;
    }
    
    const session = JSON.parse(sessionData);
    const user = JSON.parse(userData);
    
    // Verifica se a sessão não expirou
    const now = Math.round(Date.now() / 1000);
    if (session.expires_at && session.expires_at < now) {
      clearAuthData();
      return null;
    }
    
    return { session, user };
  } catch (error) {
    clearAuthData();
    return null;
  }
}
