import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export const SecureConfirmLoginRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  
  // Se está carregando, mostra loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando acesso...</p>
        </div>
      </div>
    );
  }
  
  // Se já está autenticado, redireciona para dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  // Para rotas de confirmação, verifica se há uma solicitação de login pendente
  const requestLogin = JSON.parse(
    localStorage.getItem('REQUEST_LOGIN') ?? "{}"
  );
  
  if (!requestLogin.email) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};