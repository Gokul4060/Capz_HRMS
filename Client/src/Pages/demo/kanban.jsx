import React, { useState } from "react";
import { FaPlusCircle, FaCheckCircle } from "react-icons/fa";
import Task1 from "../../Pages/demo/taskCards";

const Kanban = () => {
  const [isAdding, setIsAdding] = useState({
    todo: false,
    onProgress: false,
    needReview: false,
    done: false,
  }); // Track form state for each section

  const handleAddClick = (section) => {
    setIsAdding((prevState) => ({
      ...prevState,
      [section]: !prevState[section], // Toggle form visibility for each section
    }));
  };

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {/* To-do Section */}
      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FaPlusCircle
              className="text-green-500 cursor-pointer"
              onClick={() => handleAddClick("todo")} // Toggle form
            />
            <h2 className="text-lg font-semibold">
              To-do <span className="text-red-500">(8)</span>
            </h2>
          </div>
          <FaCheckCircle className="text-green-500" />
        </div>

        {/* Existing Tasks */}
        <div className="space-y-4">
          <Task1 />
          <Task1 />
          <Task1 />
        </div>

        {/* Add Task Form */}
        {isAdding.todo && (
          <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-lg">
            <h3 className="font-semibold mb-2">Add New Task</h3>
            <form>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Task title"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Task description"
                />
              </div>
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
              >
                Add Task
              </button>
            </form>
          </div>
        )}
      </div>

      {/* On Progress Section */}
      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FaPlusCircle
              className="text-purple-500 cursor-pointer"
              onClick={() => handleAddClick("onProgress")}
            />
            <h2 className="text-lg font-semibold">
              On Progress <span className="text-purple-500">(2)</span>
            </h2>
          </div>
          <FaCheckCircle className="text-green-500" />
        </div>

        {/* Existing Tasks */}
        <div className="space-y-4">
          <Task1 />
          <Task1 />
        </div>

        {/* Add Task Form */}
        {isAdding.onProgress && (
          <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-lg">
            <h3 className="font-semibold mb-2">Add New Task</h3>
            <form>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Task title"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Task description"
                />
              </div>
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
              >
                Add Task
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Need Review Section */}
      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FaPlusCircle
              className="text-yellow-500 cursor-pointer"
              onClick={() => handleAddClick("needReview")}
            />
            <h2 className="text-lg font-semibold">
              Need Review <span className="text-yellow-500">(3)</span>
            </h2>
          </div>
          <FaCheckCircle className="text-green-500" />
        </div>

        {/* Existing Tasks */}
        <div className="space-y-4">
          <Task1 />
          <Task1 />
          <Task1 />
        </div>

        {/* Add Task Form */}
        {isAdding.needReview && (
          <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-lg">
            <h3 className="font-semibold mb-2">Add New Task</h3>
            <form>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Task title"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Task description"
                />
              </div>
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
              >
                Add Task
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Done Section */}
      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FaPlusCircle
              className="text-green-500 cursor-pointer"
              onClick={() => handleAddClick("done")}
            />
            <h2 className="text-lg font-semibold">Done</h2>
          </div>
          <FaCheckCircle className="text-green-500" />
        </div>

        {/* Existing Tasks */}
        <div className="space-y-4">
          <Task1 />
          <Task1 />
        </div>

        {/* Add Task Form */}
        {isAdding.done && (
          <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-lg">
            <h3 className="font-semibold mb-2">Add New Task</h3>
            <form>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Task title"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Task description"
                />
              </div>
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
              >
                Add Task
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Kanban;
