import React from "react";

const Report = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Report</h2>
      <div className="flex items-center justify-around">
        <div className="w-1/2">
  
          <div className="relative">
            <svg className="w-24 h-24">
              <circle
                className="text-gray-300"
                strokeWidth="10"
                fill="transparent"
                r="35"
                cx="50%"
                cy="50%"
              ></circle>
              <circle
                className="text-blue-500"
                strokeWidth="10"
                fill="transparent"
                r="35"
                cx="50%"
                cy="50%"
              ></circle>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-bold">14 Hrs</span>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="block h-4 w-4 bg-yellow-500"></span>{" "}
            <span>Branding - 7 hrs</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="block h-4 w-4 bg-blue-500"></span>{" "}
            <span>Office - 3 hrs</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="block h-4 w-4 bg-green-500"></span>{" "}
            <span>Transport - 4 hrs</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
