import React from "react";

const Integration = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Integration</h2>
      <div className="flex items-center space-x-4">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2111/2111615.png"
          alt="Slack logo"
          className="w-12 h-12"
        />
        <div>
          <p className="text-sm text-gray-500">
            Integration involves identifying which components to integrate and
            how to get a reference.
          </p>
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg">
            Connected
          </button>
        </div>
      </div>
    </div>
  );
};

export default Integration;
