import { ROUTES_NAME } from '@/constants/ROUTES_NAME';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { LoadingScreen } from '@/components/LoadingScreen';

export const PrivateRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Mostra loading enquanto verifica autenticação
  if (loading) {
    return (
      <LoadingScreen 
        title="Verificando autenticação..."
        message="Aguarde um momento."
      />
    );
  }

  // Se não estiver autenticado, redireciona para login
  // Salva a rota atual para redirecionamento após login
  if (!isAuthenticated) {
    return (
      <Navigate 
        to={ROUTES_NAME.LOGIN} 
        state={{ from: location.pathname }} 
        replace 
      />
    );
  }

  // Se autenticado, renderiza as rotas filhas
  return <Outlet />;
};