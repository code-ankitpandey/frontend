// UserPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthToken, isTokenValid, getRoleFromToken } from '../utils/auth';


const UserPage = () => {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = getAuthToken();

    if (!token || !isTokenValid(token)) {
      navigate('/login'); // Redirect to login if no token or invalid token
      return;
    }

    const role = getRoleFromToken(token);
    if (role !== 'USER') {
      navigate('/login'); // Redirect to login page if the role is not ADMIN
      return;
    }


    setIsAuthorized(true);
  }, [navigate]);

  if (!isAuthorized) {
    return null; // Optionally return a loading spinner or nothing while checking the token
  }

  return <h1 className="text-center text-4xl mt-10">Welcome to the User Dashboard</h1>;
};

export default UserPage;
