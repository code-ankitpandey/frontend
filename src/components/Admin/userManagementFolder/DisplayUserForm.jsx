import React from 'react';

const DisplayUserForm = ({ username, handleUsernameChange, fetchUser, fetchedUser }) => {
  return (
    <div className="display-user">
      <h2 className="text-2xl font-semibold text-center mb-6">Display User</h2>
      <input
        type="text"
        
        onChange={handleUsernameChange}
        placeholder="Enter Username"
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <button
        onClick={fetchUser}
        className="w-full py-2 px-4 mt-[5px] bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-300"
      >
        {fetchedUser ? 'User Fetched' : 'Fetch User'}
      </button>

      {fetchedUser && (
        <div className="space-y-6">
          <div>
            <label className="text-lg">First Name</label>
            <input
              type="text"
              value={fetchedUser.firstName || ''}
              readOnly
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-lg">Last Name</label>
            <input
              type="text"
              value={fetchedUser.lastName || ''}
              readOnly
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-lg">Email</label>
            <input
              type="email"
              value={fetchedUser.email || ''}
              readOnly
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayUserForm;
