import React from "react";
import { useGetAllTimesheetsQuery } from "../../../../redux/slices/api/timeApiSlice";

const TimesheetList = () => {
  const {
    data: timesheets,
    isLoading,
    isError,
    error,
  } = useGetAllTimesheetsQuery();

  // Handle loading state
  if (isLoading) return <div>Loading...</div>;

  // Handle error state
  if (isError) return <div>Error: {error?.data?.message}</div>;

  // Ensure timesheets is an array, or fallback to an empty array
  const timesheetList = Array.isArray(timesheets) ? timesheets : [];

  return (
    <div>
      <h1>Timesheets</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>User</th>
            <th>Hours Worked</th>
            <th>Task Details</th>
          </tr>
        </thead>
        <tbody>
          {timesheetList.map((timesheet) => (
            <tr key={timesheet._id}>
              <td>{new Date(timesheet.date).toLocaleDateString()}</td>
              <td>{timesheet.user?.name}</td>
              <td>{timesheet.hoursWorked}</td>
              <td>{timesheet.taskDetails}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TimesheetList;
