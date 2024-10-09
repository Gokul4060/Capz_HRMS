import React from "react";

const tasks = [
  {
    task: "Fixing bug",
    project: "Project X",
    time: "3:00 - 3:30 PM",
    duration: "0.30 m",
    billable: true,
  },
  {
    task: "Illustration",
    project: "Acme",
    time: "4:00 - 4:30 PM",
    duration: "0.30 m",
    billable: true,
  },
];

const TimeTracker = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Time Tracker</h2>
      <div className="space-y-4">
        {tasks.map((task, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-sm"
          >
            <div>
              <h3 className="text-lg font-medium">{task.task}</h3>
              <p className="text-sm text-gray-500">{task.project}</p>
            </div>
            <div className="text-sm">
              {task.billable && (
                <span className="text-green-500">$ Billable</span>
              )}{" "}
              - {task.time} - {task.duration}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeTracker;
