import React from 'react';
import { useNavigate } from 'react-router-dom';
const BalanceTile = ({ balance }) => {
  const link = "#";

  return (
    <>

      <div
        className="w-full max-w-xs p-6 mx-auto bg-gray-800 text-white  rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 cursor-pointer border-4 relative mt-6"
        onClick={() => window.open(link, "_blank")}
      >
        <h3 className="text-xl font-semibold text-center mb-4">Balance</h3>
        <div className="text-center text-2xl font-bold" onClick={() => navigate("/balancehomepage")}>
          ${balance.toFixed(2)}
        </div>
      </div>
    </>
  );
};

export default BalanceTile;
