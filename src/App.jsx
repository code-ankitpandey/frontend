import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Public/Login";
import AdminPage from "./components/Admin/AdminPage";
import UserPage from "./components/User/UserPage";
import UserManagement from "./components/Admin/userManagementFolder/UserManagement";
import UserAccountManagement from "./components/Admin/userAccountMappingFolder/UserAccountManagement";
import ResetPassword from "./components/Public/ResetPassword";
import { LoaderProvider } from "./utils/LoaderContext";
const App = () => {
  return (
    <LoaderProvider>
      <Router>
        <Routes>
          <Route index element={<Login />} /> {/* Default route */}
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/admin/user-management" element={<UserManagement />} />
          <Route path="/admin/user-account-mapping" element={<UserAccountManagement/>} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </LoaderProvider>
  );
};

export default App;
