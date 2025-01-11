import React, { useState } from "react";
import apiClient from "../../../api/axios";
import { useLoader } from "../../../utils/LoaderContext";
const AddMoney = () => {
    const [amount, setAmount] = useState("");
    const [referenceId, setReferenceId] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("PAYTM");
    const [screenshot, setScreenshot] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const { showLoader, hideLoader } = useLoader(); // Use the loader context

    const handleDeposit = async (e) => {
        e.preventDefault();

        // Clear previous messages
        setErrorMessage("");
        setSuccessMessage("");
        console.log(paymentMethod)
        // Prepare the DTO object
        const depositRequest = new FormData();
        depositRequest.append("amount", parseFloat(amount));
        depositRequest.append("paymentReferenceID", referenceId);
        depositRequest.append("paymentApp", paymentMethod);
        if (screenshot) {
            depositRequest.append("screenshot", screenshot);
        }

        const authToken = localStorage.getItem("jwtToken"); // Get the Auth token from local storage

        try {
            showLoader();
            console.log(depositRequest)
            // Use the apiClient to call the API
            const response = await apiClient.post("/api/public/deposit/addMoney", depositRequest, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            // If successful, show the success message
            setSuccessMessage(response.data);
        } catch (error) {
            // Handle errors based on the API response
            if (error.response) {
                if (error.response.status === 400) {
                    // Validation error
                    setErrorMessage(
                        "Validation failed: " +
                        (error.response.data || "Please check your inputs.")
                    );
                } else if (error.response.status === 409) {
                    // Conflict error
                    setErrorMessage(error.response.data || "Conflict error occurred.");
                } else if (error.response.status === 500) {
                    // Server error
                    setErrorMessage(
                        error.response.data || "An error occurred on the server."
                    );
                } else {
                    // Other errors
                    setErrorMessage(error.response.data || "An unexpected error occurred.");
                }
            } else {
                // Network or other client-side errors
                setErrorMessage(error.message || "An unexpected error occurred.");
            }
        } finally {
            hideLoader();
        }
    };

    return (
        <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto border-2 border-white transition-all hover:shadow-2xl hover:border-gray-200">
            <h2 className="text-2xl font-semibold text-center mb-6">Add Money</h2>
            <form className="space-y-6" onSubmit={handleDeposit}>
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
                <div>
                    <input
                        type="number"
                        step="0.01"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border-2 border-gray-500 bg-transparent text-white placeholder-gray-400 focus:ring-2 focus:ring-white focus:outline-none"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Payment Reference ID"
                        value={referenceId}
                        onChange={(e) => setReferenceId(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border-2 border-gray-500 bg-transparent text-white placeholder-gray-400 focus:ring-2 focus:ring-white focus:outline-none"
                    />
                </div>
                <div><select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-500 bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-white focus:outline-none"
                >
                    <option value="PAYTM">Paytm</option>
                    <option value="PHONEPE">Phonepe</option>
                    <option value="GOOGLEPAY">Google Pay</option>
                    <option value="UPI">UPI</option>
                </select>

                </div>
                <div>
                    <label className="block text-gray-400 mb-2">Upload Screenshot</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setScreenshot(e.target.files[0])}
                        className="w-full px-4 py-2 rounded-lg border-2 border-gray-500 bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-white focus:outline-none"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddMoney;
