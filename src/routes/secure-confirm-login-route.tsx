import { LOCAL_STORAGE_KEYS } from '@/constants/LOCAL_STORAGE_KEYS';
import { Navigate, Outlet } from 'react-router-dom';

export const SecureConfirmLoginRoute = () => {
  const requestLogin = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_KEYS.REQUEST_LOGIN) ?? "{}"
  );
  
  if (!requestLogin.email) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};