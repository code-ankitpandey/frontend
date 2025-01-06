import React, { useState } from 'react';
import AdminNavbar from '../AdminNavbar';
import UserManagementTabs from './UserManagementTabs'; // Assuming the Tabs component is in the same folder
import CreateUserForm from './CreateUserForm'; // Assuming the CreateUserForm component is in the same folder
import ModifyUserForm from './ModifyUserForm'; // Assuming the ModifyUserForm component is in the same folder
import DisplayUserForm from './DisplayUserForm'; // Assuming the DisplayUserForm component is in the same folder
import Footer from '../../Footer';

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState('create'); // Default tab is "Create User"
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    active: false,
    role: 'USER',
  });
  const [displayUsername, setDisplayUsername] = useState('');
  const [modifyUsername, setModifyUsername] = useState('');
  const [fetchedUser, setFetchedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Function to change tabs
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Function to handle Display username input changes
  const handleDisplayUsernameChange = (e) => {
    const value = e.target.value;
    setDisplayUsername(value);
    console.log(displayUsername)
  };

  // Function to handle Modify username input changes
  const handleModifyUsernameChange = (e) => {
    setModifyUsername(e.target.value);
  };

  // Function to create a user
  const createUser = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/createUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
 console.log(JSON.stringify(userData))
      if (!response.ok) throw new Error('Failed to create user');
      const data = await response.json();
      alert('User Created: ' + data.message); // Handle success
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch a user (for Display username)
  const fetchUser = async () => {
    setLoading(true);
    try {
      console.log(displayUsername)
      const response = await fetch(`/api/admin/user/getUser?username=${displayUsername}`);
      if (!response.ok) throw new Error('User not found');
      const data = await response.json();
      setFetchedUser(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to modify a user (for Modify username)
  const modifyUser = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/modifyUser/${modifyUsername}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fetchedUser),
      });

      if (!response.ok) throw new Error('Failed to modify user');
      const data = await response.json();
      alert('User Modified: ' + data.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-black to-gray-800">
      {/* Navbar component */}
      <AdminNavbar />

      <div className="flex-grow flex flex-col justify-start items-center pt-12">
        {/* Tabs Component */}
        <UserManagementTabs activeTab={activeTab} onTabChange={handleTabChange} />

        {/* Form Content */}
        <div className="bg-gray-100 p-6 rounded-xl shadow-md w-3/4 max-w-2xl mx-auto">
          {/* Tab content */}
          {activeTab === 'create' && (
            <CreateUserForm
              userData={userData}
              setUserData={setUserData}
              createUser={createUser}
              loading={loading}
              error={error}
              handleInputChange={handleInputChange}
            />
          )}

          {activeTab === 'modify' && (
            <ModifyUserForm
              username={modifyUsername} // Modified username for Modify form
              setUsername={setModifyUsername} // Modified username setter
              fetchedUser={fetchedUser}
              setFetchedUser={setFetchedUser}
              fetchUser={fetchUser}
              modifyUser={modifyUser}
              loading={loading}
              error={error}
            />
          )}

          {activeTab === 'display' && (
            <DisplayUserForm
              username={displayUsername} // Display username
              setUsername={setDisplayUsername} // Display username setter
              fetchedUser={fetchedUser}
              fetchUser={fetchUser}
              loading={loading}
            />
          )}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default UserManagement;
