import React from 'react';

const AccountTile = ({ account }) => {
  const link = "#";

  return (
    <>

      <div
        className="w-full max-w-xs p-6 mx-auto bg-gray-800 text-white rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 cursor-pointer border-4 relative mt-6"
        onClick={() => window.open(link, "_blank")}
      >
        <h3 className="text-xl font-semibold text-center mb-4">Ads. Accounts</h3>
        <div className="text-center text-2xl font-bold">
          {account}
        </div>
      </div>
    </>
  );
};

export default AccountTile;
