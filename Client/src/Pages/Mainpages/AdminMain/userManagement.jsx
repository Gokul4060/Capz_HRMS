import React, { useState, useEffect } from "react";
import CreateUser from "./Adduser/allEmployees";
import AdminAttendance from "./adminAttendance";
import Allleaves from "../Leave/Admin/allLeaves";
import Details from "../AdminMain/Adduser/employeeDetails";

function UserManagement() {
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("activeTab") || "Attendance"
  );

  // Update localStorage whenever the active tab changes
  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  return (
    <div className="flex flex-col h-screen">
      <div className="p-1 bg-gray-100 shadow">
        <div className="border-b-2 flex">
          <button
            className={`tab inline-block p-4 text-sm font-medium leading-5 text-center rounded-lg focus:outline-none focus:z-10 mr-2 ${
              activeTab === "Attendance"
                ? "bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white border-b-4 border-green-600"
                : "text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-green-400 hover:via-green-500 hover:to-green-600 hover:border-b-4 hover:border-green-600"
            }`}
            onClick={() => setActiveTab("Attendance")}
          >
            Attendance
          </button>
          <button
            className={`tab inline-block p-4 text-sm font-medium leading-5 text-center rounded-lg focus:outline-none focus:z-10 mr-2 ${
              activeTab === "Leave"
                ? "bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white border-b-4 border-green-600"
                : "text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-green-400 hover:via-green-500 hover:to-green-600 hover:border-b-4 hover:border-green-600"
            }`}
            onClick={() => setActiveTab("Leave")}
          >
            Leave Records
          </button>
          <button
            className={`tab inline-block p-4 text-sm font-medium leading-5 text-center rounded-lg focus:outline-none focus:z-10 mr-2 ${
              activeTab === "CreateEmployee"
                ? "bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white border-b-4 border-green-600"
                : "text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-green-400 hover:via-green-500 hover:to-green-600 hover:border-b-4 hover:border-green-600"
            }`}
            onClick={() => setActiveTab("CreateEmployee")}
          >
            Create Employee
          </button>
          <button
            className={`tab inline-block p-4 text-sm font-medium leading-5 text-center rounded-lg focus:outline-none focus:z-10 ${
              activeTab === "EmployeeDetails"
                ? "bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white border-b-4 border-green-600"
                : "text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-green-400 hover:via-green-500 hover:to-green-600 hover:border-b-4 hover:border-green-600"
            }`}
            onClick={() => setActiveTab("EmployeeDetails")}
          >
            Employee Details
          </button>
        </div>
      </div>

      <div className="flex-grow bg-white p-2 shadow-inner overflow-auto">
        {activeTab === "Attendance" && <Attendance />}
        {activeTab === "Leave" && <Leave />}
        {activeTab === "CreateEmployee" && <CreateEmployee />}
        {activeTab === "EmployeeDetails" && <Details />}
      </div>
    </div>
  );
}

function Attendance() {
  return (
    <div className="h-full overflow-y-auto">
      <AdminAttendance />
    </div>
  );
}

function Leave() {
  return (
    <div className="h-full overflow-y-auto">
      <Allleaves />
    </div>
  );
}

function CreateEmployee() {
  return (
    <div className="h-full overflow-y-auto">
      <CreateUser />
    </div>
  );
}

function EmployeeDetails() {
  return (
    <div className="h-full overflow-y-auto">
      <Details />
    </div>
  );
}

export default UserManagement;
