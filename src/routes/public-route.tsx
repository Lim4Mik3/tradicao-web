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

  // Não redireciona para login em rotas públicas
  const publicPaths = [
    ROUTES_NAME.HOME,
    ROUTES_NAME.POSTOS,
    ROUTES_NAME.INSTITUTIONAL,
    ROUTES_NAME.CONTATO,
    ROUTES_NAME.LOGIN,
  ];

  // Permite acesso a qualquer rota que comece com um dos caminhos públicos
  if (publicPaths.some(path => location.pathname.startsWith(path))) {
    return <Outlet />;
  }

  // Se o usuário está autenticado e está na página de login, redireciona para gas-stations
  if (isAuthenticated && location.pathname === ROUTES_NAME.LOGIN) {
    return <Navigate to={ROUTES_NAME.GAS_STATIONS} replace />;
  }

  // Se não está em rota pública, só permite se estiver autenticado
  if (isAuthenticated) {
    return <Outlet />;
  }

  // Se não está autenticado e não está em rota pública, redireciona para home
  return <Navigate to={ROUTES_NAME.HOME} replace />;
};