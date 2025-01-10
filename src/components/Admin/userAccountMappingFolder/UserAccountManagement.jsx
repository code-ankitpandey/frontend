import React, { useState } from 'react';
import AdminNavbar from '../AdminNavbar';
import UserAccountManagementTabs from './UserAccountManagementTabs';

import Footer from '../../Public/Footer';
import MapAccountForm from './MapAccountForm';
const UserAccountManagement = () => {
  const [activeTab, setActiveTab] = useState('create'); // Default tab is "Create User"

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-black to-gray-800">
      <AdminNavbar />

      <div className="flex-grow flex flex-col justify-start items-center pt-12">
        <UserAccountManagementTabs activeTab={activeTab} onTabChange={handleTabChange} />

         <div className="bg-transparent p-6 rounded-xl  w-3/4 max-w-2xl mx-auto "> 
          {activeTab === 'create' && <MapAccountForm />}
          {/* {activeTab === 'modify' && <ModifyUserForm />}
          {activeTab === 'display' && <DisplayUserForm />} */}
        </div> 

      </div>

      <Footer />
    </div>
  );
};

export default UserAccountManagement;
