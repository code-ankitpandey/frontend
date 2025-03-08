import React from 'react';
import { useNavigate } from 'react-router-dom';

const BalanceTile = ({ balance, user, accounts }) => {
  const navigate = useNavigate();

  const handleBalanceClick = () => {
    navigate('/balanceHomepage', {
      state: { balance, user, accounts },  // Pass user, balance, and accounts as state
    });
  };

  return (
    <div
      className="w-full max-w-xs p-6 mx-auto bg-gray-800 text-white rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 cursor-pointer border-4 relative mt-6"
      onClick={handleBalanceClick}
    >
      <h3 className="text-xl font-semibold text-center mb-4">Balance</h3>
      <div className="text-center text-2xl font-bold">
        ${balance.toFixed(2)}
      </div>
    </div>
  );
};

export default BalanceTile;
