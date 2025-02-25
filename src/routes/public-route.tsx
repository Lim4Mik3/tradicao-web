import { LOCAL_STORAGE_KEYS } from '@/constants/LOCAL_STORAGE_KEYS';
import { Navigate, Outlet } from 'react-router-dom';

export const PublicRoute = () => {
  const session = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_KEYS.SESSION) ?? "{}"
  );
  
  if (session.token) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};