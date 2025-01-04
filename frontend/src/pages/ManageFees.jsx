import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ManageFees = () => {
  const { id: studentId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    amount: "",
    paymentMethod: "",
    referenceNumber: "",
    description: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/students/${studentId}/payments`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      alert("Fee details added successfully");
      navigate(-1); // Navigate back to the previous page
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to add fee details");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-indigo-50 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-2xl font-bold text-indigo-800 mb-4">Manage Fees</h1>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="amount" className="block text-indigo-800 font-bold">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="paymentMethod"
              className="block text-indigo-800 font-bold"
            >
              Payment Method
            </label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded-md"
            >
              <option value="">Select Method</option>
              <option value="mpesa">Mpesa</option>
              <option value="cash">Cash</option>
              <option value="bank">Bank</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="referenceNumber"
              className="block text-indigo-800 font-bold"
            >
              Reference Number
            </label>
            <input
              type="text"
              id="referenceNumber"
              name="referenceNumber"
              value={formData.referenceNumber}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-indigo-800 font-bold"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
              rows="3"
            ></textarea>
          </div>
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`${
                isSubmitting
                  ? "bg-indigo-400"
                  : "bg-indigo-600 hover:bg-indigo-700"
              } text-white px-4 py-2 rounded-md transition duration-300`}
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManageFees;
