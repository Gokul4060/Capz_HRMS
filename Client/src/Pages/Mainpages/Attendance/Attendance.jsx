import React, { useState, useEffect } from "react";
import {
  useMarkAttendanceMutation,
  useMarkClockOutMutation,
  useGetUserAttendanceQuery,
} from "../../../redux/slices/api/attendanceApiSlice";
import AttendanceRecords from "../../Mainpages/Attendance/attendanceRecords";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Attendance = () => {
  const [markAttendance, { isLoading: isMarkingAttendance }] =
    useMarkAttendanceMutation();
  const [markClockOut, { isLoading: isMarkingClockOut }] =
    useMarkClockOutMutation();

  const {
    data: attendanceResponse,
    isLoading: isFetchingAttendance,
    refetch,
  } = useGetUserAttendanceQuery();

  const attendanceRecords = attendanceResponse?.attendanceRecords || [];


  const [timeIn, setTimeIn] = useState(null);
  const [clockedOut, setClockedOut] = useState(false); 
  const [errorMessage, setErrorMessage] = useState("");
  const [workHoursMessage, setWorkHoursMessage] = useState("");
  const [progress, setProgress] = useState(0); 
  const [timeRemaining, setTimeRemaining] = useState("09:00:00"); 
  const [dayProgress, setDayProgress] = useState(0);
  const [weekProgress, setWeekProgress] = useState(0);
  const [monthProgress, setMonthProgress] = useState(0);
  const [remainingProgress, setRemainingProgress] = useState(100);
  const [timerInterval, setTimerInterval] = useState(null); 


  useEffect(() => {
    if (attendanceRecords.length > 0) {
      const todayRecord = attendanceRecords.find(
        (record) =>
          new Date(record.date).toDateString() === new Date().toDateString()
      );
      if (todayRecord && todayRecord.clockIn) {
        setTimeIn(todayRecord.clockIn);
        if (!todayRecord.clockOut) {
          startTimer(); 
        } else {
          stopTimer();
        }
      }
    }
  }, [attendanceRecords]);

  // Function to calculate progress percentages for day, week, and month
  const calculateProgress = () => {
    const startWorkTime = new Date();
    startWorkTime.setHours(9, 0, 0, 0); // Set time to 9 AM

    const endWorkTime = new Date();
    endWorkTime.setHours(18, 0, 0, 0); // Set time to 6 PM

    const currentTime = new Date();

    // Calculate day progress
    if (currentTime < startWorkTime) {
      setDayProgress(0); 
      setTimeRemaining("09:00:00");
    } else if (currentTime > endWorkTime) {
      setDayProgress(100); 
      setTimeRemaining("00:00:00");
      stopTimer(); 
    } else {
      const totalWorkTime = endWorkTime - startWorkTime; 
      const timeElapsed = currentTime - startWorkTime; 
      const progressPercentage = (timeElapsed / totalWorkTime) * 100;
      setDayProgress(progressPercentage); 

   
      const timeLeft = endWorkTime - currentTime;
      const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60)); 
      const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)); 
      const secondsLeft = Math.floor((timeLeft % (1000 * 60)) / 1000); 

      // Format time as hh:mm:ss
      const formattedTime = `${String(hoursLeft).padStart(2, '0')}:${String(minutesLeft).padStart(2, '0')}:${String(secondsLeft).padStart(2, '0')}`;
      setTimeRemaining(formattedTime); // Set the remaining time
    }

    // Calculate week progress (assuming 5 workdays from Monday to Friday)
    const currentDayOfWeek = currentTime.getDay();
    const startOfWeek = new Date(startWorkTime);
    startOfWeek.setDate(currentTime.getDate() - currentDayOfWeek + 1); // Adjust to the start of the week

    const endOfWeek = new Date(endWorkTime);
    endOfWeek.setDate(startOfWeek.getDate() + 4); // Friday end

    const totalWeekTime = endOfWeek - startOfWeek; // Total week in milliseconds
    const weekTimeElapsed = currentTime - startOfWeek; // Time passed since start of the week
    const weekProgressPercentage = (weekTimeElapsed / totalWeekTime) * 100;
    setWeekProgress(Math.min(weekProgressPercentage, 100)); // Update week progress percentage

    // Calculate month progress (assuming a 30-day month)
    const startOfMonth = new Date(currentTime.getFullYear(), currentTime.getMonth(), 1);
    const endOfMonth = new Date(currentTime.getFullYear(), currentTime.getMonth() + 1, 0);

    const totalMonthTime = endOfMonth - startOfMonth; // Total month in milliseconds
    const monthTimeElapsed = currentTime - startOfMonth; // Time passed since start of the month
    const monthProgressPercentage = (monthTimeElapsed / totalMonthTime) * 100;
    setMonthProgress(Math.min(monthProgressPercentage, 100)); // Update month progress percentage

    // Calculate remaining time progress
    const remainingHours = 24 - currentTime.getHours(); // Remaining hours in the day
    const remainingProgressPercentage = (remainingHours / 24) * 100;
    setRemainingProgress(Math.min(remainingProgressPercentage, 100));
  };

  // Start the timer when attendance is marked
  const startTimer = () => {
    if (!timerInterval) {
      const interval = setInterval(calculateProgress, 1000); // Update every second
      setTimerInterval(interval); // Store the interval so we can clear it later
    }
  };

  // Stop the timer when user clocks out
  const stopTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null); // Clear the interval reference
    }
  };

  const handleMarkAttendance = async () => {
    try {
      const response = await markAttendance().unwrap();
      toast.success("Attendance marked successfully!");
      setTimeIn(response.clockIn); // Set the "Time In" after marking attendance
      startTimer(); // Start the timer when attendance is marked
      refetch(); // Trigger a refresh of attendance records
    } catch (error) {
      const errorMsg =
        error?.data?.message || "Failed to mark attendance. Try again.";
      setErrorMessage(errorMsg);
      toast.error(errorMsg);
    }
  };

  const handleMarkClockOut = async () => {
    try {
      const response = await markClockOut().unwrap();
      const message = `You worked a total of ${response.totalWorkHours.toFixed(
        2
      )} hours today.`;
      setWorkHoursMessage(message);
      toast.success("Clocked out successfully!");
      toast.info(message);
      stopTimer(); // Stop the timer when user clocks out
      setClockedOut(true); // Mark the user as clocked out
      refetch(); // Trigger a refresh of attendance records
    } catch (error) {
      const errorMsg =
        error?.data?.message || "Failed to clock out. Try again.";
      setErrorMessage(errorMsg);
      toast.error(errorMsg);
    }
  };

  return (
    <div className="container mx-auto mt-3 p-6">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
      {/* Top section for today's attendance and statistics */}
      <div className="flex gap-8 mb-8">
        {/* Today's Attendance */}
        <div className="bg-white shadow-md rounded-lg p-6 w-3/5 relative">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">
            Today's Attendance
          </h2>
          <p className="text-xl font-medium mb-4">
            Date : {new Date().toLocaleDateString()}
          </p>
          <div className="flex justify-center items-center mt-10 mb-6">
            <div className="flex flex-col items-center border border-gray-300 p-4 rounded-lg shadow-md">
              <span className="text-lg font-medium mb-2">Time In at</span>
              <span className="text-2xl text-gray-700">
                {timeIn ? new Date(timeIn).toLocaleTimeString() : "N/A"}
              </span>
            </div>
          </div>
          <div className="flex gap-4 justify-center mt-5">
            <button
              onClick={handleMarkAttendance}
              disabled={isMarkingAttendance || timeIn}
              className={`bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white hover:bg-green-700 hover:text-black font-semibold py-2 px-4 rounded-2xl text-sm transition ${
                isMarkingAttendance ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isMarkingAttendance ? "Marking..." : "Time in"}
            </button>
            <button
              onClick={handleMarkClockOut}
              disabled={isMarkingClockOut || clockedOut || !timeIn}
              className={`bg-gradient-to-r from-red-400 via-red-500 to-red-600 text-white hover:bg-red-700 hover:text-black font-semibold py-2 px-4 rounded-2xl text-sm transition ${
                isMarkingClockOut ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isMarkingClockOut ? "Clocking Out..." : "Time Out"}
            </button>
          </div>

          {/* Circular Timer Progress */}
          <div className="absolute right-6 top-6 w-24 h-24">
            <CircularProgressbar
              value={progress}
              text={timeRemaining} // Display time remaining in H:M:S format
              styles={buildStyles({
                textSize: "16px",
                pathColor: progress < 100 ? "#4caf50" : "#f44336",
                textColor: progress < 100 ? "#4caf50" : "#f44336",
                trailColor: "#d6d6d6",
              })}
            />
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-white shadow-md rounded-lg p-6 w-2/5">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">
            Statistics
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {/* Today */}
            <div>
              <span className="block text-lg font-medium">Today</span>
              <div className="relative pt-1">
                <div className="overflow-hidden h-4 text-xs flex rounded bg-gray-200">
                  <div
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                    style={{ width: `${dayProgress}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-500">
                  {timeRemaining} / 9 hrs
                </span>
              </div>
            </div>

            {/* This week */}
            <div>
              <span className="block text-lg font-medium">This Week</span>
              <div className="relative pt-1">
                <div className="overflow-hidden h-4 text-xs flex rounded bg-gray-200">
                  <div
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                    style={{ width: `${weekProgress}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-500">
                  {weekProgress.toFixed(0)}% / 40 hrs
                </span>
              </div>
            </div>

            {/* This month */}
            <div>
              <span className="block text-lg font-medium">This Month</span>
              <div className="relative pt-1">
                <div className="overflow-hidden h-4 text-xs flex rounded bg-gray-200">
                  <div
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                    style={{ width: `${monthProgress}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-500">
                  {monthProgress.toFixed(0)}% / 160 hrs
                </span>
              </div>
            </div>
            {/* Remaining */}
            <div>
              <span className="block text-lg font-medium">Remaining Time</span>
              <div className="relative pt-1">
                <div className="overflow-hidden h-4 text-xs flex rounded bg-gray-200">
                  <div
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-600"
                    style={{ width: `${remainingProgress}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-500">
                  {remainingProgress.toFixed(0)}% / 24 hrs
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Records */}
      <div className="mb-6 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 p-4">Attendance Records</h2>
        <AttendanceRecords attendanceRecords={attendanceRecords} />
      </div>
    </div>
  );
};

export default Attendance;
