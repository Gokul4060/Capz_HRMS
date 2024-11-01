import React, { useState } from "react";
import { FaColumns, FaListUl, FaCalendarAlt } from "react-icons/fa";
import Kanban from "../demo/kanban"; 
import List from "../demo/listView"; 
import Calendar from "../demo/calenderView"; 

const Header = () => {
  const [activeTab, setActiveTab] = useState("kanban");

  return (
    <div>
      {/* Header Section */}
      <div className="flex justify-between items-center p-4 bg-white shadow-md">
        <div>
          <h1 className="text-2xl font-bold">HR Tasks🧑‍💼</h1>
          <p className="text-gray-500">Welcome to the Hr Tasks</p>
        </div>

        {/* Middle: Tab Icons */}
        <div className="flex space-x-4">
          <button
            className={`flex items-center px-4 py-2 rounded-lg shadow-sm hover:bg-gray-200 transition duration-300 ${
              activeTab === "kanban" ? "bg-gray-300" : "bg-gray-100"
            }`}
            onClick={() => setActiveTab("kanban")}
          >
            <FaColumns className="h-5 w-5 text-blue-600 mr-2" />
            Kanban
          </button>
          <button
            className={`flex items-center px-4 py-2 rounded-lg shadow-sm hover:bg-gray-200 transition duration-300 ${
              activeTab === "list" ? "bg-gray-300" : "bg-gray-100"
            }`}
            onClick={() => setActiveTab("list")}
          >
            <FaListUl className="h-5 w-5 text-green-600 mr-2" />
            List
          </button>
          <button
            className={`flex items-center px-4 py-2 rounded-lg shadow-sm hover:bg-gray-200 transition duration-300 ${
              activeTab === "calendar" ? "bg-gray-300" : "bg-gray-100"
            }`}
            onClick={() => setActiveTab("calendar")}
          >
            <FaCalendarAlt className="h-5 w-5 text-purple-600 mr-2" />
            Calendar
          </button>
        </div>

        {/* Right Side: Search Bar */}
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search here"
            className="border rounded-lg px-4 py-2 text-gray-700 focus:ring focus:ring-blue-200"
          />
        </div>
      </div>

      {/* Body Section */}
      <div className="p-4">
        {activeTab === "kanban" && <Kanban />}
        {activeTab === "list" && <List />}
        {activeTab === "calendar" && <Calendar />}
      </div>
    </div>
  );
};

export default Header;
