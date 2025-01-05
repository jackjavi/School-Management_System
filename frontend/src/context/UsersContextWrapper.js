import { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

export const UsersContext = createContext();

function UsersContextWrapper({ children }) {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [roleDistribution, setRoleDistribution] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    role: "",
    limit: 7,
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setUsers([]);
        setIsLoading(false);
        setError("Not authorized");
        return;
      }
      const query = new URLSearchParams({ ...filters, page }).toString();
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/details?${query}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTotalUsers(response.data.total);
      setUsers(response.data.users);
      setRoleDistribution(response.data.roleDistribution);
      setTotalPages(response.data.totalPages || 1);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to fetch users");
    } finally {
      setIsLoading(false);
    }
  }, [filters, page]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  function handlePrevPage() {
    if (page > 1) setPage(page - 1);
  }

  function handleNextPage() {
    if (page < totalPages) setPage(page + 1);
  }

  async function handleEditRole(userId) {
    const newRoleInput = prompt("Enter new role (admin/user/student/teacher):");
    let newRole = null;
    if (newRoleInput !== null) {
      newRole = newRoleInput.trim().toLowerCase();
    }

    if (!["admin", "user", "student", "teacher"].includes(newRole)) {
      alert(
        "Invalid role. Please enter 'admin', 'user', 'student', or 'teacher'."
      );
      return;
    }

    const token = localStorage.getItem("authToken");
    await axios
      .put(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/edit-role`,
        { userId, roleName: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        alert("Role updated successfully.");
        fetchUsers();
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to update role. Please try again.");
      });

    let feeCategory = null;
    if (newRole === "student") {
      feeCategory = prompt(
        "Enter fee category (ECDE/Junior Primary/Senior Secondary):"
      );
      if (
        !["ECDE", "Junior Primary", "Senior Secondary"].includes(feeCategory)
      ) {
        alert(
          "Invalid fee category. Please enter 'ECDE', 'Junior Primary', or 'Senior Secondary'."
        );
        return;
      }

      const token = localStorage.getItem("authToken");
      await axios
        .put(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/members/profile-edit`,
          { userId, roleName: newRole, feeCategory },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(() => {
          alert("Role and fee category updated successfully.");
          fetchUsers();
        })
        .catch((err) => {
          console.error(err);
          alert("Failed to update role. Please try again.");
        });

      // Ask admin if the fee structure exists for the selected category
      const confirmFeeStructure = window.confirm(
        `Have you already saved the fee structure for the category "${feeCategory}" for this term? click cancel if not.`
      );

      if (confirmFeeStructure) {
        const feeAmountInput = prompt(
          `Enter the amount of fees for the current term for the category "${feeCategory}":`
        );

        // Validate the fee amount
        const feeAmount = parseFloat(feeAmountInput);
        if (isNaN(feeAmount) || feeAmount <= 0) {
          alert("Invalid fee amount. Please enter a positive number.");
          return;
        }

        // Update the student's fee balance
        await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/members/profile-edit`,
          { userId, feeBalance: feeAmount },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        alert("Fee balance updated successfully.");
      }
    }
  }

  async function handleDelete(userId) {
    const token = localStorage.getItem("authToken");
    if (window.confirm("Are you sure you want to delete this user?")) {
      await axios
        .delete(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/delete/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then(() => fetchUsers())
        .catch((err) => {
          console.error(err);
          alert("Failed to delete user. Please try again.");
        });
    }
  }

  const contextValues = {
    users,
    isLoading,
    error,
    filters,
    setFilters,
    page,
    totalPages,
    totalUsers,
    roleDistribution,
    handlePrevPage,
    handleNextPage,
    fetchUsers,
    handleEditRole,
    handleDelete,
  };

  return (
    <UsersContext.Provider value={contextValues}>
      {children}
    </UsersContext.Provider>
  );
}

export default UsersContextWrapper;
