import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '/login';
  };

  const isLoggedIn = !!localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  return (
    <nav className="bg-indigo-700 sticky top-0 z-50 p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white text-xl font-semibold cursor-pointer" onClick={() => navigate('/dashboard')}>
          Project Manager
        </div>
        <div className="space-x-4">
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="text-white hover:text-gray-300">Dashboard</Link>
              <Link to="/profile" className="text-white hover:text-gray-300">Profile</Link>
              {userRole === 'ROLE_ADMIN' && (
                <Link to="/user-list" className="text-white hover:text-gray-300">User List</Link>
              )}
              <button onClick={handleLogout} className="text-white hover:text-gray-300">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:text-gray-300">Login</Link>
              <Link to="/register" className="text-white hover:text-gray-300">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;