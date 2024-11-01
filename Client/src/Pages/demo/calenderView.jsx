import React, { useState } from "react";

const CalendarView = () => {
  const [view, setView] = useState("month"); // Default to 'month' view

  // Example tasks with dates
  const tasks = [
    {
      date: "2024-05-26",
      title: "Review and Update Job Descriptions",
      progress: "75%",
      checklist: "3/4",
    },
    {
      date: "2024-05-28",
      title: "Update Employee Handbook",
      progress: "50%",
      checklist: "2/4",
    },
    // Add more tasks as needed
  ];

  // Helper function to generate calendar days for month view
  const generateMonthCalendar = () => {
    const daysInMonth = 31; // For May 2024
    const firstDay = 3; // Assuming May 1st, 2024 is a Wednesday (index 3 for Wednesday)

    const calendarDays = [];
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push({ day: "", task: null }); // Empty cells before May starts
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const taskForDay = tasks.find(
        (task) => task.date === `2024-05-${String(day).padStart(2, "0")}`
      );
      calendarDays.push({ day, task: taskForDay });
    }

    return calendarDays;
  };

  // Helper function to generate calendar days for year view
  const generateYearCalendar = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months.map((month, index) => ({
      month,
      tasksForMonth: tasks.filter((task) =>
        task.date.includes(`2024-${String(index + 1).padStart(2, "0")}`)
      ),
    }));
  };

  const calendarDays = generateMonthCalendar();
  const yearData = generateYearCalendar();

  return (
    <div className="p-4">
      {/* Top bar with Day/Month/Year selector */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Calendar View</h2>
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 rounded-lg shadow-sm hover:bg-gray-200 transition duration-300 ${
              view === "day" ? "bg-gray-300" : "bg-gray-100"
            }`}
            onClick={() => setView("day")}
          >
            Day
          </button>
          <button
            className={`px-4 py-2 rounded-lg shadow-sm hover:bg-gray-200 transition duration-300 ${
              view === "month" ? "bg-gray-300" : "bg-gray-100"
            }`}
            onClick={() => setView("month")}
          >
            Month
          </button>
          <button
            className={`px-4 py-2 rounded-lg shadow-sm hover:bg-gray-200 transition duration-300 ${
              view === "year" ? "bg-gray-300" : "bg-gray-100"
            }`}
            onClick={() => setView("year")}
          >
            Year
          </button>
        </div>
      </div>

      {/* Conditional Rendering based on selected view */}
      {view === "day" && (
        <div>
          <h3 className="text-lg font-bold">Tasks for May 26, 2024</h3>
          {/* Display tasks for the selected day */}
          {tasks
            .filter((task) => task.date === "2024-05-26") // Change the date dynamically based on selection
            .map((task) => (
              <div
                key={task.title}
                className="bg-white rounded-lg p-4 shadow mb-4"
              >
                <h3 className="font-bold text-lg">{task.title}</h3>
                <p className="text-sm text-gray-600">
                  {task.progress} completed
                </p>
                <p className="text-sm text-gray-600">
                  {task.checklist} checklist items completed
                </p>
              </div>
            ))}
        </div>
      )}

      {view === "month" && (
        <div>
          <div className="grid grid-cols-7 gap-4">
            {/* Calendar Days (Sun, Mon, etc.) */}
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center font-bold text-gray-700">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-4 mt-2">
            {/* Render Calendar with Days and Tasks */}
            {calendarDays.map((cell, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow p-2 min-h-[100px]"
              >
                {/* Display the day */}
                <div className="text-right text-gray-600">{cell.day}</div>

                {/* If there's a task for that day, display it */}
                {cell.task && (
                  <div className="mt-2">
                    <h3 className="font-bold text-sm">{cell.task.title}</h3>
                    <div className="flex items-center mt-1">
                      <span className="bg-green-100 text-green-500 text-xs px-2 py-1 rounded">
                        Checklist {cell.task.checklist}
                      </span>
                      <div className="flex-1 mx-2 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: cell.task.progress }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {view === "year" && (
        <div className="grid grid-cols-3 gap-4">
          {/* Render Calendar for each month */}
          {yearData.map(({ month, tasksForMonth }, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-4">
              <h3 className="font-bold text-lg">{month}</h3>
              {/* Display tasks for each month */}
              {tasksForMonth.length > 0 ? (
                tasksForMonth.map((task) => (
                  <div key={task.title} className="mt-2">
                    <h4 className="font-bold text-sm">{task.title}</h4>
                    <p className="text-sm text-gray-600">
                      Progress: {task.progress}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-600">No tasks</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CalendarView;
