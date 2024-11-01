import React from "react";
import { useSelector } from "react-redux";

function Heirarchy_Info() {
      const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <div className="border shadow-lg rounded-lg p-5 relative bg-white">
        <p className="font-semibold text-lg md:text-base">
          Hierarchy Information
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-y-3">
          <div>
            <p className="text-gray-400">
              Reporting Manager:{" "}
              {(user?.reportingManager || "Not assigned")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Heirarchy_Info;
