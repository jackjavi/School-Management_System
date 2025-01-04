import React, { useContext } from "react";
import { FiEdit, FiTrash2, FiDollarSign } from "react-icons/fi";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import AsideBar from "./AsideBar";
import { UsersContext } from "../context/UsersContextWrapper";

const AdminUsersTable = () => {
  const {
    users,
    isLoading,
    error,
    setFilters,
    page,
    totalPages,
    handlePrevPage,
    handleNextPage,
    fetchUsers,
    handleEditRole,
    handleDelete,
  } = useContext(UsersContext);

  return (
    <div className="bg-indigo-50 min-h-screen overflow-x-hidden md:pt-36 pt-16">
      <div className="max-w-7xl mx-auto flex">
        <AsideBar />

        <div className="bg-gray-50 flex-1 p-4 rounded-xl md:h-[75vh] h-screen overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 py-2">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
              <div className="space-x-4 flex items-center">
                {" "}
                <div>
                  <Link to="/signup">
                    <h1 className="text-2xl font-bold text-indigo-800 underline">
                      Create User
                    </h1>
                  </Link>
                </div>
                <div>
                  <Link to="/admin/fees-structure">
                    <h1 className="text-2xl font-bold text-indigo-800 underline">
                      Manage Fee Structures
                    </h1>
                  </Link>
                </div>
              </div>

              <button
                onClick={fetchUsers}
                className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300"
              >
                <FiEdit className="text-lg" />
                <span>Refresh</span>
              </button>
            </div>

            {/* Filters */}
            <div className=" space-x-4 mb-4 flex ">
              <div className="flex justify-between">
                <div>
                  <input
                    type="text"
                    placeholder="Filter by name"
                    className="border p-2 rounded-md"
                    onChange={(e) =>
                      setFilters((prev) => ({ ...prev, name: e.target.value }))
                    }
                  />
                  <input
                    type="text"
                    placeholder="Filter by email"
                    className="border p-2 rounded-md"
                    onChange={(e) =>
                      setFilters((prev) => ({ ...prev, email: e.target.value }))
                    }
                  />
                  <select
                    className="border p-2 rounded-md"
                    onChange={(e) =>
                      setFilters((prev) => ({ ...prev, role: e.target.value }))
                    }
                  >
                    <option value="">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                  </select>
                </div>
                <div>
                  <select
                    className="border p-2 rounded-md"
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        sortBy: e.target.value,
                      }))
                    }
                  >
                    <option value="id">Sort by ID</option>
                    <option value="name">Sort by Name</option>
                    <option value="email">Sort by Email</option>
                    <option value="createdAt">Sort by Joined Date</option>
                  </select>
                  <select
                    className="border p-2 rounded-md"
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        sortOrder: e.target.value,
                      }))
                    }
                  >
                    <option value="ASC">Ascending</option>
                    <option value="DESC">Descending</option>
                  </select>{" "}
                  <button
                    onClick={fetchUsers}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>

            {/* Table */}
            {isLoading ? (
              <div className="text-center py-10 text-gray-600">Loading...</div>
            ) : error ? (
              <div className="text-center py-10 text-red-600">{error}</div>
            ) : (
              <>
                <div className="overflow-x-auto bg-white rounded-lg shadow-lg hidden md:block">
                  <table className="table-auto w-full text-left">
                    <thead className="bg-indigo-100">
                      <tr>
                        <th className="px-4 py-2 text-indigo-800">Name</th>
                        <th className="px-4 py-2 text-indigo-800">
                          Admission No.
                        </th>
                        <th className="px-4 py-2 text-indigo-800">
                          Fee Balance
                        </th>
                        <th className="px-4 py-2 text-indigo-800">Role</th>
                        <th className="px-4 py-2 text-indigo-800">Joined</th>
                        <th className="px-4 py-2 text-indigo-800">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, index) => (
                        <tr
                          key={user.id}
                          className={`${
                            index % 2 === 0 ? "bg-gray-50" : "bg-white"
                          } hover:bg-indigo-50 transition-colors duration-200`}
                        >
                          <td className="px-4 py-2">{user.name}</td>
                          <td className="px-4 py-2">{user.admissionNumber}</td>
                          {user.role.name === "student" ? (
                            <td className="px-4 py-2">{user.feeBalance}</td>
                          ) : (
                            <td className="px-4 py-2">{user.role.name}</td>
                          )}
                          <td className="px-4 py-2 capitalize">
                            {user.role.name}
                          </td>
                          <td className="px-4 py-2">
                            {dayjs(user.createdAt).format("YYYY-MM-DD")}
                          </td>
                          <td className="px-4 py-2 flex space-x-2">
                            <button
                              onClick={() => handleEditRole(user.id)}
                              className="text-indigo-600 hover:text-indigo-800 transition duration-300"
                            >
                              <FiEdit />
                            </button>
                            <button
                              onClick={() => handleDelete(user.id)}
                              className="text-red-600 hover:text-red-800 transition duration-300"
                            >
                              <FiTrash2 />
                            </button>
                            {user.role.name === "student" && (
                              <Link to={`/admin/fees/${user.id}`}>
                                <button
                                  className="text-green-600 hover:text-green-800 transition duration-300 flex items-center justify-center"
                                  title="Manage Fees"
                                >
                                  <FiDollarSign />
                                </button>
                              </Link>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Responsive card view for small screens */}
                <div className="md:hidden space-y-4">
                  {users.map((user) => (
                    <div
                      key={user.id}
                      className="bg-white p-4 rounded-lg shadow-md flex flex-col space-y-2"
                    >
                      <div className="flex justify-between">
                        <span className="font-bold text-indigo-800">Name:</span>
                        <span>{user.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-bold text-indigo-800">
                          Admission Number:
                        </span>
                        <span>{user.admissionNumber}</span>
                      </div>
                      {user.role.name === "student" ? (
                        <div className="flex justify-between">
                          <span className="font-bold text-indigo-800">
                            Fee Balance:
                          </span>
                          <span>{user.feeBalance}</span>
                        </div>
                      ) : (
                        <div className="flex justify-between">
                          <span className="font-bold text-indigo-800">
                            Fee Balance:
                          </span>
                          <span>{user.role.name}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="font-bold text-indigo-800">Role:</span>
                        <span className="capitalize">{user.role.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-bold text-indigo-800">
                          Joined:
                        </span>
                        <span>
                          {dayjs(user.createdAt).format("YYYY-MM-DD")}
                        </span>
                      </div>
                      <div className="flex space-x-4">
                        <button
                          onClick={() => handleEditRole(user.id)}
                          className="text-indigo-600 hover:text-indigo-800 transition duration-300"
                        >
                          <FiEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="text-red-600 hover:text-red-800 transition duration-300"
                        >
                          <FiTrash2 />
                        </button>
                        {user.role.name === "student" && (
                          <Link to={`/admin/fees/${user.id}`}>
                            <button
                              className="text-green-600 hover:text-green-800 transition duration-300 flex items-center justify-center"
                              title="Manage Fees"
                            >
                              <FiDollarSign />
                            </button>
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-4">
                  <button
                    disabled={page === 1}
                    onClick={handlePrevPage}
                    className={`px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300 ${
                      page === 1 && "opacity-50 cursor-not-allowed"
                    }`}
                  >
                    Previous Page
                  </button>
                  <span className="text-gray-600">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    disabled={page === totalPages}
                    onClick={handleNextPage}
                    className={`px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300 ${
                      page === totalPages && "opacity-50 cursor-not-allowed"
                    }`}
                  >
                    Next Page
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUsersTable;
