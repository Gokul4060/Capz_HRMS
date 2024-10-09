import React, { useState, useEffect } from "react";
import {
  useGetUserleaveQuery,
  useDeleteLeaveRequestMutation,
} from "../../../redux/slices/api/leaveApiSlice";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa"; // Import the trash icon
import { FaSpinner } from "react-icons/fa"; // Spinner for loading

const LeaveRecords = ({ shouldRefetchRecords }) => {
  const { data: leaveRecords, isLoading, refetch } = useGetUserleaveQuery();
  const [
    deleteLeaveRequest,
    { isLoading: isDeleting, isSuccess: isDeleteSuccess },
  ] = useDeleteLeaveRequestMutation();

  const [showDialog, setShowDialog] = useState(false);
  const [selectedLeaveId, setSelectedLeaveId] = useState(null);

  // Automatically refetch leave records if deletion is successful
  useEffect(() => {
    if (isDeleteSuccess) {
      refetch();
    }

    // Refetch the leave records if 'shouldRefetchRecords' is true
    if (shouldRefetchRecords) {
      refetch();
    }
  }, [isDeleteSuccess, shouldRefetchRecords, refetch]);

  const openDialog = (id) => {
    setSelectedLeaveId(id);
    setShowDialog(true);
  };

  const closeDialog = () => {
    setSelectedLeaveId(null);
    setShowDialog(false);
  };

  const handleDelete = async () => {
    try {
      await deleteLeaveRequest(selectedLeaveId).unwrap();
      toast.success("Leave record deleted successfully!");
      closeDialog(); // Close dialog after deletion
    } catch (error) {
      const errorMsg = error?.data?.message || "Failed to delete leave record.";
      toast.error(errorMsg);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto">
          {[1, 2, 3, 4].map((_, idx) => (
            <div
              key={idx}
              className="bg-white shadow-lg rounded-lg p-6 w-64 h-40 animate-pulse"
            >
              <div className="h-6 bg-gray-200 rounded mb-4">.....</div>
            </div>
          ))}
        </div>
        <div className="absolute inset-0 flex justify-center items-center">
          <FaSpinner className="text-4xl text-blue-500 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold mb-2">Leave Records</h3>
      </div>
      <div className="overflow-x-auto mt-5">
        <table className="min-w-full text-sm divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
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
                Approver
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Leave Days
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leaveRecords?.leaveRecords.map((leave) => (
              <tr key={leave?._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {leave?.startDate
                    ? new Date(leave.startDate).toLocaleDateString()
                    : "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {leave?.endDate
                    ? new Date(leave.endDate).toLocaleDateString()
                    : "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap capitalize">
                  {leave?.leaveType || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {leave?.approver?.name
                    ? `${leave.approver.name} (${leave.approver.role || "N/A"})`
                    : "Unknown Approver"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {leave?.leaveBalance || 0}
                </td>
                <td
                  className={`px-6 py-4 whitespace-nowrap text-${
                    leave?.status === "Approved"
                      ? "green"
                      : leave?.status === "Rejected"
                      ? "red"
                      : "yellow"
                  }-600`}
                >
                  {leave?.status || "Pending"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => openDialog(leave?._id)}
                    className={`text-red-500 hover:text-red-700 ${
                      isDeleting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={isDeleting}
                    title="Delete"
                  >
                    <FaTrash className="inline-block text-lg" />{" "}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Small Dialog Box */}
      {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-80 p-6">
            <h3 className="text-lg font-semibold mb-4 text-center">
              Confirm Deletion
            </h3>
            <p className="text-sm text-gray-700 mb-4 text-center">
              Are you sure you want to delete this leave request?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                Yes
              </button>
              <button
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                onClick={closeDialog}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveRecords;
