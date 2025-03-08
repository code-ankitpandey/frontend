import React, { useEffect, useState } from "react";
import apiClient from "../../api/axios";
import { useLoader } from "../../utils/LoaderContext";

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedImage, setSelectedImage] = useState(null); // For modal
    const [showModal, setShowModal] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState(10); // For items per page filter
    const [selectedTransactionType, setSelectedTransactionType] = useState(""); // For selected transaction type filter

    const { showLoader, hideLoader } = useLoader(); // Use the loader context

    useEffect(() => {
        // Fetch transactions when the component loads or the page changes
        fetchTransactions(currentPage);
    }, [currentPage, itemsPerPage, selectedTransactionType]); // Include selectedTransactionType in dependencies

    const authToken = localStorage.getItem("jwtToken");

    const fetchTransactions = async (page) => {
        showLoader();
        try {
            const response = await apiClient.get("/api/public/payment/getAllTransactions", {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
                params: {
                    page,
                    size: itemsPerPage,
                    transactionType: selectedTransactionType || undefined // Pass selected transaction type if available
                },
            });
            const { content, totalPages } = response.data;
            setTransactions(content); // Set the transactions (content from the API)
            setTotalPages(totalPages); // Set the total number of pages
        } catch (error) {
            console.error("Error fetching transactions:", error);
            setTransactions([]); // In case of an error, reset the transactions array
        } finally {
            hideLoader();
        }
    };

    const handlePageChange = (page) => {
        if (page >= 0 && page < totalPages) {
            setCurrentPage(page);
        }
    };

    // Function to format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString(); // This will return date and time in a readable format
    };

    return (
        <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-full mx-auto border-2 border-white">
            <h2 className="text-2xl font-semibold text-center mb-6">Transactions</h2>

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

                {/* Filter for Transaction Type */}
                <select
                    value={selectedTransactionType}
                    onChange={(e) => setSelectedTransactionType(e.target.value)}
                    className="bg-gray-800 text-white p-2 rounded"
                >
                    <option value="">All Types</option>
                    <option value="CREDIT">Credit</option>
                    <option value="DEBIT">Debit</option>
                </select>
            </div>

            <ul className="space-y-2">
                {transactions.map((transaction) => {
                    return (
                        <li
                            key={transaction.id}
                            className="p-4 text-yellow-600-400 rounded shadow border-2 flex items-center justify-between space-x-4 bg-gray-800 hover:bg-gray-700 transition-all duration-200"
                        >
                            {/* Transaction Details */}
                            <div className="flex-1 text-left space-x-4 flex items-center">
                                <div className="flex-1">

                                    {transaction.paymentReferenceID && (
                                        <p><strong>Reference ID:</strong> <span className="text-yellow-400 italic">{transaction.paymentReferenceID}</span></p>
                                    )}
                                    <p><strong>Amount:</strong>
                                        <span className={transaction.transactionType === "CREDIT" ? "text-green-400 italic" : "text-red-400 italic"}>
                                            ${transaction.transactionType === "CREDIT" ? `+${parseFloat(transaction.amount).toFixed(2)}` : `-${parseFloat(transaction.amount).toFixed(2)}`}
                                        </span>
                                    </p>
                                    <p><strong>User Name:</strong> <span className="text-yellow-400 italic">{transaction.userName || "N/A"}</span></p>
                                    <p><strong>Transaction Date:</strong> <span className="text-yellow-400 italic">{formatDate(transaction.transactionDate)}</span></p> {/* Display date and time */}
                                    <p><strong>Message:</strong> <span className="text-yellow-400 italic">{transaction.message || "N/A"}</span></p>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>

            {/* Pagination */}
            <div className="flex justify-center space-x-2 mt-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="py-2 px-4 rounded-lg bg-gray-700 text-gray-300"
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
                            : "bg-gray-700 text-gray-300"
                            }`}
                    >
                        {page + 1}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="py-2 px-4 rounded-lg bg-gray-700 text-gray-300"
                    disabled={currentPage === totalPages - 1}
                >
                    Next
                </button>
            </div>

            {/* Modal for Image Preview */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-gray-800 p-4 rounded-lg shadow-lg relative">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-2 right-2 text-white text-2xl"
                        >
                            &times;
                        </button>
                        <img
                            src={`data:image/jpeg;base64,${selectedImage}`}
                            alt="Full Screenshot"
                            className="max-w-full max-h-[80vh]"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Transactions;
