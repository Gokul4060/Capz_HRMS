import React, { useState } from "react";
import {
  useGetPendingLeaveRequestsQuery,
  useApproveLeaveMutation,
  useRejectLeaveMutation,
} from "../../../../redux/slices/api/leaveApiSlice";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const ManagerApproval = () => {
  const {
    data: pendingLeaveRequests,
    isLoading,
    isError,
    refetch,
  } = useGetPendingLeaveRequestsQuery();
  const [approveLeave] = useApproveLeaveMutation();
  const [rejectLeave] = useRejectLeaveMutation();

  const [reasons, setReasons] = useState({}); // Store reasons for each leave request

  // Handle reason input change for each leave request
  const handleReasonChange = (leaveId, value) => {
    setReasons((prevReasons) => ({
      ...prevReasons,
      [leaveId]: value,
    }));
  };

  // Approve leave request with reason
  const handleApprove = async (leaveId) => {
    const reason = reasons[leaveId] || "No reason provided"; // Use provided reason or default
    try {
      await approveLeave({ leaveId, status: "Approved", reason });
      refetch(); // Refetch pending leave requests after approval
    } catch (error) {
      console.error("Failed to approve leave:", error);
    }
  };

  // Reject leave request with reason
  const handleReject = async (leaveId) => {
    const reason = reasons[leaveId] || "No reason provided"; // Use provided reason or default
    try {
      await rejectLeave({ leaveId, status: "Rejected", reason });
      refetch(); // Refetch pending leave requests after rejection
    } catch (error) {
      console.error("Failed to reject leave:", error);
    }
  };

  if (isLoading) {
    return <p>Loading pending leave requests...</p>;
  }

  if (isError) {
    return <p>Failed to load leave requests.</p>;
  }

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold mb-2">Pending Leave Requests</h3>
      </div>

      <div className="mt-5 space-y-6">
        {pendingLeaveRequests?.leaveRequests.map((leave) => (
          <div
            key={leave._id}
            className="p-4 border border-gray-300 rounded-lg bg-white shadow-sm"
          >
            <div>
              <h4 className="font-semibold">
                {leave.user.name} - {leave.leaveType}
              </h4>
              <p className="text-sm text-gray-600">
                From: {new Date(leave.startDate).toLocaleDateString()} - To:{" "}
                {new Date(leave.endDate).toLocaleDateString()}
              </p>
            </div>

            <div className="mt-3">
              <label className="block text-sm font-semibold text-gray-700">
                Reason :  {leave.reason}
              </label>
            </div>

            <div className="mt-4 flex justify-end space-x-3">
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-md"
                onClick={() => handleApprove(leave._id)}
              >
                <FaCheckCircle className="inline mr-1" /> Approve
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md"
                onClick={() => handleReject(leave._id)}
              >
                <FaTimesCircle className="inline mr-1" /> Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagerApproval;
