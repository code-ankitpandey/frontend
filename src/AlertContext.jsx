// AlertContext.js
import React, { createContext, useState, useContext } from 'react';
import Alert from './components/Public/Alert';
const AlertContext = createContext();

export const useAlert = () => {
  return useContext(AlertContext);
};

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, color) => {
    setAlert({ message, color });
    setTimeout(() => {
      setAlert(null); // Hide the alert after 5 seconds
    }, 5000);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert && <Alert message={alert.message} color={alert.color} />}
    </AlertContext.Provider>
  );
};
