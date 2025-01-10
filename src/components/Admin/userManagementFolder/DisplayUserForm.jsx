import React, { useState } from 'react';
import apiClient from '../../../api/axios';
import { useLoader } from '../../../utils/LoaderContext';
const DisplayUserForm = () => {
  const [username, setUsername] = useState('');
  const [fetchedUser, setFetchedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
    const { showLoader, hideLoader } = useLoader(); // Use the loader context
  // Handle username input change
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  // API call to fetch user
  const fetchUser = async () => {
    setLoading(true);
    setError('');
    setFetchedUser(null); // Clear previous user data
    const authToken = localStorage.getItem('jwtToken'); // Get the Auth token from local storage
   
    console.log(username)
    try {
      showLoader();
      const response = await apiClient.get(`/api/admin/user/getUser?userName=${username}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`, // Add Authorization header
          'Content-Type': 'application/json',
        },
      });

      // Axios automatically parses the response as JSON, so we don't need to call response.json()
      if (response.status === 200) {
        const data = response.data;  // Axios response body is in `data`
        setFetchedUser(data);
      } else {
        throw new Error('Error: ' + response.statusText);
      }
    } catch (err) {
      setError(err.message); // Handle error
    } finally {
      setLoading(false);
      hideLoader();
    }

  };

  return (
    <div className="display-user bg-gray-900 text-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto border-2 border-white transition-all hover:shadow-2xl hover:border-gray-200">
      <h2 className="text-2xl font-semibold text-center mb-6">Display User</h2>

      <InputField
        value={username}
        onChange={handleUsernameChange}
        placeholder="Enter Username"
      />

      <ActionButton
        onClick={fetchUser}
        loading={loading}
        disabled={loading || !username.trim()}
        label={loading ? 'Fetching...' : 'Fetch User'}
      />

      {error && <ErrorMessage message={error} />}

      {fetchedUser && <UserDetails user={fetchedUser} />}
    </div>
  );
};

const InputField = ({ value, onChange, placeholder }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="w-full px-4 py-2 mb-4 rounded-lg border-2 border-gray-500 bg-transparent text-white placeholder-gray-400 focus:ring-2 focus:ring-white focus:outline-none"
  />
);

const ActionButton = ({ onClick, loading, disabled, label }) => (
  <button
    onClick={onClick}
    type="button"
    className={`w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-800 ${disabled ? 'cursor-not-allowed' : ''}`}
    disabled={disabled}
  >
    {loading ? 'Creating...' : label}
  </button>
);

const ErrorMessage = ({ message }) => (
  <p className="text-red-500 text-center mt-4">{message}</p>
);

const UserDetails = ({ user }) => (
  <div className="space-y-6 mt-6">
    <DetailField label="First Name" value={user.firstName} />
    <DetailField label="Last Name" value={user.lastName} />
    <DetailField label="Email" value={user.email} />
    <DetailField label="Commision Percentage" value={user.commisionPercentage} />
    <DetailField label="Role" value={user.role} />
    <DetailField label="Active Status" value={user.isActive} />

  </div>
);

const DetailField = ({ label, value }) => (
  <div>
    <label className="text-lg block mb-2">{label}</label>
    <input
      type="text"
      value={value || ''}
      readOnly
      className="w-full px-4 py-2 rounded-lg border-2 border-gray-500 bg-gray-800 text-white focus:outline-none"
    />
  </div>
);

export default DisplayUserForm;
