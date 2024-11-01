import React from "react";

const TaskDetails = ({ closeTaskDetails }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-4xl h-full overflow-y-auto rounded-lg p-6 relative">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          onClick={closeTaskDetails} // Close Task Details
        >
          Close
        </button>

        <h2 className="text-2xl font-bold mb-4">Task Details</h2>
        <div className="mb-4">
          <p className="text-sm text-gray-500">May 26, 2024</p>
          <h3 className="text-lg font-bold">
            Review and Update Job Descriptions
          </h3>
          <p className="text-sm text-gray-600">
            This task involves reviewing all job descriptions and updating them
            with current standards and compliance.
          </p>
        </div>

        <div className="mb-4">
          <h4 className="text-lg font-semibold">Checklist Progress</h4>
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
        </div>

        <div className="mb-4">
          <h4 className="text-lg font-semibold">Comments</h4>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-sm text-gray-600">
              John Doe: Please review the descriptions before the meeting.
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg mt-2">
            <p className="text-sm text-gray-600">
              Jane Smith: I will make the necessary updates by tomorrow.
            </p>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-lg font-semibold">Attachments</h4>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Job_Descriptions_Update.pdf</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
