import React, { useState } from "react";
import {
  useGetLeaveHistoryQuery,
  useDeleteLeaveRequestMutation,
} from "../../../../redux/slices/api/leaveApiSlice";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Import the autoTable plugin
import DatePicker from "react-datepicker"; // Import DatePicker component
import "react-datepicker/dist/react-datepicker.css"; // Import DatePicker CSS
import { FaTrash } from "react-icons/fa"; // Import Trash Icon
import { ToastContainer, toast } from "react-toastify"; // Import Toastify components
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const LeaveHistory = () => {
  const {
    data: leaveHistory,
    isLoading,
    isError,
    refetch,
  } = useGetLeaveHistoryQuery();
  const [deleteLeaveRequest] = useDeleteLeaveRequestMutation(); // Hook for delete mutation

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5; // Number of rows per page

  // State for date range selection
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Calculate the index of the first and last leave request for the current page
  const indexOfLastLeave = currentPage * rowsPerPage;
  const indexOfFirstLeave = indexOfLastLeave - rowsPerPage;
  const currentLeaves = leaveHistory?.leaveHistory.slice(
    indexOfFirstLeave,
    indexOfLastLeave
  );

  // Function to filter leave records based on selected date range
  const filteredLeaves = leaveHistory?.leaveHistory.filter((leave) => {
    const leaveStartDate = new Date(leave.startDate);
    return (
      (!startDate || leaveStartDate >= startDate) &&
      (!endDate || leaveStartDate <= endDate)
    );
  });

  // Function to download the filtered leave history as a PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Leave History Report", 14, 16);
    const tableColumn = [
      "Employee Name",
      "Start Date",
      "End Date",
      "Leave Type",
      "Reason",
      "Status",
    ];
    const tableRows = filteredLeaves.map((leave) => [
      leave.user.name,
      new Date(leave.startDate).toLocaleDateString(),
      new Date(leave.endDate).toLocaleDateString(),
      leave.leaveType,
      leave.reason,
      leave.status,
    ]);
    doc.autoTable({ head: [tableColumn], body: tableRows, startY: 20 });
    doc.save("leave-history-report.pdf");
  };

  // Function to delete a leave request and refetch the list after deletion
  const handleDelete = async (leaveId, userName) => {
    try {
      await deleteLeaveRequest(leaveId).unwrap();
      toast.success(`${userName}'s Leave record deleted successfully.`);
      refetch(); // Refetch the leave history after successful deletion
    } catch (error) {
      toast.error(`Failed to delete the leave record for ${userName}.`);
    }
  };

  // Pagination functions
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    const totalPages = Math.ceil(filteredLeaves.length / rowsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (isLoading) return <p>Loading leave history...</p>;
  if (isError) return <p>Failed to load leave history.</p>;

  const totalPages = Math.ceil(filteredLeaves.length / rowsPerPage);

  return (
    <div className="mt-8 p-5">
      <ToastContainer /> {/* Make sure ToastContainer is rendered here */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold mb-2">
          Approved / Rejected Leave History
        </h3>
        <button
          onClick={downloadPDF}
          className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white hover:bg-green-700 hover:text-black font-semibold py-2 px-4 rounded-2xl text-sm"
        >
          Download Report
        </button>
      </div>
      {/* Date Range Picker */}
      <div className="flex space-x-4 my-4">
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
            placeholderText="Select Start Date"
            className="border rounded-md px-2 py-1"
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
            placeholderText="Select End Date"
            className="border rounded-md px-2 py-1"
          />
        </div>
      </div>
      <div className="overflow-x-auto mt-5">
        <table className="min-w-full text-sm divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Start Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                End Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Leave Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reason
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentLeaves?.map((leave) => (
              <tr key={leave._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {leave.user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(leave.startDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(leave.endDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap capitalize">
                  {leave.leaveType}
                </td>
                <td
                  className={`px-6 py-4 whitespace-nowrap text-${
                    leave.status === "Approved" ? "green" : "red"
                  }-600`}
                >
                  {leave.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap capitalize relative">
                  <div className="group cursor-pointer">
                    {/* Truncated reason text */}
                    <span className="block truncate max-w-xs">
                      {leave.reason}
                    </span>
                    {/* Tooltip popup */}
                    <div className="absolute hidden group-hover:block bg-gray-700 text-white text-xs rounded py-2 px-4 bottom-full mb-2 w-max max-w-xs">
                      {leave.reason}
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(leave._id, leave.user.name)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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

export default LeaveHistory;
