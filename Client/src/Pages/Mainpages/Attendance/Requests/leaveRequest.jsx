import React from "react";

function LeaveRequests() {
  const leaveRequests = [
    {
      id: 1,
      employeeName: "John Doe",
      dateRequested: "2023-09-01",
      leaveType: "Annual",
      status: "Pending",
    },
    {
      id: 2,
      employeeName: "Jane Smith",
      dateRequested: "2023-09-02",
      leaveType: "Sick",
      status: "Approved",
    },
    // Add more requests as needed
  ];

  return (
    <div className="overflow-x-auto shadow-lg rounded-lg">
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              ID
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Employee Name
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Date Requested
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Leave Type
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Status
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.map((request) => (
            <tr key={request.id}>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {request.id}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {request.employeeName}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {request.dateRequested}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {request.leaveType}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <span
                  className={`inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white rounded-full ${
                    request.status === "Pending"
                      ? "bg-orange-400"
                      : "bg-green-500"
                  }`}
                >
                  {request.status}
                </span>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <button
                  className="text-white bg-green-500 hover:bg-green-600 font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center mr-2"
                  onClick={() => handleApprove(request.id)}
                >
                  <svg
                    className="w-4 h-4 mr-2 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M8.707 13.293L5.414 10 4 11.414l4.707 4.707L16 8.707 14.586 7.293z" />
                  </svg>
                  Approve
                </button>
                <button
                  className="text-white bg-red-500 hover:bg-red-600 font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center"
                  onClick={() => handleReject(request.id)}
                >
                  <svg
                    className="w-4 h-4 mr-2 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 9l5 5-1.414 1.414L10 11.414l-3.586 3.586L5 14l5-5-5-5 1.414-1.414L10 6.586l3.586-3.586L15 3l-5 5z" />
                  </svg>
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function handleApprove(id) {
  // Implement actual approval logic here
  console.log("Approve", id);
}

function handleReject(id) {
  // Implement actual rejection logic here
  console.log("Reject", id);
}

export default LeaveRequests;
