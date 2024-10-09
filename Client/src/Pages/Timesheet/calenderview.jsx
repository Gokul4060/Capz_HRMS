import React, { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  isWithinInterval,
  parseISO,
} from "date-fns";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null); // Store the selected day
  const [editedTask, setEditedTask] = useState({ title: "", description: "" });

  // Sample tasks with statuses: 'upcoming', 'ongoing', 'completed'
  const tasks = [
    {
      title: "Project Kickoff",
      startDate: "2024-10-01",
      endDate: "2024-10-02",
      status: "completed",
    },
    {
      title: "Design Phase",
      startDate: "2024-10-03",
      endDate: "2024-10-06",
      status: "completed",
    },
    {
      title: "Development Start",
      startDate: "2024-10-08",
      endDate: "2024-10-20",
      status: "ongoing",
    },
    {
      title: "Testing Phase",
      startDate: "2024-10-22",
      endDate: "2024-10-25",
      status: "upcoming",
    },
    {
      title: "Launch",
      startDate: "2024-10-27",
      endDate: "2024-10-30",
      status: "upcoming",
    },
  ];

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={prevMonth}
          className="bg-green-600 text-white p-2 rounded"
        >
          Prev
        </button>
        <h2 className="text-2xl font-bold">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <button
          onClick={nextMonth}
          className="bg-green-600 text-white p-2 rounded"
        >
          Next
        </button>
      </div>
    );
  };

  const prevMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
    );
  };

  const renderDays = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return (
      <div className="grid grid-cols-7 gap-4 mb-2 text-center text-gray-600 font-semibold">
        {days.map((day, index) => (
          <div key={index}>{day}</div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    // Function to check if a day is within a task's duration
    const getTaskForDay = (day) => {
      return tasks.find((task) =>
        isWithinInterval(day, {
          start: parseISO(task.startDate),
          end: parseISO(task.endDate),
        })
      );
    };

    const handleDoubleClick = (day) => {
      setSelectedDay(day); // Store the selected day
      const taskForDay = getTaskForDay(day);
      setEditedTask({
        title: taskForDay ? taskForDay.title : "",
        description: taskForDay ? taskForDay.description : "",
      });
    };

    const handleTaskChange = (e) => {
      const { name, value } = e.target;
      setEditedTask((prevTask) => ({
        ...prevTask,
        [name]: value,
      }));
    };

    const handleSave = () => {
      // Handle saving the edited task to your task list
      setSelectedDay(null); // Close the card after saving
    };

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, "d");
        const cloneDay = day;

        // Get the task for this day if any
        const task = getTaskForDay(day);
        let taskLineClass = "";

        // Apply a colored line for tasks (green, yellow, red)
        if (task) {
          if (task.status === "completed") taskLineClass = "bg-green-500";
          else if (task.status === "ongoing") taskLineClass = "bg-yellow-500";
          else if (task.status === "upcoming") taskLineClass = "bg-red-500";
        }

        days.push(
          <div
            className={`p-4 h-auto relative border text-center cursor-pointer bg-white ${
              !isSameMonth(day, monthStart) ? "text-gray-300" : ""
            } ${isSameDay(day, new Date()) ? "bg-green-600 text-white" : ""}`}
            key={day}
            onDoubleClick={() => handleDoubleClick(cloneDay)} // Handle double-click event
          >
            <span>{formattedDate}</span>
            {/* Display task name if task exists */}
            {task && (
              <div className="text-xs font-bold text-center text-black mt-2">
                {task.title}
              </div>
            )}
            {/* If task exists for this date, draw a line below */}
            {task && (
              <div
                className={`absolute bottom-0 left-0 right-0 h-1 ${taskLineClass}`}
              ></div>
            )}

            {/* Render edit card inline for the selected day */}
            {isSameDay(day, selectedDay) && (
              <div className="bg-gray-100 rounded-md p-2 mt-2 w-full">
                <h3 className="font-semibold mb-2">
                  Edit Task for {format(selectedDay, "MMMM d, yyyy")}
                </h3>
                <input
                  type="text"
                  name="title"
                  value={editedTask.title}
                  onChange={handleTaskChange}
                  placeholder="Task Title"
                  className="w-full border p-2 mb-2 rounded-md"
                />
                <textarea
                  name="description"
                  value={editedTask.description}
                  onChange={handleTaskChange}
                  placeholder="Task Description"
                  className="w-full border p-2 mb-2 rounded-md"
                />
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setSelectedDay(null)} // Close the card
                    className="px-4 py-2 bg-gray-300 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave} // Save the changes
                    className="px-4 py-2 bg-green-500 text-white rounded-md"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7 gap-2" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div>{rows}</div>;
  };

  return (
    <div className="container mx-auto p-5 bg-white">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default Calendar;
