import React, { useState } from "react";

const TimesheetPage = () => {
  const [showDropdown, setShowDropdown] = useState(null);

  const toggleDropdown = (id) => {
    if (showDropdown === id) {
      setShowDropdown(null);
    } else {
      setShowDropdown(id);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Timesheets</h1>
        <div className="flex space-x-4">
          <button className="bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-300">
            Filter Timesheet
          </button>
          <button className="bg-gray-100 text-gray-800 px-5 py-2 rounded-lg shadow border hover:bg-gray-200 transition duration-300">
            Export to Excel
          </button>
        </div>
      </div>

    
      <div className="flex space-x-4 mb-8">
        <button className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg shadow-sm hover:bg-gray-300 transition duration-300">
          Nov 28 - Dec 2
        </button>
        <button className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg shadow-sm hover:bg-gray-300 transition duration-300">
          Dec 5 - Dec 9
        </button>
        <button className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
          Dec 12 - Dec 16
        </button>
        <button className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg shadow-sm hover:bg-gray-300 transition duration-300">
          Dec 19 - Dec 23
        </button>
      </div>

      {/* Today's Timesheet */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-medium text-gray-700">Today</span>
          <span className="text-red-500 font-bold">Total Hours: 8:15</span>
        </div>
        <div className="grid grid-cols-5 gap-4 text-center text-sm text-gray-600 font-medium">
          <div>In</div>
          <div>Out</div>
          <div>Timesheet hrs</div>
          <div>Information</div>
          <div>Status</div>
        </div>
        <div className="grid grid-cols-5 gap-4 text-center text-lg font-semibold mt-4">
          <div className="text-gray-800">10:56</div>
          <div className="text-gray-800">19:36</div>
          <div className="text-gray-800">08:06</div>
          <div className="text-gray-500">-</div>
          <div className="text-green-500 flex justify-end items-center">
            Present
            
            <div className="relative">
              <button
                onClick={() => toggleDropdown(1)}
                className="ml-2 p-2 rounded-full hover:bg-gray-200 transition duration-200"
              >
                <svg
                  className="h-6 w-6 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 12h12M12 6v12"
                  />
                </svg>
              </button>

        
              {showDropdown === 1 && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10">
                  <ul>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => console.log("Edit clicked")}
                    >
                      Edit
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => console.log("Delete clicked")}
                    >
                      Delete
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="mb-6">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="col-span-2">
              <span className="font-semibold text-gray-800 text-lg">
                AB-920 Project Name
              </span>
              <p className="text-gray-500 text-sm">UI Designing</p>
            </div>
            <div className="text-right">
              <span className="text-lg font-semibold text-gray-800">5:00</span>
            </div>
          </div>
          <div className="col-span-3 flex justify-between items-center">
            <p className="text-gray-600">
              Worked on ticket updates for AB-1123, AB-2999
            </p>
        
            <div className="relative">
              <button
                onClick={() => toggleDropdown(2)}
                className="ml-2 p-2 rounded-full hover:bg-gray-200 transition duration-200"
              >
                <svg
                  className="h-6 w-6 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 12h12M12 6v12"
                  />
                </svg>
              </button>

    
              {showDropdown === 2 && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10">
                  <ul>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => console.log("Edit clicked")}
                    >
                      Edit
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => console.log("Delete clicked")}
                    >
                      Delete
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="col-span-2">
              <span className="font-semibold text-gray-800 text-lg">
                NV-2090 Project Name 2
              </span>
              <p className="text-gray-500 text-sm">As per work description</p>
            </div>
            <div className="text-right">
              <span className="text-lg font-semibold text-gray-800">3:00</span>
            </div>
          </div>
          <div className="col-span-3 flex justify-between items-center">
            <p className="text-gray-600">Attendance design</p>
            {/* Dropdown button */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown(3)}
                className="ml-2 p-2 rounded-full hover:bg-gray-200 transition duration-200"
              >
                <svg
                  className="h-6 w-6 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 12h12M12 6v12"
                  />
                </svg>
              </button>

    
              {showDropdown === 3 && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10">
                  <ul>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => console.log("Edit clicked")}
                    >
                      Edit
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => console.log("Delete clicked")}
                    >
                      Delete
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        
        <div className="flex space-x-4 items-center">
          <select className="border px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Project</option>
            <option>AB-920 Project Name</option>
            <option>NV-2090 Project Name 2</option>
          </select>
          <select className="border px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Task</option>
            <option>UI Designing</option>
            <option>Backend Development</option>
          </select>
          <input
            type="time"
            className="border px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Work Description"
            className="border px-4 py-2 rounded-md shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-green-600 text-white px-5 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
            Add
          </button>
        </div>
      </div>


      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-800 text-lg">16-Dec-2022</span>
          <span className="text-red-500 font-bold">Total Hours: 8:15</span>
        </div>
        <div className="grid grid-cols-4 gap-4 text-center text-sm text-gray-600 font-medium">
          <div>In</div>
          <div>Out</div>
          <div>Timesheet hrs</div>
          <div>Status</div>
        </div>
        <div className="grid grid-cols-4 gap-4 text-center text-lg font-semibold mt-4">
          <div className="text-gray-800">10:56</div>
          <div className="text-gray-800">19:36</div>
          <div className="text-gray-800">08:06</div>
          <div className="text-green-500">Present</div>
        </div>
      </div>
    </div>
  );
};

export default TimesheetPage;
