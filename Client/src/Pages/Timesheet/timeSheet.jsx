import React, { useState } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf"; // Import jsPDF for report generation
import img from "../../assets/profile.jpg"

const TimeAndAttendance = () => {
  const [activeTab, setActiveTab] = useState("Timesheet");
  const [selectedDays, setSelectedDays] = useState([]);

  // Function to handle day selection
  const toggleDaySelection = (day) => {
    setSelectedDays((prevSelected) =>
      prevSelected.includes(day)
        ? prevSelected.filter((d) => d !== day)
        : [...prevSelected, day]
    );
  };

  // Function to create and download PDF report
  const createPDFReport = () => {
    const doc = new jsPDF();
    doc.text("Timesheet Report", 10, 10); // Title of the PDF
    doc.text("Employee: Berlin", 10, 20);
    doc.text("Total Hours: 264 Hours", 10, 30);
    doc.text("Regular: 172 Hours", 10, 40);
    doc.text("Overtime: 24 Hours", 10, 50);
    doc.text("Sick Leave: 48 Hours", 10, 60);
    doc.save("timesheet-report.pdf"); // Download the PDF
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <header className="text-3xl font-semibold text-gray-900 mb-4">
        Time & Attendance
      </header>

      <div className="flex space-x-4 mb-6">
        <button
          className={`border-b-4 pb-2 font-semibold ${
            activeTab === "Timesheet"
              ? "border-yellow-500 text-yellow-500"
              : "border-transparent text-gray-500"
          }`}
          onClick={() => setActiveTab("Timesheet")}
        >
          Timesheet
        </button>
        <button
          className={`border-b-4 pb-2 font-semibold ${
            activeTab === "TimeOffRequest"
              ? "border-yellow-500 text-yellow-500"
              : "border-transparent text-gray-500"
          }`}
          onClick={() => setActiveTab("TimeOffRequest")}
        >
          Time-off request
        </button>
        <button
          className={`border-b-4 pb-2 font-semibold ${
            activeTab === "TimeOffPolicy"
              ? "border-yellow-500 text-yellow-500"
              : "border-transparent text-gray-500"
          }`}
          onClick={() => setActiveTab("TimeOffPolicy")}
        >
          Time-off policy
        </button>
      </div>

      {activeTab === "Timesheet" && (
        <div>
          {/* Timesheet Content */}
          <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md mb-6">
            <div className="text-gray-700 font-semibold">
              Time period: 1st Jun - 31st Jul 2022
            </div>
            <div className="flex items-center space-x-4">
              {/* Create Report Button */}
              <button
                className="text-gray-500 border rounded-md px-4 py-2"
                onClick={createPDFReport}
              >
                Create Report
              </button>
              <button className="text-gray-500 border rounded-md px-4 py-2">
                Settings
              </button>
            </div>
          </div>

          {/* Calendar Section */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <div className="text-gray-700 font-semibold mb-2">
              Start of pay: 1st Jun
            </div>
            <div className="flex items-center space-x-1">
              {Array.from({ length: 31 }).map((_, index) => {
                const day = index + 1;
                const isSelected = selectedDays.includes(day);
                return (
                  <div
                    key={day}
                    onClick={() => toggleDaySelection(day)}
                    className={`h-10 w-10 text-center cursor-pointer ${
                      isSelected
                        ? "bg-blue-400"
                        : index < 21
                        ? "bg-green-400"
                        : "bg-gray-200"
                    } flex items-center justify-center rounded-md hover:bg-blue-200`}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mb-4">
            <button className="bg-gray-200 px-4 py-2 rounded-md text-gray-600">
              Remind Approvers
            </button>
            <button className="bg-yellow-500 text-white px-4 py-2 rounded-md">
              Send to Payroll
            </button>
          </div>

          {/* Employee Table */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <table className="w-full table-auto">
              <thead className="bg-gray-200">
                <tr className="text-left">
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Type</th>
                  <th className="px-4 py-2">Regular</th>
                  <th className="px-4 py-2">Overtime</th>
                  <th className="px-4 py-2">Sick Leave</th>
                  <th className="px-4 py-2">PTO</th>
                  <th className="px-4 py-2">Paid Holiday</th>
                  <th className="px-4 py-2">Total Hours</th>
                </tr>
              </thead>
              <tbody>
                {/* Example Row */}
                <tr className="text-gray-700">
                  <td className="px-4 py-2 flex items-center">
                    <img
                      src={img}
                      alt="Profile"
                      className="h-8 w-8 rounded-full mr-2"
                    />
                    <Link
                      to={`/timesheet/:details`} // Navigate to specific user's page
                      className="text-blue-500 hover:underline"
                    >
                      Berlin
                    </Link>
                  </td>
                  <td className="px-4 py-2">Fulltime</td>
                  <td className="px-4 py-2">172 Hours</td>
                  <td className="px-4 py-2">24 Hours</td>
                  <td className="px-4 py-2">48 Hours</td>
                  <td className="px-4 py-2">-</td>
                  <td className="px-4 py-2">20 Hours</td>
                  <td className="px-4 py-2">264 Hours</td>
                </tr>
                {/* Add more rows here */}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "TimeOffRequest" && (
        <div>
          {/* Time-off request content */}
          <h2 className="text-lg font-semibold">
            Time-off request content goes here...
          </h2>
        </div>
      )}

      {activeTab === "TimeOffPolicy" && (
        <div>
          {/* Time-off policy content */}
          <h2 className="text-lg font-semibold">
            Time-off policy content goes here...
          </h2>
        </div>
      )}
    </div>
  );
};

export default TimeAndAttendance;
