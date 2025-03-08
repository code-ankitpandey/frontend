import React, { useState } from "react";
import apiClient from "../../../api/axios";
import { useLoader } from "../../../utils/LoaderContext";

const UpdateBalance = ({ addAccounts = [], commissionPercentage, balance: initialBalance }) => {
  const [rechargeAmount, setRechargeAmount] = useState("");
  const [selectedAccount, setSelectedAccount] = useState(""); // Only one account selected
  const [balance, setBalance] = useState(initialBalance); // Use a state variable for balance
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { showLoader, hideLoader } = useLoader(); // Use the loader context

  const handleAccountChange = (event) => {
    setSelectedAccount(event.target.value); // Set the selected account
  };

  const handleRecharge = async (e) => {
    e.preventDefault();

    // Clear previous messages
    setErrorMessage("");
    setSuccessMessage("");

    // Validate if an account is selected
    if (!selectedAccount) {
      setErrorMessage("Error: Please select an account.");
      return;
    }

    // Calculate the total recharge amount with commission
    const totalAmount = parseFloat(rechargeAmount);
    const commissionAmount = (totalAmount * commissionPercentage) / 100;
    const totalRechargeAmount = totalAmount + commissionAmount;

    if (totalRechargeAmount > balance) {
      setErrorMessage(`${totalRechargeAmount} is greater than the available balance amount, Please deposit in your main wallet.`);
      return;
    }

    // Prepare the DTO object for recharge
    const rechargeRequest = {
      accountID: selectedAccount,
      amount: totalAmount,
    };

    const authToken = localStorage.getItem("jwtToken"); // Get the Auth token from local storage

    try {
      showLoader();
      // Call the API to perform the recharge
      const response = await apiClient.post(
        "/api/public/payment/updateBalance",
        rechargeRequest,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("API Response:", response.data); // Log the response to ensure the correct data is returned

      // Update the balance after successful recharge
      if (response.data && response.data.mainBalance !== undefined) {
        setBalance(response.data.mainBalance); // Update balance from backend response
        setSuccessMessage(response.data.message || "Recharge successful!");
      } else {
        setErrorMessage("Error: Unable to update balance.");
      }
    } catch (error) {
      // Handle errors based on the API response
      if (error.response) {
        if (error.response.status === 400) {
          setErrorMessage("Validation failed: " + (error.response.data || "Please check your inputs."));
        } else if (error.response.status === 500) {
          setErrorMessage("Server error occurred. Please try again later.");
        } else {
          setErrorMessage("An unexpected error occurred.");
        }
      } else {
        setErrorMessage(error.message || "An unexpected error occurred.");
      }
    } finally {
      hideLoader();
    }
};

  // Calculate total amount with commission whenever rechargeAmount or commissionPercentage changes
  const totalAmount = parseFloat(rechargeAmount);
  const commissionAmount = totalAmount && !isNaN(totalAmount) ? (totalAmount * commissionPercentage) / 100 : 0;
  const totalRechargeAmount = totalAmount + commissionAmount;

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto border-2 border-white transition-all hover:shadow-2xl hover:border-gray-200">
      <h2 className="text-2xl font-semibold text-center mb-6">Recharge Accounts</h2>
      <form className="space-y-6" onSubmit={handleRecharge}>
        {errorMessage && (
          <div className="text-red-500 text-sm p-2 rounded bg-red-100 text-center">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="text-green-500 text-sm p-2 rounded bg-green-100 text-center">
            {successMessage}
          </div>
        )}

        {/* Recharge Amount */}
        <div>
          <input
            type="number"
            step="0.01"
            placeholder="Recharge Amount"
            value={rechargeAmount}
            onChange={(e) => setRechargeAmount(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border-2 border-gray-500 bg-transparent text-white placeholder-gray-400 focus:ring-2 focus:ring-white focus:outline-none"
          />
        </div>

        {/* Display Total Amount */}
        {rechargeAmount && (
          <div className="text-white text-sm mb-4">
            <strong>Total Amount (including commission): </strong>
            {totalRechargeAmount.toFixed(2)}
          </div>
        )}

        {/* Account Selection (Dropdown) */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Select Account</h3>
          {Array.isArray(addAccounts) && addAccounts.length > 0 ? (
            <select
              value={selectedAccount}
              onChange={handleAccountChange}
              className="w-full px-4 py-2 rounded-lg border-2 text-black focus:ring-2 focus:ring-transparent focus:outline-none"
            >
              <option value="">-- Select an Account --</option>
              {addAccounts.map((account) => (
                <option key={account.accountId} value={account.accountId}>
                  Account {account.accountId}
                </option>
              ))}
            </select>
          ) : (
            <p>No accounts available.</p>
          )}
        </div>

        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </div>
      </form>

      {/* Display Main Balance */}
      <div className="text-white text-sm mt-4">
        <strong>Current Balance: </strong>
        {balance.toFixed(2)}
      </div>
    </div>
  );
};

export default UpdateBalance;
