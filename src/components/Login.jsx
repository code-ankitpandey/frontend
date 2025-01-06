import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/axios'; // Import the centralized Axios instance

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate(); // useNavigate hook for navigation

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await apiClient.post('/auth/login', { username, password });
  
      if (response.status === 200) {
        const { token } = response.data;
        
        // Save JWT token in localStorage
        localStorage.setItem('jwtToken', token);
  
        // Manually decode the JWT token to extract the role
        const tokenPayload = JSON.parse(atob(token.split(".")[1])); // Decode the payload
        const userRole = tokenPayload.role; // Extract the role
        
        // Check the user's role and redirect accordingly
        if (userRole === 'ADMIN') {
          navigate('/admin');
        } else if (userRole === 'USER') {
          navigate('/user');
        } else {
          setError('Invalid role');
        }
      } else {
        const errorMessage = response.data.message || 'An error occurred. Please try again.';
        setError(errorMessage);  // Display the error message from the response
      }
    } catch (err) {
      console.error("Login error:", err); // Debugging statement
      const errorMessage = err.response?.data?.message || 'Login failed. Please check your credentials.';
      setError(errorMessage);  // Display error message from the caught exception
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-black to-gray-800">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-lg hover:from-purple-500 hover:to-blue-500 focus:ring focus:ring-blue-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
