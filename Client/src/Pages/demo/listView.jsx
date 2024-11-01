import React from "react";

const TaskListView = () => {
  return (
    <div className="space-y-4">
      {" "}
      {/* Adding vertical spacing between each task */}
      {/* Task 1 */}
      <div className="bg-white rounded-lg p-4 shadow">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500">May 26, 2024</p>
            <h3 className="font-bold text-lg">
              Review and Update Job Descriptions
            </h3>
            <p className="text-sm text-gray-600">
              Analyze current job descriptions and revise accordingly
            </p>
          </div>
          <span className="text-red-500">
            <i className="fas fa-ellipsis-h"></i>
          </span>
        </div>
        <div className="flex items-center mt-2">
          <span className="bg-green-100 text-green-500 text-xs px-2 py-1 rounded">
            Checklist
          </span>
          <div className="flex-1 mx-2 bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{ width: "75%" }}
            ></div>
          </div>
          <span className="text-sm text-gray-500">3/4</span>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex space-x-2">
            <span className="text-gray-500">
              <i className="fas fa-comment"></i> 2
            </span>
            <span className="text-gray-500">
              <i className="fas fa-file-alt"></i> 8
            </span>
          </div>
          <div className="flex -space-x-2">
            <img
              src="avatar1.jpg"
              alt="user1"
              className="w-8 h-8 rounded-full border-2 border-white"
            />
            <img
              src="avatar2.jpg"
              alt="user2"
              className="w-8 h-8 rounded-full border-2 border-white"
            />
          </div>
        </div>
      </div>
      {/* Task 2 */}
      <div className="bg-white rounded-lg p-4 shadow">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500">May 28, 2024</p>
            <h3 className="font-bold text-lg">Update Employee Handbook</h3>
            <p className="text-sm text-gray-600">
              Revise the employee handbook to include new policies.
            </p>
          </div>
          <span className="text-red-500">
            <i className="fas fa-ellipsis-h"></i>
          </span>
        </div>
        <div className="flex items-center mt-2">
          <span className="bg-green-100 text-green-500 text-xs px-2 py-1 rounded">
            Checklist
          </span>
          <div className="flex-1 mx-2 bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{ width: "50%" }}
            ></div>
          </div>
          <span className="text-sm text-gray-500">2/4</span>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex space-x-2">
            <span className="text-gray-500">
              <i className="fas fa-comment"></i> 5
            </span>
            <span className="text-gray-500">
              <i className="fas fa-file-alt"></i> 10
            </span>
          </div>
          <div className="flex -space-x-2">
            <img
              src="avatar3.jpg"
              alt="user3"
              className="w-8 h-8 rounded-full border-2 border-white"
            />
            <img
              src="avatar4.jpg"
              alt="user4"
              className="w-8 h-8 rounded-full border-2 border-white"
            />
          </div>
        </div>
      </div>
      {/* Add more task cards similarly */}
    </div>
  );
};

export default TaskListView;
