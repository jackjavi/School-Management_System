import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FeeStructure = () => {
  const [feeCategory, setFeeCategory] = useState("");
  const [term, setTerm] = useState("");
  const [amount, setAmount] = useState("");
  const [year, setYear] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [feeStructures, setFeeStructures] = useState([]); // Fee structures list
  const [loadingStructures, setLoadingStructures] = useState(true); // Loading indicator for structures
  const navigate = useNavigate();

  const fetchFeeStructures = async () => {
    setLoadingStructures(true);
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/fees/structures`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setFeeStructures(response.data || []);
    } catch (err) {
      console.error("Error fetching fee structures:", err);
      setError(
        err.response?.data?.message || "Failed to fetch fee structures."
      );
    } finally {
      setLoadingStructures(false);
    }
  };

  useEffect(() => {
    fetchFeeStructures();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/fees/update`,
        { feeCategory, term, amount, year },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccessMessage(response.data.message);
      setFeeCategory("");
      setTerm("");
      setAmount("");
      setYear("");

      // Refresh fee structures after adding
      fetchFeeStructures();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update fees.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-indigo-50 min-h-screen flex flex-col md:flex-row justify-center gap-8 pt-32 pb-16 px-4">
      {/* Form for adding/updating fee structures */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">
          Fee Structure Management
        </h2>
        {error && <p className="text-red-600">{error}</p>}
        {successMessage && <p className="text-green-600">{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Fee Category
            </label>
            <select
              value={feeCategory}
              onChange={(e) => setFeeCategory(e.target.value)}
              className="border p-2 w-full rounded-md"
              required
            >
              <option value="">Select Fee Category</option>
              <option value="ECDE">ECDE</option>
              <option value="Junior Primary">Junior Primary</option>
              <option value="Senior Secondary">Senior Secondary</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Term</label>
            <select
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              className="border p-2 w-full rounded-md"
              required
            >
              <option value="">Select Term</option>
              <option value="Term 1">Term 1</option>
              <option value="Term 2">Term 2</option>
              <option value="Term 3">Term 3</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border p-2 w-full rounded-md"
              placeholder="Enter fee amount"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Academic Year
            </label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="border p-2 w-full rounded-md"
              placeholder="Enter the Year"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md w-full hover:bg-indigo-700 transition duration-300"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Submit"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/users")}
            className="mt-4 bg-gray-300 text-gray-800 px-4 py-2 rounded-md w-full hover:bg-gray-400 transition duration-300"
          >
            Back to Admin Users
          </button>
        </form>
      </div>

      {/* Table displaying all fee structures */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl overflow-y-scroll">
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">
          Fee Structures
        </h2>
        {loadingStructures ? (
          <div>Loading fee structures...</div>
        ) : feeStructures.length > 0 ? (
          <table className="table-auto w-full text-left border-collapse">
            <thead className="bg-indigo-100">
              <tr>
                <th className="px-4 py-2 text-indigo-800">ID</th>
                <th className="px-4 py-2 text-indigo-800">Category</th>
                <th className="px-4 py-2 text-indigo-800">Term</th>
                <th className="px-4 py-2 text-indigo-800">Amount</th>
                <th className="px-4 py-2 text-indigo-800">Year</th>
              </tr>
            </thead>
            <tbody>
              {feeStructures.map((fee) => (
                <tr
                  key={fee.id}
                  className="hover:bg-indigo-50 transition duration-200"
                >
                  <td className="px-4 py-2">{fee.id}</td>
                  <td className="px-4 py-2">{fee.feeCategory}</td>
                  <td className="px-4 py-2">{fee.term}</td>
                  <td className="px-4 py-2">{fee.amount}</td>
                  <td className="px-4 py-2">{fee.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No fee structures found.</p>
        )}
      </div>
    </div>
  );
};

export default FeeStructure;
