import React, { useState } from "react";
import CreateUser from "./Adduser/allEmployees";
import AdminAttendance from "./adminAttendance";
import Allleaves from "../Leave/Admin/allLeaves"

function UserManagement() {
  const [activeTab, setActiveTab] = useState("Attendance");

  return (
    <div className="flex flex-col h-screen">
      <div className="p-1 bg-gray-100  shadow">
        <div className="border-b-2 ">
          <button
            className={`tab inline-block p-4 text-sm font-medium leading-5 text-center text-gray-700 rounded-lg focus:outline-none hover:text-blue-700 hover:bg-gray-50 focus:z-10 ${
              activeTab === "Attendance"
                ? "tab-active text-blue-600 border-blue-600"
                : "border-transparent"
            }`}
            onClick={() => setActiveTab("Attendance")}
          >
            Attendance
          </button>
          <button
            className={`tab inline-block p-4 text-sm font-medium leading-5 text-center text-gray-700 rounded-lg focus:outline-none hover:text-blue-700 hover:bg-gray-50 focus:z-10 ${
              activeTab === "Leave"
                ? "tab-active text-blue-600 border-blue-600"
                : "border-transparent"
            }`}
            onClick={() => setActiveTab("Leave")}
          >
            Leave
          </button>
          <button
            className={`tab inline-block p-4 text-sm font-medium leading-5 text-center text-gray-700 rounded-lg focus:outline-none hover:text-blue-700 hover:bg-gray-50 focus:z-10 ${
              activeTab === "CreateEmployee"
                ? "tab-active text-blue-600 border-blue-600"
                : "border-transparent"
            }`}
            onClick={() => setActiveTab("CreateEmployee")}
          >
            Create Employee
          </button>
        </div>
      </div>

      <div className="flex-grow bg-white p-2 shadow-inner  overflow-auto">
        {activeTab === "Attendance" && <Attendance />}
        {activeTab === "Leave" && <Leave />}
        {activeTab === "CreateEmployee" && <CreateEmployee />}
      </div>
    </div>
  );
}

function Attendance() {
  return (
    <div className="h-full overflow-y-auto">
      {" "}
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

export default UserManagement;
