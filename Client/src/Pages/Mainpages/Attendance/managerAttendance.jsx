import React, { useState, useEffect } from "react";
import { useGetAllAttendanceQuery } from "../../../redux/slices/api/attendanceApiSlice";

const ManagerAttendance = () => {
  const {
    data: attendanceResponse,
    error,
    isLoading,
  } = useGetAllAttendanceQuery();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (error && !errorMessage) {
      console.error("Error fetching all attendance records:", error);
      setErrorMessage("Failed to fetch all attendance records.");
    }
  }, [error, errorMessage]);

  const attendanceRecords = attendanceResponse?.attendanceRecords || [];

  return (
    <div className="container mx-auto ">
      {errorMessage && (
        <div className="text-red-600 mb-4 bg-red-100 border-l-4 border-red-500 p-4">
          {errorMessage}
        </div>
      )}

      {/* Attendance Records Table */}
      {attendanceRecords.length > 0 ? (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Employee Name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Clock In
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Clock Out
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Total Work Hours
                </th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.map((record) => (
                <tr key={record._id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {record.user?.name || "N/A"}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {record.user?.email || "N/A"}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {new Date(record.date).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {record.status}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {record.clockIn
                      ? new Date(record.clockIn).toLocaleTimeString()
                      : "N/A"}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {record.clockOut
                      ? new Date(record.clockOut).toLocaleTimeString()
                      : "N/A"}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {record.totalWorkHours
                      ? record.totalWorkHours.toFixed(2)
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p>No attendance records found.</p>
        </div>
      )}
    </div>
  );
};

export default ManagerAttendance;
