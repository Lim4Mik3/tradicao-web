import { Navigate, Outlet } from 'react-router-dom';

export const PublicRoute = () => {
  const session = JSON.parse(
    localStorage.getItem('@app::session') ?? "{}"
  );
  
  if (session.token) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};