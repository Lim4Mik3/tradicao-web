import { Navigate, Outlet } from 'react-router-dom';

export const SecureConfirmLoginRoute = () => {
  const requestLogin = JSON.parse(
    localStorage.getItem('@app::request-login') ?? "{}"
  );
  
  if (!requestLogin.email) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};