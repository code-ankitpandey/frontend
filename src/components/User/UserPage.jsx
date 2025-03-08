
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthToken, isTokenValid, getRoleFromToken } from '../../utils/auth';
import Footer from '../Public/Footer';
import Navbar from './Navbar';
import GreetingMessage from './GreetingMessage';
import BalanceTile from './BalanceTile';
import AccountTile from './AccountTile';
import apiClient from '../../api/axios';

const UserPage = () => {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [balance, setBalance] = useState(0); // Use state to manage balance
  const [user, setUser] = useState(null); // Use state to manage accounts
  const [accounts, setAccounts] = useState([]); // Use state to manage accounts
  const [loading, setLoading] = useState(false); // Manage loading state
  const [error, setError] = useState(null); // Manage error state

  useEffect(() => {
    const token = getAuthToken();

    if (!token || !isTokenValid(token)) {
      navigate('/login'); // Redirect to login if no token or invalid token
      return;
    }

    const role = getRoleFromToken(token);
    if (role !== 'USER') {
      navigate('/login'); // Redirect to login page if the role is not USER
      return;
    }

    setIsAuthorized(true);

    const fetchData = async () => {
      try {
        setLoading(true);
        const authToken = localStorage.getItem('jwtToken'); // Get the Auth token from local storage
    
        // Fetch balance data
        const balanceResponse = await apiClient.get('/api/user/details/getBalance', {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        });
        if (balanceResponse.status === 200) {
          setBalance(balanceResponse.data); // Assuming the response body has the balance data
        } else {
          throw new Error('Error fetching balance');
        }
    
        // Fetch accounts data
        const accountsResponse = await apiClient.get('/api/user/details/getActiveAddAccounts', {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        });
        if (accountsResponse.status === 200) {
          setAccounts(accountsResponse.data); // Assuming the response body has the accounts data
          console.log(accountsResponse.data)
        } else {
          throw new Error('Error fetching accounts');
        }
    
        if(user == null){
        // Fetch user data (firstName, lastName, etc.)
        const userResponse = await apiClient.get('/api/user/details/getUser', {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        });
        if (userResponse.status === 200) {
          setUser(userResponse.data); // Assuming the response body has the user data (firstName, lastName, etc.)
          console.log(userResponse.data)
        } else {
          throw new Error('Error fetching user data');
        }
      }
      } catch (err) {
        console.error(err);
        setError(err.message); // Handle error
        setBalance(0);
        setAccounts([]);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [navigate]);

  if (!isAuthorized) {
    return null; // Optionally return a loading spinner or nothing while checking the token
  }

  if (loading) {
    return <div>Loading...</div>; // You can show a loading spinner here
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message if any
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-black to-gray-800">
      <Navbar />
      <div className="flex-grow bg-gray-100 bg-gradient-to-r from-black to-gray-800">
        <GreetingMessage firstName={user.firstName} lastName={user.lastName} />
      </div>

      <div className="flex flex-row">
        <BalanceTile balance={balance} user={user} accounts={accounts} />
        <AccountTile account={accounts.length} /> {/* Assuming accounts is an array */}
      </div>
      <Footer />
    </div>
  );
};

export default UserPage;
