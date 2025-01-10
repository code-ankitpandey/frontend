import React from 'react';
const UserAccountManagementTabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="tabs flex justify-evenly mb-6 w-full max-w-4xl mx-auto">
      <button
        onClick={() => onTabChange('create')}
        className={`tab py-2 px-4 rounded-lg border-2 ${
          activeTab === 'create'
            ? 'border-white text-white shadow-[0_0_10px_#ffffff]'
            : 'border-gray-500 text-gray-400'
        } hover:shadow-[0_0_15px_#ffffff] transition duration-300`}
      >
        Map Account
      </button>
      <button
        onClick={() => onTabChange('modify')}
        className={`tab py-2 px-4 rounded-lg border-2 ${
          activeTab === 'modify'
            ? 'border-white text-white shadow-[0_0_10px_#ffffff]'
            : 'border-gray-500 text-gray-400'
        } hover:shadow-[0_0_15px_#ffffff] transition duration-300`}
      >
        Modify Mapping
      </button>
      <button
        onClick={() => onTabChange('display')}
        className={`tab py-2 px-4 rounded-lg border-2 ${
          activeTab === 'display'
            ? 'border-white text-white shadow-[0_0_10px_#ffffff]'
            : 'border-gray-500 text-gray-400'
        } hover:shadow-[0_0_15px_#ffffff] transition duration-300`}
      >
        Display Mapping
      </button>
      
    </div>
  );
};

export default UserAccountManagementTabs;

