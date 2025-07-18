import { ROUTES_NAME } from '@/constants/ROUTES_NAME';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { LoadingScreen } from '@/components/LoadingScreen';

export const PrivateRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  // Mostra loading enquanto verifica autenticação
  if (loading) {
    return (
      <LoadingScreen 
        title="Verificando autenticação..."
        message="Aguarde um momento."
      />
    );
  }

  // Se não estiver autenticado, redireciona para home
  if (!isAuthenticated) {
    return <Navigate to={ROUTES_NAME.HOME} replace />;
  }

  // Se autenticado, renderiza as rotas filhas
  return <Outlet />;
};