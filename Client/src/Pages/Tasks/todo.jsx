import React from "react";

const TaskBoard = () => {
  const columns = [
    {
      title: "To-do",
      count: 5,
      tasks: [
        {
          title: "Employee Details",
          description: "Create a page where there is information...",
          priority: "Medium",
          type: "Dashboard",
          assignees: [
            { name: "A", avatar: "https://via.placeholder.com/30" },
            { name: "B", avatar: "https://via.placeholder.com/30" },
          ],
          comments: 12,
          attachments: 3,
        },
        {
          title: "Darkmode Version",
          description: "Darkmode version for all screens...",
          priority: "Low",
          type: "Mobile app",
          assignees: [
            { name: "C", avatar: "https://via.placeholder.com/30" },
            { name: "D", avatar: "https://via.placeholder.com/30" },
          ],
          comments: 2,
          attachments: 10,
        },
      ],
    },
    {
      title: "On Progress",
      count: 10,
      tasks: [
        {
          title: "Super Admin Role",
          description: "Set up the super admin role...",
          priority: "High",
          type: "Dashboard",
          assignees: [
            { name: "E", avatar: "https://via.placeholder.com/30" },
            { name: "F", avatar: "https://via.placeholder.com/30" },
          ],
          comments: 8,
          attachments: 2,
        },
        {
          title: "Settings Page",
          description: "Create a settings page for the admin panel...",
          priority: "Medium",
          type: "Mobile app",
          assignees: [
            { name: "G", avatar: "https://via.placeholder.com/30" },
            { name: "H", avatar: "https://via.placeholder.com/30" },
          ],
          comments: 4,
          attachments: 1,
        },
      ],
    },
    {
      title: "In Review",
      count: 2,
      tasks: [
        {
          title: "Customer Role",
          description: "Set up customer role and permissions...",
          priority: "Medium",
          type: "Dashboard",
          assignees: [
            { name: "I", avatar: "https://via.placeholder.com/30" },
            { name: "J", avatar: "https://via.placeholder.com/30" },
          ],
          comments: 10,
          attachments: 12,
        },
      ],
    },
    {
      title: "Completed",
      count: 20,
      tasks: [
        {
          title: "Design System & Style Guide",
          description: "Complete the design system...",
          priority: "Low",
          type: "Mobile app",
          assignees: [
            { name: "K", avatar: "https://via.placeholder.com/30" },
            { name: "L", avatar: "https://via.placeholder.com/30" },
          ],
          comments: 12,
          attachments: 10,
        },
      ],
    },
  ];

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
      {columns.map((column, index) => (
        <TaskColumn
          key={index}
          title={column.title}
          tasks={column.tasks}
          count={column.count}
        />
      ))}
    </div>
  );
};

const TaskColumn = ({ title, tasks, count }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-xl">{title}</h2>
        <span className="text-gray-500">{count}</span>
      </div>
      <div className="space-y-4">
        {tasks.map((task, index) => (
          <TaskCard key={index} task={task} />
        ))}
      </div>
    </div>
  );
};

const TaskCard = ({ task }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
      <div className="flex justify-between mb-2">
        <span
          className={`px-2 py-1 rounded-full text-xs font-bold ${getBadgeColor(
            task.priority
          )}`}
        >
          {task.priority}
        </span>
        <span className="text-gray-400">{task.type}</span>
      </div>
      <h3 className="font-semibold text-lg">{task.title}</h3>
      <p className="text-gray-500">{task.description}</p>
      <div className="flex justify-between mt-4">
        <div className="flex -space-x-2">
          {task.assignees.map((assignee, index) => (
            <img
              key={index}
              src={assignee.avatar}
              alt={assignee.name}
              className="w-6 h-6 rounded-full border-2 border-white"
            />
          ))}
        </div>
        <div className="text-gray-400 text-sm">
          {task.comments} comments • {task.attachments} attachments
        </div>
      </div>
    </div>
  );
};

const getBadgeColor = (priority) => {
  switch (priority) {
    case "High":
      return "bg-red-100 text-red-600";
    case "Medium":
      return "bg-yellow-100 text-yellow-600";
    case "Low":
      return "bg-green-100 text-green-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

export default TaskBoard;
