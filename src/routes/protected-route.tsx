import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
  const token = JSON.parse(
    localStorage.getItem('@app::session') ?? "{}"
  );

  if (Object.keys(token).length === 0 || !token.token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};