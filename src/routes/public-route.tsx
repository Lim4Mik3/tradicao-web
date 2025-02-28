import { LOCAL_STORAGE_KEYS } from '@/constants/LOCAL_STORAGE_KEYS';
import { ROUTES_NAME } from '@/constants/ROUTES_NAME';
import { Navigate, Outlet } from 'react-router-dom';

export const PublicRoute = () => {
  const session = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_KEYS.SESSION) ?? "{}"
  );
  
  if (session.token) {
    return <Navigate to={ROUTES_NAME.DASHBOARD} replace />;
  }

  return <Outlet />;
};