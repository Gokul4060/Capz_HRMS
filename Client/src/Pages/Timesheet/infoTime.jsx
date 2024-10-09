import React, { useState } from "react";
import { getInitials } from "../../utils/index";
import Calender from "./calenderview";

import {  useSelector } from "react-redux";

const TimeAndAttendanceDetails = () => {
   const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("Timecard"); // State to track the active tab

  return (
    <div className="p-6 bg-gray-50 min-h-screen grid grid-cols-12 gap-6">
      <aside className="col-span-3 bg-white rounded-lg shadow-md p-4">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 2xl:w-12 2xl:h-12 items-center justify-center rounded-full bg-gradient-to-r from-green-400 via-green-500 to-green-600">
            {user?.profile?.imageUrl ? (
              <img
                src={user.profile.imageUrl}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <span className="text-white font-semibold">
                {getInitials(user?.name)}
              </span>
            )}
          </div>

          <span className="text-sm text-green-500 font-semibold bg-green-100 px-3 py-1 rounded-full mb-2">
            Hourly
          </span>
          <h2 className="font-bold text-lg"> {user?.name}</h2>
          <p className="text-gray-500">{user?.role}</p>
        </div>
        <div className="mt-6">
          <h3 className="font-semibold text-lg text-gray-900">
            264.00 Total hours
          </h3>
          <ul className="mt-4 text-gray-700">
            <li className="flex justify-between mb-2">
              <span>Regular</span>
              <span>172 hrs</span>
            </li>
            <li className="flex justify-between mb-2">
              <span>Overtime</span>
              <span>24 hrs</span>
            </li>
            <li className="flex justify-between mb-2">
              <span>PTO</span>
              <span>0.00 hrs</span>
            </li>
            <li className="flex justify-between">
              <span>Holiday</span>
              <span>20 hrs</span>
            </li>
          </ul>
        </div>
      </aside>

      {/* Right Main Section */}
      <section className="col-span-9 bg-white rounded-lg shadow-md p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-sm text-gray-500">
              Time period: 1st Sep - 3rd Oct 2024
            </p>
            <h2 className="text-2xl font-bold">Hour breakdown 264.00 hrs</h2>
          </div>
          <div className="flex space-x-4">
            <button className="text-sm px-4 py-2 bg-yellow-500 text-white rounded-md">
              Add Time Off
            </button>
            <button className="text-sm px-4 py-2 bg-red-500 text-white rounded-md">
              Reject All
            </button>
            <button className="text-sm px-4 py-2 bg-green-500 text-white rounded-md">
              Approve All
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative h-2 rounded-full bg-gray-200 mb-6">
          <div
            className="absolute top-0 left-0 h-full bg-green-500"
            style={{ width: "50%" }}
          ></div>
          <div
            className="absolute top-0 left-1/2 h-full bg-red-500"
            style={{ width: "20%" }}
          ></div>
          <div
            className="absolute top-0 left-3/4 h-full bg-yellow-400"
            style={{ width: "5%" }}
          ></div>
        </div>

        {/* Tabs */}
        <div className="flex mb-4">
          <button
            className={`font-semibold px-4 py-2 ${
              activeTab === "Timecard"
                ? "text-yellow-500 border-b-4 border-yellow-500"
                : "text-gray-500 border-b-4 border-transparent"
            }`}
            onClick={() => setActiveTab("Timecard")} // Switch to "Timecard" tab
          >
            Timecard
          </button>
          <button
            className={`font-semibold px-4 py-2 ${
              activeTab === "Timeline"
                ? "text-yellow-500 border-b-4 border-yellow-500"
                : "text-gray-500 border-b-4 border-transparent"
            }`}
            onClick={() => setActiveTab("Timeline")} // Switch to "Timeline" tab
          >
            Timeline
          </button>
        </div>

        {/* Conditional Rendering Based on Active Tab */}
        {activeTab === "Timecard" && (
          <div>
            {/* Timecard Tab Content */}
            <table className="w-full table-auto">
              <thead className="bg-gray-200 text-left text-sm font-semibold">
                <tr>
                  <th className="p-2">Date</th>
                  <th className="p-2">Checkin</th>
                  <th className="p-2">Checkout</th>
                  <th className="p-2">Meal Break</th>
                  <th className="p-2">Work Hours</th>
                  <th className="p-2">Overtime</th>
                  <th className="p-2">Double</th>
                  <th className="p-2">Note</th>
                  <th className="p-2">Approval</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-700">
                {/* Example Row */}
                <tr>
                  <td className="p-2"> 3rd Oct 2024</td>
                  <td className="p-2">09:00 AM</td>
                  <td className="p-2">09:00 PM</td>
                  <td className="p-2">1:00 hrs</td>
                  <td className="p-2">8.00 hrs</td>
                  <td className="p-2">4.00 hrs</td>
                  <td className="p-2">N/A</td>
                  <td className="p-2">
                    <button className="text-yellow-500">Note</button>
                  </td>
                  <td className="p-2">
                    <div className="flex items-center space-x-2">
                      <button className="text-green-500">✓</button>
                      <button className="text-red-500">✕</button>
                      <button className="text-gray-500">✎</button>
                    </div>
                  </td>
                </tr>
                {/* Add more rows here */}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "Timeline" && (
          <div>
            {/* Timeline Tab Content */}

            <Calender />

            {/* You can add your Timeline content here */}
          </div>
        )}
      </section>
    </div>
  );
};

export default TimeAndAttendanceDetails;
