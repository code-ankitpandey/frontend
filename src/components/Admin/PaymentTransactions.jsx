import React, { useEffect, useState } from "react";
import apiClient from "../../api/axios";
import { useLoader } from "../../utils/LoaderContext";
import AdminNavbar from "./AdminNavbar";
import Footer from "../Public/Footer";

const PaymentTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedStatus, setSelectedStatus] = useState("PENDING");
  const [selectedImage, setSelectedImage] = useState(null); // For storing selected screenshot
  const [showModal, setShowModal] = useState(false); // For showing the modal

  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    fetchTransactions(currentPage);
  }, [currentPage, itemsPerPage, selectedStatus]);

  const authToken = localStorage.getItem("jwtToken");

  const fetchTransactions = async (page) => {
    showLoader();
    try {
      const response = await apiClient.get("/api/admin/payment/getDepositsByPaymentStatus", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        params: {
          page,
          size: itemsPerPage,
          paymentstatus: selectedStatus,
        },
      });
      const { content, totalPages } = response.data;
      setTransactions(content);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setTransactions([]);
    } finally {
      hideLoader();
    }
  };

  const handlePageChange = (page) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

  const handleApprove = async (paymentID) => {
    try {
      const response = await apiClient.post(
        "/api/admin/payment/approveDeposit",
        null,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          params: { paymentID },
        }
      );
      alert("Transaction Approved: " + response.data);
      fetchTransactions(currentPage); // Reload the transactions
    } catch (error) {
      console.error("Error approving transaction:", error);
      alert("Error approving transaction");
    }
  };

  const handleReject = async (paymentID) => {
    try {
      const response = await apiClient.post(
        "/api/admin/payment/rejectDeposit",
        null,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          params: { paymentID },
        }
      );
      alert("Transaction Rejected: " + response.data);
      fetchTransactions(currentPage); // Reload the transactions
    } catch (error) {
      console.error("Error rejecting transaction:", error);
      alert("Error rejecting transaction");
    }
  };

  const getStatus = (status) => {
    switch (status) {
      case "APPROVED":
        return { text: "Approved", borderColor: "bg-green-500" };
      case "REJECTED":
        return { text: "Rejected", borderColor: "bg-red-500" };
      case "PENDING":
        return { text: "Pending", borderColor: "bg-yellow-500" };
      default:
        return { text: "Unknown", borderColor: "bg-gray-500" };
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-black to-gray-800">
      {/* Admin Navbar */}
      <AdminNavbar />

      {/* Main Content */}
      <div className="flex-grow flex flex-col justify-start items-center pt-12">
        <h2 className="text-2xl font-semibold text-center mb-6 text-white">Payment Transactions</h2>

        {/* Filter for Items per page */}
        <div className="flex justify-end mb-4 space-x-4">
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="bg-gray-800 text-white p-2 rounded"
          >
            <option value={10}>10 items per page</option>
            <option value={20}>20 items per page</option>
            <option value={30}>30 items per page</option>
          </select>

          {/* Filter for Payment Status */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-gray-800 text-white p-2 rounded"
          >
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>

        {/* Transaction List */}
        <ul className="space-y-2">
          {transactions.map((transaction) => {
            const { text, borderColor } = getStatus(transaction.paymentStatus);
            return (
              <li
                key={transaction.id}
                className="p-4 rounded shadow border-2 flex items-center justify-between space-x-4 bg-gray-800 hover:bg-gray-700 transition-all duration-200"
              >
                <div className="flex-1 text-left space-x-4 flex items-center text-slate-300">
                  <div className="flex-1">
                    <p><strong>Reference ID:</strong> {transaction.paymentReferenceID}</p>
                    <p><strong>Amount:</strong> ${parseFloat(transaction.amount).toFixed(2)}</p>
                    <p><strong>Payment Method:</strong> {transaction.paymentApp || "N/A"}</p>
                    <p><strong>Transaction Date:</strong> {formatDate(transaction.transactionDate)}</p>
                    {/* Screenshot */}
                    {transaction.screenshot && (
                      <button
                        onClick={() => handleImageClick(transaction.screenshot)}
                        className="text-yellow-500 hover:text-yellow-400 mt-2"
                      >
                        View Screenshot
                      </button>
                    )}
                  </div>
                  <div className="flex-none text-left">
                    <p className="flex items-center space-x-2">
                      <span className={`w-3 h-3 rounded-full ${borderColor}`}></span>
                      <span>{text}</span>
                    </p>
                  </div>
                </div>

                <div className="flex-none text-center space-x-4">
                  {/* Approve Button */}
                  {transaction.paymentStatus === "PENDING" && (
                    <button
                      onClick={() => handleApprove(transaction.id)}
                      className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-400 transition-all duration-200"
                    >
                      Approve
                    </button>
                  )}
                  {/* Reject Button */}
                  {transaction.paymentStatus === "PENDING" && (
                    <button
                      onClick={() => handleReject(transaction.id)}
                      className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-400 transition-all duration-200"
                    >
                      Reject
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>

        {/* Pagination */}
        <div className="flex justify-center space-x-2 mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="py-2 px-4 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition-all duration-200"
            disabled={currentPage === 0}
          >
            Previous
          </button>
          {[...Array(totalPages).keys()].map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`py-2 px-4 rounded-lg ${currentPage === page
                ? "bg-blue-500 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
            >
              {page + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="py-2 px-4 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition-all duration-200"
            disabled={currentPage === totalPages - 1}
          >
            Next
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Modal for Screenshot */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-lg w-full">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
            <img
              src={`data:image/jpeg;base64,${selectedImage}`}
              alt="Transaction Screenshot"
              className="w-full h-auto rounded"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentTransactions;
