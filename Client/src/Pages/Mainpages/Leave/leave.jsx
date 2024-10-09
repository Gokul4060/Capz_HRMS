import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaFlask, FaClock, FaSpinner, FaCheckCircle } from "react-icons/fa";
import LeaveRecords from "./leaveRecord";
import {
  useApplyLeaveMutation,
  useGetLeaveBalanceQuery,
  useGetUserleaveQuery,
} from "../../../redux/slices/api/leaveApiSlice";
import { useGetApproversQuery } from "../../../redux/slices/api/userApiSlice"; // Import approvers query

const Leave = () => {
  const [showForm, setShowForm] = useState(false);
  const { data: leaveBalanceData, refetch: refetchLeaveBalance } =
    useGetLeaveBalanceQuery();
  const [applyLeave, { isLoading: isApplying }] = useApplyLeaveMutation();
  const { data: leaveRecordsData, isLoading: isLoadingRecords } =
    useGetUserleaveQuery(); // Fetch the user's leave records

  // Fetch approvers (Managers and Admins)
  const { data: approversData, isLoading: loadingApprovers } =
    useGetApproversQuery();

  const [shouldRefetchRecords, setShouldRefetchRecords] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  const toggleForm = () => setShowForm(!showForm);

  const onSubmit = async (data) => {
    try {
      await applyLeave(data).unwrap();
      reset(); // Reset the form after submission
      toggleForm(); // Close the form on successful application
      refetchLeaveBalance(); // Refetch the updated leave balance

      // Trigger refetch for LeaveRecords
      setShouldRefetchRecords(true);
    } catch (error) {
      console.error("Failed to apply for leave:", error);
    }
  };

  // Set fallback default values to prevent undefined or null data display
  const totalLeaves = leaveBalanceData?.leaveBalance || 12; // Default to 12 total leaves
  const leavesTaken = leaveRecordsData
    ? leaveRecordsData.leaveRecords
        .filter((leave) => leave.status === "Approved")
        .reduce((acc, leave) => acc + leave.leaveBalance, 0)
    : 0; // Sum of approved leaves
  const leavesPending = leaveRecordsData
    ? leaveRecordsData.leaveRecords
        .filter((leave) => leave.status === "Pending")
        .reduce((acc, leave) => acc + leave.leaveBalance, 0)
    : 0; // Sum of pending leaves

  // Calculate the available leave balance
  const availableLeaves = totalLeaves - leavesTaken - leavesPending;

  return (
    <div className="p-5">
      <div className="grid grid-cols-4 gap-4 mb-4">
        {/* Total Leaves */}
        <div className="bg-gradient-to-r from-blue-400 to-blue-600 shadow-lg rounded-2xl p-4 flex items-center space-x-4">
          <div className="p-3 bg-white rounded-full">
            <FaFlask className="text-blue-600 text-2xl" />
          </div>
          <div>
            <p className="text-white">Total Leaves</p>
            <p className="text-xl text-white">{totalLeaves}</p>
          </div>
        </div>

        {/* Leaves Taken */}
        <div className="bg-gradient-to-r from-green-400 to-green-600 shadow-lg rounded-2xl p-4 flex items-center space-x-4">
          <div className="p-3 bg-white rounded-full">
            <FaClock className="text-green-600 text-2xl" />
          </div>
          <div>
            <p className="text-white">Leaves Taken</p>
            <p className="text-xl text-white">{leavesTaken}</p>
          </div>
        </div>

        {/* Leaves Pending */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 shadow-lg rounded-2xl p-4 flex items-center space-x-4">
          <div className="p-3 bg-white rounded-full">
            <FaSpinner className="text-yellow-600 text-2xl animate-spin" />
          </div>
          <div>
            <p className="text-white">Leaves Pending</p>
            <p className="text-xl text-white">{leavesPending}</p>
          </div>
        </div>

        {/* Available Leaves */}
        <div className="bg-gradient-to-r from-red-400 to-red-600 shadow-lg rounded-2xl p-4 flex items-center space-x-4">
          <div className="p-3 bg-white rounded-full">
            <FaCheckCircle className="text-red-600 text-2xl" />
          </div>
          <div>
            <p className="text-white">Leaves Available</p>
            <p className="text-xl text-white">{availableLeaves}</p>
          </div>
        </div>
      </div>

      {/* Apply Leave Button */}
      <div className="flex justify-end mt-8">
        <button
          className="px-5 py-2 bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white hover:bg-green-700 rounded-2xl hover:text-black font-semibold transition duration-300"
          onClick={toggleForm}
        >
          Apply Leave
        </button>
      </div>

      {/* Apply Leave Form */}
      {showForm && (
        <div className="fixed top-20 right-0 md:w-1/3 shadow-xl rounded-2xl p-10 mt-52 transform transition-transform duration-500 ease-in-out translate-x-0 bg-white">
          <h2 className="font-bold text-lg mb-4">Apply for Leave</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-4"
          >
            {/* Start Date */}
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Start Date
              </label>
              <input
                type="date"
                {...register("startDate", { required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>

            {/* End Date */}
            <div>
              <label className="block text-sm font-medium text-gray-900">
                End Date
              </label>
              <input
                type="date"
                {...register("endDate", { required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>

            {/* Leave Type */}
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Leave Type
              </label>
              <select
                {...register("leaveType", { required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option value="annual">Annual Leave</option>
                <option value="sick">Sick Leave</option>
                <option value="unpaid">Unpaid Leave</option>
              </select>
            </div>

            {/* Approver Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Approver
              </label>
              <select
                {...register("approver", { required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                {loadingApprovers ? (
                  <option>Loading approvers...</option>
                ) : (
                  approversData?.approvers.map((approver) => (
                    <option key={approver._id} value={approver._id}>
                      {approver.name} ({approver.role})
                    </option>
                  ))
                )}
              </select>
            </div>

            {/* Reason */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-900">
                Reason
              </label>
              <textarea
                {...register("reason", { required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                rows="3"
              ></textarea>
            </div>

            {/* Submit and Cancel Buttons */}
            <div className="col-span-2 flex justify-end space-x-2">
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white hover:bg-green-700 rounded-2xl hover:text-black transition duration-300"
                disabled={isApplying}
              >
                Submit
              </button>
              <button
                type="button"
                onClick={toggleForm}
                className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-2xl hover:bg-gray-700 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </form>

          {/* Display Leave Balance */}
          <div className="mt-4">
            <p className="text-sm text-gray-700">
              Leave Balance: {availableLeaves}
            </p>
          </div>
        </div>
      )}

      {/* Leave Records */}
      <div>
        <LeaveRecords shouldRefetchRecords={shouldRefetchRecords} />
      </div>
    </div>
  );
};

export default Leave;
