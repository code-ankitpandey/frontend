import React, { useState } from 'react';
import apiClient from '../../../api/axios';
import { useLoader } from '../../../utils/LoaderContext';
const CreateUserForm = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    isActive: true,
    role: 'USER',
    commisionPercentage:'',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { showLoader, hideLoader } = useLoader(); // Use the loader context
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: name === 'isActive' ? e.target.checked : value, // Handle checkbox separately
    }));
  };
  const createUser = async (e) => {
    e.preventDefault(); // Prevent form submission
    setLoading(true);
    setError(''); // Clear previous errors

    const authToken = localStorage.getItem('jwtToken'); // Get the Auth token from local storage
    showLoader();
    try {
        const response = await apiClient.post('/api/admin/user/createUser', userData, {
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
            throw new Error('Failed to create user');
        }

        alert(`User Created: ${response.data}`); // Display success message
 
        // Reset form on successful creation
        setUserData({
            firstName: '',
            lastName: '',
            email: '',
            isActive: false,
            role: 'USER',
            commisionPercentage: '',
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
    <div className="create-user bg-gray-900 text-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto border-2 border-white transition-all hover:shadow-2xl hover:border-gray-200">
      <h2 className="text-2xl font-semibold text-center mb-6">Create User</h2>
      <form className="space-y-6" onSubmit={createUser}>
        <div>
          <input
            type="text"
            name="firstName"
            value={userData.firstName}
            onChange={handleInputChange}
            placeholder="First Name"
            className="w-full px-4 py-2 rounded-lg border-2 border-gray-500 bg-transparent text-white placeholder-gray-400 focus:ring-2 focus:ring-white focus:outline-none"
          />
        </div>
        <div>
          <input
            type="text"
            name="lastName"
            value={userData.lastName}
            onChange={handleInputChange}
            placeholder="Last Name"
            className="w-full px-4 py-2 rounded-lg border-2 border-gray-500 bg-transparent text-white placeholder-gray-400 focus:ring-2 focus:ring-white focus:outline-none"
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="w-full px-4 py-2 rounded-lg border-2 border-gray-500 bg-transparent text-white placeholder-gray-400 focus:ring-2 focus:ring-white focus:outline-none"
          />
        </div>

        <div>
          <input
            type="number"
            step="0.01" // Allow decimal points for commission percentage
            name="commisionPercentage"
            value={userData.commisionPercentage}
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
            checked={userData.isActive}
            onChange={handleInputChange}
            className="focus:ring-2 focus:ring-white"
          />
        </div>
        <div className="flex items-center space-x-4">
          <label className="text-lg">Role</label>
          <select
            name="role"
            value={userData.role}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border-2 border-gray-500 bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-red focus:outline-none"
          >
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-800"
          disabled={loading || !userData.email || !userData.firstName || !userData.lastName }
        >
          {loading ? 'Creating...' : 'Create User'}
        </button>
        {error && <p className="text-red-500 text-center">{error}</p>}
      </form>
    </div>
  );
}  
export default CreateUserForm;
