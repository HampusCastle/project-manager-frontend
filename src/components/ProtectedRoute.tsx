import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isLoggedIn = !!localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (isLoggedIn && userRole === 'ROLE_ADMIN') {
    return children;
  }

  alert("Du är inte behörig att se denna sida.");
  return <Navigate to="/dashboard" />;
};

export default ProtectedRoute;