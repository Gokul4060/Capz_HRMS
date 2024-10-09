import React, { useState } from "react";

const AttendanceRecords = ({ attendanceRecords }) => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5; // Number of records per page

  // Calculate total pages
  const totalPages = Math.ceil(attendanceRecords.length / recordsPerPage);

  // Get current records for the page
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = attendanceRecords.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="overflow-x-auto  rounded-lg p-7">
      {attendanceRecords.length > 0 ? (
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
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
            {currentRecords.map((record) => (
              <tr key={record._id}>
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
      ) : (
        <p>No attendance records found.</p>
      )}
      {/* Pagination */}
      <div className="flex justify-end mt-6 space-x-2">
        <button
          onClick={goToPreviousPage}
          className={`px-4 py-2 border rounded-full transition-colors duration-200 ease-in-out ${
            currentPage === 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-300"
          }`}
          disabled={currentPage === 1}
        >
          &#8592;
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`px-4 py-2 border rounded-full transition-colors duration-200 ease-in-out ${
              currentPage === index + 1
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={goToNextPage}
          className={`px-4 py-2 border rounded-full transition-colors duration-200 ease-in-out ${
            currentPage === totalPages
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-300"
          }`}
          disabled={currentPage === totalPages}
        >
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default AttendanceRecords;
