import React, { useState } from 'react';
import apiClient from '../../../api/axios';
import { useLoader } from '../../../utils/LoaderContext';

const MapAccountForm = () => {
  const [accountData, setAccountData] = useState({
    username: '',
    accountId: '',
    activeStatus: true,
    balance: 0.0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { showLoader, hideLoader } = useLoader(); // Use the loader context

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAccountData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value, // Handle checkbox separately
    }));
  };

  const createAccount = async (e) => {
    e.preventDefault(); // Prevent form submission
    setLoading(true);
    setError(''); // Clear previous errors

    const authToken = localStorage.getItem('jwtToken'); // Get the Auth token from local storage
    showLoader();
    try {
      const response = await apiClient.post('/api/admin/accounts/createAccount', accountData, {
        headers: {
          'Authorization': `Bearer ${authToken}`, // Add Authorization header
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 417) {
        // Handle EXPECTATION_FAILED status code
        setError(response.data || 'Expectation failed');
        return;
      }

      if (response.status !== 200) {
        // Handle other non-OK responses (e.g., 404, 500, etc.)
        throw new Error('Failed to create account');
      }

      alert(`Account Created: ${response.data}`); // Display success message

      // Reset form on successful creation
      setAccountData({
        username: '',
        accountId: '',
        activeStatus: true,
        balance: 0.0,
      });
    } catch (err) {
      setError(err.message); // Display error message
    } finally {
      setLoading(false);
      hideLoader();
    }
  };

  const ActionButton = ({ onClick, loading, disabled, label }) => (
    <button
      onClick={onClick}
      className={`w-full py-2 px-4 rounded-lg border-2 ${
        disabled
          ? 'border-gray-500 text-gray-500 cursor-not-allowed'
          : 'border-white text-white hover:shadow-[0_0_15px_#ffffff]'
      } transition duration-300`}
      disabled={disabled}
    >
      {label}
    </button>
  );

  return (
    <div className="create-account bg-gray-900 text-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto border-2 border-white transition-all hover:shadow-2xl hover:border-gray-200">
      <h2 className="text-2xl font-semibold text-center mb-6">Create Account</h2>
      <form className="space-y-6" onSubmit={createAccount}>
        <div>
          <input
            type="text"
            name="username"
            value={accountData.username}
            onChange={handleInputChange}
            placeholder="Username"
            className="w-full px-4 py-2 rounded-lg border-2 border-gray-500 bg-transparent text-white placeholder-gray-400 focus:ring-2 focus:ring-white focus:outline-none"
          />
        </div>
        <div>
          <input
            type="text"
            name="accountId"
            value={accountData.accountId}
            onChange={handleInputChange}
            placeholder="Account ID"
            className="w-full px-4 py-2 rounded-lg border-2 border-gray-500 bg-transparent text-white placeholder-gray-400 focus:ring-2 focus:ring-white focus:outline-none"
          />
        </div>
        <div>
          <input
            type="number"
            step="0.01" // Allow decimal points for balance
            name="balance"
            value={accountData.balance}
            onChange={handleInputChange}
            placeholder="Balance"
            className="w-full px-4 py-2 rounded-lg border-2 border-gray-500 bg-transparent text-white placeholder-gray-400 focus:ring-2 focus:ring-white focus:outline-none"
          />
        </div>

        <div className="flex items-center space-x-4">
          <label className="text-lg">Active Status</label>
          <input
            type="checkbox"
            name="activeStatus"
            checked={accountData.activeStatus}
            onChange={handleInputChange}
            className="focus:ring-2 focus:ring-white"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-800"
          disabled={loading || !accountData.username || !accountData.accountId || accountData.balance === 0}
        >
          {loading ? 'Creating...' : 'Create Account'}
        </button>
        {error && <p className="text-red-500 text-center">{error}</p>}
      </form>
    </div>
  );
};

export default MapAccountForm;
