import { ROUTES_NAME } from '@/constants/ROUTES_NAME';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { LoadingScreen } from '@/components/LoadingScreen';

export const PublicRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  
  // Mostra loading enquanto verifica autenticação
  if (loading) {
    return <LoadingScreen />;
  }

  // Se o usuário está autenticado e está na página de login, redireciona para dashboard
  if (isAuthenticated && location.pathname === '/login') {
    return <Navigate to={ROUTES_NAME.DASHBOARD} replace />;
  }

  return <Outlet />;
};