import React from "react";

const Transaction = ({ transaction }) => {
  const {
    paymentReferenceID,
    transactionType,
    transactionDate,
    amount,
    userName,
  } = transaction;

  // Determine label styles based on transaction type
  const transactionTypeStyles =
    transactionType === "CREDIT"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";

  return (
    <div className="border rounded-lg shadow-md p-4 bg-white">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        Payment Reference ID: {paymentReferenceID}
      </h2>
      <div className="mb-2">
        <span
          className={`px-2 py-1 text-sm font-medium rounded-full ${transactionTypeStyles}`}
        >
          {transactionType}
        </span>
      </div>
      <p className="text-gray-600">
        <strong>Date:</strong> {transactionDate}
      </p>
      <p className="text-gray-600">
        <strong>Amount:</strong> ${amount.toFixed(2)}
      </p>
      <p className="text-gray-600">
        <strong>User Name:</strong> {userName}
      </p>
    </div>
  );
};

export default Transaction;
