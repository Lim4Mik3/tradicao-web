import { LOCAL_STORAGE_KEYS } from '@/constants/LOCAL_STORAGE_KEYS';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = () => {
  const token = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_KEYS.SESSION) ?? "{}"
  );

  if (Object.keys(token).length === 0 || !token.token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};