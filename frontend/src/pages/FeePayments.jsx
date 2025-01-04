import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContextWrapper";
import dayjs from "dayjs";

const FeePayments = () => {
  const { user } = useContext(AuthContext); // Fetch user info from AuthContext
  const { id } = useParams(); // Get student ID from URL
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setError("Unauthorized. Please log in.");
          setIsLoading(false);
          return;
        }

        // Determine the API endpoint based on user role
        const endpoint = `${process.env.REACT_APP_BACKEND_URL}/api/v1/students/${user.id}/payments`;

        const response = await fetch(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch payments.");
        }

        setPayments(data.payments || []);
      } catch (err) {
        console.error(err);
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPayments();
  }, [id, user]);

  return (
    <div className="bg-indigo-50 min-h-screen overflow-x-hidden md:pt-36 pt-16">
      <div className="max-w-7xl mx-auto flex flex-col items-center p-4">
        <h1 className="text-2xl font-bold text-indigo-800 mb-6">
          {user.role === "admin"
            ? "All Fee Payments"
            : `Fee Payments for Student ID: ${user.id}`}
        </h1>

        {isLoading ? (
          <div className="text-center text-gray-600">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow-lg w-full">
            <table className="table-auto w-full text-left">
              <thead className="bg-indigo-100">
                <tr>
                  <th className="px-4 py-2 text-indigo-800">ID</th>
                  <th className="px-4 py-2 text-indigo-800">Method</th>
                  <th className="px-4 py-2 text-indigo-800">Reference</th>
                  <th className="px-4 py-2 text-indigo-800">Amount</th>
                  <th className="px-4 py-2 text-indigo-800">Description</th>
                  <th className="px-4 py-2 text-indigo-800">
                    Transaction Date
                  </th>
                  <th className="px-4 py-2 text-indigo-800">Created At</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, index) => (
                  <tr
                    key={payment.id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-indigo-50 transition-colors duration-200`}
                  >
                    <td className="px-4 py-2">{payment.id}</td>
                    <td className="px-4 py-2">{payment.paymentMethod}</td>
                    <td className="px-4 py-2">{payment.referenceNumber}</td>
                    <td className="px-4 py-2">{payment.amount}</td>
                    <td className="px-4 py-2">{payment.description}</td>
                    <td className="px-4 py-2">
                      {dayjs(payment.transactionDate).format(
                        "YYYY-MM-DD HH:mm:ss"
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {dayjs(payment.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeePayments;
