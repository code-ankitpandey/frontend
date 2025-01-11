import React, { useState } from "react";
import Navbar from "../Navbar";
import Footer from "../../Public/Footer";
import AddMoney from "../deposit/AddMoney";
import DepositTransactions from "./DepositTransactions";

const BalanceHomepage = () => {
  const [activeTab, setActiveTab] = useState("Deposit");
  const [subTab, setSubTab] = useState("AddMoney");

  const balance = 5000; // Example balance; replace with dynamic data

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <Navbar />

      {/* Balance Tile */}
      <div className="flex justify-center my-6">
        <div className="bg-gray-800 shadow-lg p-6 rounded-lg text-center border-2 border-white">
          <h2 className="text-2xl font-bold text-white">Balance: ${balance}</h2>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center space-x-4 mb-4">
        {["Deposit", "Update Balance", "Transactions"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`tab py-2 px-4 rounded-lg border-2 ${
              activeTab === tab
                ? "border-white text-white shadow-[0_0_10px_#ffffff]"
                : "border-gray-500 text-gray-400"
            } hover:shadow-[0_0_15px_#ffffff] transition duration-300`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Based on Active Tab */}
      <div className="p-4">
        {activeTab === "Deposit" && (
          <>
            {/* Sub-tabs for Deposit */}
            <div className="flex space-x-4 mb-4">
              {["AddMoney", "DepositTransactions"].map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSubTab(sub)}
                  className={`tab py-2 px-4 rounded-lg border-2 ${
                    subTab === sub
                      ? "border-white text-white shadow-[0_0_10px_#ffffff]"
                      : "border-gray-500 text-gray-400"
                  } hover:shadow-[0_0_15px_#ffffff] transition duration-300`}
                >
                  {sub === "AddMoney" ? "Add Money" : "Deposit Transactions"}
                </button>
              ))}
            </div>

            {/* Sub-tab Content */}
            {subTab === "AddMoney" && <AddMoney/>}
            {subTab === "DepositTransactions" && <DepositTransactions/>}
          </>
        )}

        {activeTab === "Update Balance" && (
          <div className="bg-gray-900 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Update Balance</h3>
            <p>Balance update functionality coming soon.</p>
          </div>
        )}

        {activeTab === "Transactions" && (
          <div className="bg-gray-900 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">All Transactions</h3>
            <p>Transaction history functionality coming soon.</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default BalanceHomepage;
