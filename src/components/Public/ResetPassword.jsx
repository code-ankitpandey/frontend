import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../api/axios';
import { useLoader } from '../../utils/LoaderContext';
const ResetPassword = () => {
  // State variables to manage form data and responses
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
    const { showLoader, hideLoader } = useLoader(); // Use the loader context

  // Navigation hook
  const navigate = useNavigate();

  // Get the token from URL query parameters
  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get('token');
  
  const handleResetPassword = async (e) => {
    e.preventDefault();
    showLoader();
    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      showLoader();
      const response = await apiClient.post(
           '/auth/changeUserPassword',
        null, // No body content (since you're using @RequestParam for the new password)
        {
          params: { newPassword: password }, // Pass new password as a query parameter
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in the Authorization header
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        setSuccess('Password has been successfully changed!');
      } else {
        setError('Failed to change password. Please try again.');
      }
    } catch (err) {
      setError('An error occurred while changing the password.');
    } finally {
      setLoading(false);
      hideLoader();
    }
  };

  useEffect(() => {
    if (!token) {
      setError('Invalid or expired reset token.');
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <form onSubmit={handleResetPassword}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium">
              New Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-2 p-2 w-full bg-gray-700 text-white border border-gray-600 rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="mt-2 p-2 w-full bg-gray-700 text-white border border-gray-600 rounded-lg"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg mb-4"
            disabled={loading}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
        <button
          onClick={() => navigate('/login')}
          className="w-full py-2 bg-slate-500 hover:bg-blue-600 text-white font-bold rounded-lg"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
