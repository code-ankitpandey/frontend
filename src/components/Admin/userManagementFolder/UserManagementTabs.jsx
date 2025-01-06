import React from 'react';

const UserManagementTabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="tabs flex justify-evenly mb-6 w-full max-w-4xl mx-4">
      <button
        onClick={() => onTabChange('create')}
        className={`tab ${activeTab === 'create' ? 'bg-blue-500 text-white' : 'bg-gray-200'} py-2 px-4 rounded-lg`}
      >
        Create User
      </button>
      <button
        onClick={() => onTabChange('modify')}
        className={`tab ${activeTab === 'modify' ? 'bg-blue-500 text-white' : 'bg-gray-200'} py-2 px-4 rounded-lg`}
      >
        Modify User
      </button>
      <button
        onClick={() => onTabChange('display')}
        className={`tab ${activeTab === 'display' ? 'bg-blue-500 text-white' : 'bg-gray-200'} py-2 px-4 rounded-lg`}
      >
        Display User
      </button>
    </div>
  );
};

export default UserManagementTabs;
