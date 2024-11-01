import React, { useState } from "react";
import { FaEllipsisH } from "react-icons/fa"; // Importing FontAwesome icons
import TaskDetails from "../demo/taskDetails"; // Importing the TaskDetails component

const TaskCard = () => {
  const [isOpen, setIsOpen] = useState(false); // State for controlling dropdown visibility
  const [showTaskDetails, setShowTaskDetails] = useState(false); // State for controlling Task Details page visibility

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Function to open task details
  const openTaskDetails = () => {
    setShowTaskDetails(true);
    setIsOpen(false); // Close dropdown
  };

  // Function to close task details
  const closeTaskDetails = () => {
    setShowTaskDetails(false);
  };

  return (
    <div>
      {/* Task Card */}
      <div className="bg-white rounded-lg p-4 shadow mb-4 relative">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500">May 26, 2024</p>
            <h3 className="font-bold text-lg">
              Review and Update Job Descriptions
            </h3>
            <p className="text-sm text-gray-600">
              Analyze current job descriptions and revise accordingly
            </p>
          </div>

          {/* Three-dot icon to toggle the dropdown */}
          <div className="relative">
            <FaEllipsisH
              className="text-red-500 cursor-pointer"
              onClick={toggleDropdown} // Toggle dropdown on click
            />
            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                <ul>
                  <li
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    onClick={openTaskDetails} // Open task details on click
                  >
                    Open
                  </li>
                  <li
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    onClick={() => alert("Duplicate task")}
                  >
                    Duplicate
                  </li>
                  <li
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    onClick={() => alert("Edit task")}
                  >
                    Edit
                  </li>
                  <li
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    onClick={() => alert("Delete task")}
                  >
                    Delete
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center mt-2">
          <span className="bg-green-100 text-green-500 text-xs px-2 py-1 rounded">
            Checklist
          </span>
          <div className="flex-1 mx-2 bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{ width: "75%" }}
            ></div>
          </div>
          <span className="text-sm text-gray-500">3/4</span>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="flex space-x-2">
            <span className="text-gray-500">
              <i className="fas fa-comment"></i> 2
            </span>
            <span className="text-gray-500">
              <i className="fas fa-file-alt"></i> 8
            </span>
          </div>
          <div className="flex -space-x-2">
            <img
              src="avatar1.jpg"
              alt="user1"
              className="w-8 h-8 rounded-full border-2 border-white"
            />
            <img
              src="avatar2.jpg"
              alt="user2"
              className="w-8 h-8 rounded-full border-2 border-white"
            />
          </div>
        </div>
      </div>

      {/* Task Details Full Page View */}
      {showTaskDetails && <TaskDetails closeTaskDetails={closeTaskDetails} />}
    </div>
  );
};

export default TaskCard;
