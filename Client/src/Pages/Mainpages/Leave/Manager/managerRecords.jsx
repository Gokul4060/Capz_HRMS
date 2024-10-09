import React, { useState } from "react";
import LeaveRequest from "./mangerRequest";
//import ManagerAttendance from "./managerAttendance";
import Historyleave from "./history";


function ManagerRequests() {
  const [activeTab, setActiveTab] = useState("leave");

  return (
    <div className="flex flex-col h-screen">
      <div className="p-1 bg-gray-100 shadow">
        <div className="border-b-2">
          <button
            className={`tab inline-block p-4 text-sm font-medium leading-5 text-center text-gray-700 rounded-lg focus:outline-none hover:text-green-700 hover:bg-gray-50 focus:z-10 ${
              activeTab === "leave"
                ? "tab-active text-green-600 border-green-600"
                : "border-transparent"
            }`}
            onClick={() => setActiveTab("leave")}
          >
            Leave Requests
          </button>
          <button
            className={`tab inline-block p-4 text-sm font-medium leading-5 text-center text-gray-700 rounded-lg focus:outline-none hover:text-green-700 hover:bg-gray-50 focus:z-10 ${
              activeTab === "records"
                ? "tab-active text-green-600 border-green-600"
                : "border-transparent"
            }`}
            onClick={() => setActiveTab("records")}
          >
            Records
          </button>
        
        </div>
      </div>

      <div className="flex-grow bg-white p-2 shadow-inner overflow-auto">
        {activeTab === "leave" && <LeaveRequests />}
        {activeTab === "records" && <History />}
      
      </div>
    </div>
  );
}

function LeaveRequests() {
  return (
    <div className="h-full overflow-y-auto">
      <LeaveRequest />
    </div>
  );
}

function History() {
  return (
    <div className="h-full overflow-y-auto">
      <Historyleave />
    </div>
  );
}



export default ManagerRequests;
