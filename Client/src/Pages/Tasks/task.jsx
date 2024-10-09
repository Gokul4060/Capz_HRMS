import React, { useState } from "react";

const Tasks = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCard = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Add Board Button */}
      <div className="flex justify-end p-4">
        <button
          className="bg-purple-600 text-white py-2 px-4 rounded-md flex items-center hover:bg-purple-700"
          onClick={toggleCard}
        >
          <span className="mr-2 text-lg font-bold">+</span> Add board
        </button>
      </div>

      {/* Main Content */}
      <div className="p-8">
        <h1 className="text-3xl font-semibold">Main Content Here</h1>
      </div>

      {/* Open Card */}
      {isOpen && (
        <div className="p-8">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add Project</h2>
              <button
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                onClick={toggleCard}
              >
                &times;
              </button>
            </div>

            <form className="space-y-4">
              {/* Project Name Input */}
              <div>
                <label className="block text-gray-700">Project Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-purple-600"
                  placeholder="Enter project name"
                />
              </div>

              {/* Status Selector */}
              <div>
                <label className="block text-gray-700">Status</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-purple-600">
                  <option>Select status</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                  <option>On Hold</option>
                </select>
              </div>

              {/* Assigned Date Input */}
              <div>
                <label className="block text-gray-700">Assigned Date</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-purple-600"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
