import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthToken, isTokenValid, getRoleFromToken } from '../../utils/auth';
import AdminNavbar from './AdminNavbar';
import Footer from '../Public/Footer';

import AdminDashboard from './AdminDashboard';

const AdminPage = () => {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = getAuthToken();

    if (!token || !isTokenValid(token)) {
      navigate('/login'); // Redirect to login if no token or invalid token
      return;
    }

    const role = getRoleFromToken(token);

    if (role !== 'ADMIN') {
      navigate('/login'); // Redirect to user page if the role is not ADMIN
      return;
    }

    setIsAuthorized(true);
  }, [navigate]);

  if (!isAuthorized) {
    return null; // Optionally return a loading spinner or nothing while checking the token
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-black to-gray-800">

      <AdminNavbar />

      <div className="flex-grow bg-gray-100 bg-gradient-to-r from-black to-gray-800">
        <AdminDashboard />
      </div>

<Footer/>
    </div>
  );
};

export default AdminPage;
