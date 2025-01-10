import React, { useState } from 'react';
import AdminNavbar from '../AdminNavbar';
import UserManagementTabs from './UserManagementTabs';
import CreateUserForm from './CreateUserForm';
import ModifyUserForm from './ModifyUserForm';
import DisplayUserForm from './DisplayUserForm';
import Footer from '../../Public/Footer';
const UserManagement = () => {
  const [activeTab, setActiveTab] = useState('create'); // Default tab is "Create User"

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-black to-gray-800">
      <AdminNavbar />

      <div className="flex-grow flex flex-col justify-start items-center pt-12">
        <UserManagementTabs activeTab={activeTab} onTabChange={handleTabChange} />

        <div className="bg-transparent p-6 rounded-xl  w-3/4 max-w-2xl mx-auto ">
          {activeTab === 'create' && <CreateUserForm />}
          {activeTab === 'modify' && <ModifyUserForm />}
          {activeTab === 'display' && <DisplayUserForm />}
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default UserManagement;
