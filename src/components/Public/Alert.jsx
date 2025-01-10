// Alert.js
import React from 'react';

const Alert = ({ message, color }) => {
  const alertStyle = {
    position: 'fixed',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '10px 20px',
    borderRadius: '5px',
    backgroundColor: color || 'lightblue',
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    zIndex: 9999,
  };

  return <div style={alertStyle}>{message}</div>;
};

export default Alert;
