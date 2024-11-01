import React, { useState } from "react";
import { useGetEmployeeListQuery } from "../../../../redux/slices/api/userApiSlice";
import { FiMoreVertical } from "react-icons/fi";
import {  useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../../../../Components/Tools/Loader";
import { getInitials } from "../../../../utils/index";

const EmployeeDetails = () => {
  
  const { user } = useSelector((state) => state.auth);

  const {
    data: employees,
    isLoading,
    isError,
    error,
  } = useGetEmployeeListQuery();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <p className="text-red-500">Error: {error?.message}</p>;
  }

  return (
    <div className="p-6 space-y-8  min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-6">Employee Details</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {employees.map((employee) => (
          <EmployeeCard key={employee._id} employee={employee} user={user} />
        ))}
      </div>
    </div>
  );
};
const EmployeeCard = ({ employee }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleDialogToggle = () => {
    setIsDialogOpen((prev) => !prev);
  };

  return (
    <div className="relative bg-white shadow-2xl rounded-2xl p-6">
      <div className="absolute top-4 right-4">
        <button
          className="text-gray-500 hover:text-gray-700"
          onClick={handleDialogToggle}
        >
          <FiMoreVertical size={24} />
        </button>
      </div>

      <h3 className="text-lg font-semibold mb-4">{employee.name} </h3>
      <p className="mb-2">
        <strong>ID:</strong> {employee.employeeID || "N/A"}
      </p>

      <p className="mb-2">
        <strong>Email:</strong> {employee.email || "N/A"}
      </p>
      <p className="mb-2">
        <strong>Role:</strong> {employee.role || "N/A"}
      </p>

      <p
        className={`mb-2 ${
          employee.isActive ? "text-green-500" : "text-red-500"
        }`}
      >
        <strong>Status:</strong> {employee.isActive ? "Active" : "Inactive"}
      </p>

      {isDialogOpen && (
        <div className="absolute right-4 top-10 z-10 w-32 bg-white border border-gray-300 rounded-lg shadow-lg">
          <ul className="py-1">
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                handleDialogToggle();
                navigate(`/employee/${employee._id}`);
              }}
            >
              View
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                handleDialogToggle();
                window.location.href = `mailto:${employee.email}`;
              }}
            >
              Mail
            </li>
          </ul>
        </div>
      )}

      {/* Employee profile picture in the bottom-right with fallback */}
      <div className="absolute bottom-4 right-4 w-16 h-16 rounded-full bg-gradient-to-r from-green-400 via-green-500 to-green-600 flex items-center justify-center">
        {employee?.profile?.imageUrl ? (
          <img
            src={employee.profile.imageUrl}
            alt="Profile"
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <span className="text-white font-semibold">
            {getInitials(employee?.name)}
          </span>
        )}
      </div>
    </div>
  );
};



export default EmployeeDetails;
