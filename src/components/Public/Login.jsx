import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../api/axios';
import { useLoader } from '../../utils/LoaderContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader(); // Use the loader context

  const handleLogin = async (e) => {
    e.preventDefault();
  
    showLoader(); // Show loader before API call
    try {
      const response = await apiClient.post('/auth/login', { username, password });
  
      if (response.status === 200) {
        const { token } = response.data;
        
        localStorage.setItem('jwtToken', token);
  
        const tokenPayload = JSON.parse(atob(token.split(".")[1]));
        const userRole = tokenPayload.role;
        
        if (userRole === 'ADMIN') {
          navigate('/adminhomepage');
        } else if (userRole === 'USER') {
          navigate('/homepage');
        } else {
          setError('Invalid role');
        }
      } else {
        const errorMessage = response.data.message || 'An error occurred. Please try again.';
        setError(errorMessage);
      }
    } catch (err) {
      console.error("Login error:", err);
      const errorMessage = err.response?.data?.message || 'Login failed. Please check your credentials.';
      setError(errorMessage);
    } finally {
      hideLoader(); // Hide loader after API call
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 border border-gray-700">
        <h2 className="text-3xl font-bold text-center font-mono text-white mb-6">Login</h2>
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block font-mono text-gray-300 font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-600 bg-gray-900 font-mono text-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block font-mono text-gray-300 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border font-mono border-gray-600 bg-gray-900 text-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 rounded-lg bg-gradient-to-r from-gray-600 to-gray-800 text-white hover:from-blue-600 hover:to-purple-600 focus:ring focus:ring-blue-500 shadow-lg 
            transition-transform transform hover:scale-105 relative overflow-hidden"
          >
            <span className="absolute inset-0 bg-white opacity-10 blur-md"></span>
            <span className="relative font-bold">Login</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
