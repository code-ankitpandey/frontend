import React, { useState } from 'react';
import apiClient from '../../../api/axios';
import { useLoader } from '../../../utils/LoaderContext';

const ModifyUserForm = () => {
  const [username, setUsername] = useState('');
  const [fetchedUser, setFetchedUser] = useState(null);
  const [userData, setUserData] = useState({}); // Initialize as an empty object
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { showLoader, hideLoader } = useLoader(); // Use the loader context

  const authToken = localStorage.getItem('jwtToken'); // Get the Auth token from local storage

  // Handle username input change
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setError('');
    setSuccess('');
  };

  // Fetch user data API call
  const fetchUser = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      showLoader();
      const response = await apiClient.get(`/api/admin/user/getUser?userName=${username}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`, // Add Authorization header
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const data = response.data;  // Axios response body is in `data`
        setFetchedUser(data);
        setUserData(data);
      } else {
        throw new Error('Error: ' + response.statusText);
      }
    } catch (err) {
      setError(err.message);
      setFetchedUser(null);
      setUserData({});
      console.log(err);  // Log error for debugging
    } finally {
      hideLoader();
      setLoading(false);
    }
  };

  // Handle input changes in the user data form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: name === 'isActive' ? e.target.checked : value,
    }));
  };

  // Modify user data API call
  const modifyUser = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    console.log(userData)
    try {
      showLoader();
      const response = await apiClient.post(`/api/admin/user/modifyUser`, userData, {
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
        throw new Error('Failed to modify user');
      }

      setSuccess('User modified successfully!');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      hideLoader();
    }
  };

  // Validate the form (disable button if form is invalid)
  const isFormValid = userData.firstName && userData.lastName && userData.email && userData.role;

  return (
    <div className="modify-user bg-gray-900 text-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto border-2 border-white transition-all hover:shadow-2xl hover:border-gray-200">
      <h2 className="text-2xl font-semibold text-center mb-6">Modify User</h2>

      <input
        type="text"
        value={username}
        onChange={handleUsernameChange}
        placeholder="Enter Username"
        className="w-full px-4 py-2 mb-4 rounded-lg border-2 border-gray-500 bg-transparent text-white placeholder-gray-400 focus:ring-2 focus:ring-white focus:outline-none"
      />
      <button
        onClick={fetchUser}
        className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-800"
        disabled={loading || !username.trim()}
      >
        {loading && !fetchedUser ? 'Fetching...' : 'Fetch User'}
      </button>

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      {success && <p className="text-green-500 text-center mt-4">{success}</p>}

      {fetchedUser && (
        <div className="space-y-6 mt-6">
          <div>
            <input
              type="text"
              name="firstName"
              value={userData.firstName || ''}
              onChange={handleInputChange}
              placeholder="First Name"
              className="w-full px-4 py-2 rounded-lg border-2 border-gray-500 bg-gray-800 text-white focus:ring-2 focus:ring-white focus:outline-none"
            />
          </div>
          <div>
            <input
              type="text"
              name="lastName"
              value={userData.lastName || ''}
              onChange={handleInputChange}
              placeholder="Last Name"
              className="w-full px-4 py-2 rounded-lg border-2 border-gray-500 bg-gray-800 text-white focus:ring-2 focus:ring-white focus:outline-none"
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={userData.email || ''}
              onChange={handleInputChange}
              placeholder="Email"
              className="w-full px-4 py-2 rounded-lg border-2 border-gray-500 bg-gray-800 text-white focus:ring-2 focus:ring-white focus:outline-none"
            />
          </div>

          <div>
            <input
              type="number"
              step="0.01" // Allow decimal points for commission percentage
              name="commisionPercentage"
              value={userData.commisionPercentage || ''}
              onChange={handleInputChange}
              placeholder="Commission Percentage"
              className="w-full px-4 py-2 rounded-lg border-2 border-gray-500 bg-transparent text-white placeholder-gray-400 focus:ring-2 focus:ring-white focus:outline-none"
            />
          </div>

          <div className="flex items-center space-x-4">
            <label className="text-lg">Active Status</label>
            <input
              type="checkbox"
              name="isActive"
              checked={userData.isActive || false}
              onChange={handleInputChange}
              className="focus:ring-2 focus:ring-white"
            />
          </div>

          <div className="flex items-center space-x-4">
            <label className="text-lg">Role</label>
            <select
              name="role"
              value={userData.role || 'USER'}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border-2 border-gray-500 bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-white focus:outline-none"
            >
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>

          <button
            onClick={modifyUser}
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-800"
            disabled={loading || !isFormValid}
          >
            {loading && fetchedUser ? 'Modifying...' : 'Modify User'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ModifyUserForm;
