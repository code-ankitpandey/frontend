import React, { useState, useEffect } from 'react';

const ModifyUserForm = ({ username, handleUsernameChange, fetchUser, fetchedUser, modifyUser, loading }) => {
  const [userData, setUserData] = useState(fetchedUser);

  // Update the local userData state when fetchedUser changes
  useEffect(() => {
    setUserData(fetchedUser);
  }, [fetchedUser]);

  // Handle changes in the input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="modify-user space-y-6">
      <h2 className="text-2xl font-semibold text-center mb-6">Modify User</h2>
      <input
        type="text"
        onChange={handleUsernameChange}
        placeholder="Enter Username"
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <button
        onClick={fetchUser}
        className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-300"
        disabled={loading}
      >
        {loading ? 'Fetching...' : 'Fetch User'}
      </button>

      {fetchedUser && (
        <div className="space-y-6">
          <div>
            <input
              type="text"
              name="firstName"
              value={userData.firstName || ''}
              onChange={handleInputChange}
              placeholder="First Name"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <input
              type="text"
              name="lastName"
              value={userData.lastName || ''}
              onChange={handleInputChange}
              placeholder="Last Name"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={userData.email || ''}
              onChange={handleInputChange}
              placeholder="Email"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <button
            onClick={modifyUser}
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-300"
            disabled={loading}
          >
            {loading ? 'Modifying...' : 'Modify User'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ModifyUserForm;
