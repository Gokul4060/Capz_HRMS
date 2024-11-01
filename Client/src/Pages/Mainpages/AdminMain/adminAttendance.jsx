import React, { useState, useEffect } from "react";
import {
  useGetAllAttendanceQuery,
  useDeleteAttendanceRecordsMutation, // Import the delete mutation hook
} from "../../../redux/slices/api/attendanceApiSlice";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AdminAttendance = () => {
  const {
    data: attendanceResponse,
    error,
    isLoading,
  } = useGetAllAttendanceQuery();

  const [deleteAttendanceRecords, { isLoading: isDeleting }] =
    useDeleteAttendanceRecordsMutation(); // Use the delete mutation

  const [errorMessage, setErrorMessage] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const attendanceRecords = attendanceResponse?.attendanceRecords || [];

  const filteredAttendanceRecords = attendanceRecords.filter((record) => {
    const recordDate = new Date(record.date);
    const isWithinRange =
      (!startDate || new Date(startDate) <= recordDate) &&
      (!endDate || new Date(endDate) >= recordDate);
    return isWithinRange;
  });

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const totalPages = Math.ceil(filteredAttendanceRecords.length / rowsPerPage);

  const paginatedAttendanceRecords = filteredAttendanceRecords.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

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

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    if (error && !errorMessage) {
      console.error("Error fetching all attendance records:", error);
      setErrorMessage("Failed to fetch all attendance records.");
    }
  }, [error, errorMessage]);

  const handleDeleteAll = async () => {
    if (!startDate || !endDate) {
      setErrorMessage("Please select both start and end dates.");
      return;
    }

    setErrorMessage(""); // Clear previous error message

    try {
      await deleteAttendanceRecords({ startDate, endDate }).unwrap(); // Trigger the delete mutation
      alert("Attendance records deleted successfully.");
    } catch (err) {
      console.error("Error deleting attendance records:", err);
      setErrorMessage("Failed to delete attendance records.");
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [
        [
          "Employee Name",
          "Email",
          "Date",
          "Clock In",
          "Clock Out",
          "Total Work Hours",
          "Status",
        ],
      ],
      body: filteredAttendanceRecords.map((record) => [
        record.user?.name || "N/A",
        record.user?.email || "N/A",
        new Date(record.date).toLocaleDateString(),
        record.clockIn ? new Date(record.clockIn).toLocaleTimeString() : "N/A",
        record.clockOut
          ? new Date(record.clockOut).toLocaleTimeString()
          : "N/A",
        record.totalWorkHours ? record.totalWorkHours.toFixed(2) : "N/A",
        record.status,
      ]),
      styles: { fontSize: 8 },
      columnStyles: { 0: { cellWidth: "auto" } },
      startY: 10,
      theme: "striped",
    });
    doc.save("FilteredAttendanceRecords.pdf");
  };

  return (
    <div className="container mx-auto mt-3 p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-medium">Attendance Records</h1>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              className="mt-1 p-2 border border-gray-300 rounded-lg"
              placeholderText="Select start date"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              className="mt-1 p-2 border border-gray-300 rounded-lg"
              placeholderText="Select end date"
            />
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <button
            className="bg-red-500 text-white hover:bg-red-700 hover:text-black font-semibold py-2 px-4 rounded-2xl text-sm"
            onClick={handleDeleteAll}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete All"}
          </button>

          <button
            className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white hover:bg-green-700 hover:text-black font-semibold py-2 px-4 rounded-2xl text-sm"
            onClick={downloadPDF}
          >
            Download PDF
          </button>
        </div>
      </div>

      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

      {paginatedAttendanceRecords.length > 0 ? (
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
                  Clock In
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Clock Out
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Total Work Hours
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedAttendanceRecords.map((record) => (
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
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {record.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No attendance records found for the selected date range.</p>
      )}

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

export default AdminAttendance;
