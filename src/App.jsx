import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Public/Login";
import AdminPage from "./components/Admin/AdminPage";
import UserPage from "./components/User/UserPage";
import UserManagement from "./components/Admin/userManagementFolder/UserManagement";
import UserAccountManagement from "./components/Admin/userAccountMappingFolder/UserAccountManagement";
import BalanceHomepage from "./components/User/Deposit/BalanceHomepage";
import ResetPassword from "./components/Public/ResetPassword";
import { LoaderProvider } from "./utils/LoaderContext";
import PaymentTransactions from "./components/Admin/PaymentTransactions";
const App = () => {
  return (
    <LoaderProvider>
      <Router>
        <Routes>
          <Route index element={<Login />} /> {/* Default route */}
          <Route path="/login" element={<Login />} />
          <Route path="/adminhomepage" element={<AdminPage />} />
          <Route path="/homepage" element={<UserPage />} />
          <Route path="/admin/user-management" element={<UserManagement />} />
          <Route path="/admin/user-account-mapping" element={<UserAccountManagement/>} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/balancehomepage" element={<BalanceHomepage/>} />
          <Route path="/admin/payment-management" element={<PaymentTransactions/>} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </LoaderProvider>
  );
};

export default App;
