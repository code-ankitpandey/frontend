import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getAuthToken, isTokenValid, getRoleFromToken } from '../../utils/auth';

const AdminProtectedRoute = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getAuthToken();

    if (!token || !isTokenValid(token)) {
      setIsAuthorized(false);
      setIsLoading(false);
      return;
    }

    const role = getRoleFromToken(token);

    if (role === 'ADMIN') {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Show a spinner or placeholder while loading
  }

  return isAuthorized ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminProtectedRoute;
