import React from "react";

const TimeChart = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Time Spend on Projects</h2>
      <div className="h-48">
        {/* Placeholder for a real chart (you can use Chart.js or any other library) */}
        <div className="flex items-end space-x-4 h-full">
          <div className="bg-gray-400 h-24 w-8"></div>
          <div className="bg-gray-600 h-32 w-8"></div>
          <div className="bg-yellow-300 h-20 w-8"></div>
          <div className="bg-pink-400 h-36 w-8"></div>
          <div className="bg-gray-800 h-40 w-8"></div>
        </div>
      </div>
    </div>
  );
};

export default TimeChart;
