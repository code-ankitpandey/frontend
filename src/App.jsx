import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import AdminPage from './components/Admin/AdminPage';
import UserPage from './components/UserPage';
import UserManagement from './components/Admin/userManagementFolder/UserManagement';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/admin/user-management" element={<UserManagement />} />
      </Routes>
    </Router>
  );
};

export default App;
