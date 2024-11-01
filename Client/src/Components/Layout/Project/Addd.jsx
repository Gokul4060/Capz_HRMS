import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import enGB from "date-fns/locale/en-GB";
import { FaCalendarAlt } from "react-icons/fa";

registerLocale("en-GB", enGB); // Register locale

const Addd = () => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [projectTitle, setProjectTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [projectStage, setProjectStage] = useState("");
  const [priorityLevel, setPriorityLevel] = useState("");
  const [assets, setAssets] = useState(null);

  const handleAssetChange = (event) => {
    setAssets(event.target.files[0]);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Handle project form submission here
  };

  const handleCancel = () => {
    setSelectedStartDate(null);
    setSelectedEndDate(null);
    setProjectTitle("");
    setAssignedTo("");
    setProjectStage("");
    setPriorityLevel("");
    setAssets(null);
  };

  return (
    <div>
      <div className="mt-5">
        <form
          className="mx-auto grid max-w-screen-lg gap-4 px-6 pb-20"
          onSubmit={handleFormSubmit}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-serif text-xl font-bold text-blue-900">
                Project Title
              </p>
              <input
                type="text"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                className="mt-2 w-full rounded-lg border border-emerald-300 p-2.5 text-emerald-800 outline-none ring-opacity-30 focus:ring focus:ring-emerald-300"
                placeholder="Enter project title"
                required
              />
            </div>

            <div>
              <p className="font-serif text-xl font-bold text-blue-900">
                Assign Project To
              </p>
              <select
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                className="mt-2 w-full rounded-lg border border-emerald-300 p-2.5 text-emerald-800 outline-none ring-opacity-30 focus:ring focus:ring-emerald-300"
                required
              >
                <option value="" disabled>
                  Select user
                </option>
                <option value="user1">User 1</option>
                <option value="user2">User 2</option>
                <option value="user3">User 3</option>
              </select>
            </div>

            <div className="col-span-2">
              <p className="font-serif text-xl font-bold text-blue-900">
                Add assets
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleAssetChange}
                className="mt-2 w-full rounded-lg border border-emerald-300 p-2.5 text-emerald-800 outline-none ring-opacity-30 focus:ring focus:ring-emerald-300"
              />
            </div>
          </div>

          <div>
            <p className="mt-8 font-serif text-xl font-bold text-blue-900">
              Priority Level
            </p>
            <div className="mt-4 grid max-w-3xl gap-x-4 gap-y-3 sm:grid-cols-2 md:grid-cols-3">
              <div className="relative">
                <input
                  className="peer hidden"
                  id="low"
                  type="radio"
                  name="priority"
                  value="low"
                  checked={priorityLevel === "low"}
                  onChange={(e) => setPriorityLevel(e.target.value)}
                />
                <span className="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-emerald-400"></span>
                <label
                  className="flex h-full cursor-pointer flex-col rounded-lg p-4 shadow-lg shadow-slate-100 peer-checked:bg-emerald-600 peer-checked:text-white"
                  htmlFor="low"
                >
                  <span className="mt-2 font-medium">LOW</span>
                </label>
              </div>
              <div className="relative">
                <input
                  className="peer hidden"
                  id="medium"
                  type="radio"
                  name="priority"
                  value="medium"
                  checked={priorityLevel === "medium"}
                  onChange={(e) => setPriorityLevel(e.target.value)}
                />
                <span className="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-emerald-400"></span>
                <label
                  className="flex h-full cursor-pointer flex-col rounded-lg p-4 shadow-lg shadow-slate-100 peer-checked:bg-emerald-600 peer-checked:text-white"
                  htmlFor="medium"
                >
                  <span className="mt-2 font-medium">MEDIUM</span>
                </label>
              </div>
              <div className="relative">
                <input
                  className="peer hidden"
                  id="high"
                  type="radio"
                  name="priority"
                  value="high"
                  checked={priorityLevel === "high"}
                  onChange={(e) => setPriorityLevel(e.target.value)}
                />
                <span className="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-emerald-400"></span>
                <label
                  className="flex h-full cursor-pointer flex-col rounded-lg p-4 shadow-lg shadow-slate-100 peer-checked:bg-emerald-600 peer-checked:text-white"
                  htmlFor="high"
                >
                  <span className="mt-2 font-medium">HIGH</span>
                </label>
              </div>
            </div>
          </div>

          <div>
            <p className="mt-8 font-serif text-xl font-bold text-blue-900">
              Project Stage
            </p>
            <div className="mt-4 grid max-w-3xl gap-x-4 gap-y-3 sm:grid-cols-2 md:grid-cols-3">
              <div className="relative">
                <input
                  className="peer hidden"
                  id="planning"
                  type="radio"
                  name="stage"
                  value="planning"
                  checked={projectStage === "planning"}
                  onChange={(e) => setProjectStage(e.target.value)}
                />
                <span className="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-emerald-400"></span>
                <label
                  className="flex h-full cursor-pointer flex-col rounded-lg p-4 shadow-lg shadow-slate-100 peer-checked:bg-emerald-600 peer-checked:text-white"
                  htmlFor="planning"
                >
                  <span className="mt-2 font-medium">PLANNING</span>
                </label>
              </div>
              <div className="relative">
                <input
                  className="peer hidden"
                  id="inProgress"
                  type="radio"
                  name="stage"
                  value="in progress"
                  checked={projectStage === "in progress"}
                  onChange={(e) => setProjectStage(e.target.value)}
                />
                <span className="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-emerald-400"></span>

                <label
                  className="flex h-full cursor-pointer flex-col rounded-lg p-4 shadow-lg shadow-slate-100 peer-checked:bg-emerald-600 peer-checked:text-white"
                  htmlFor="inProgress"
                >
                  <span className="mt-2 font-medium">IN PROGRESS</span>
                </label>
              </div>
              <div className="relative">
                <input
                  className="peer hidden"
                  id="completed"
                  type="radio"
                  name="stage"
                  value="completed"
                  checked={projectStage === "completed"}
                  onChange={(e) => setProjectStage(e.target.value)}
                />
                <span className="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-emerald-400"></span>

                <label
                  className="flex h-full cursor-pointer flex-col rounded-lg p-4 shadow-lg shadow-slate-100 peer-checked:bg-emerald-600 peer-checked:text-white"
                  htmlFor="completed"
                >
                  <span className="mt-2 font-medium">COMPLETED</span>
                </label>
              </div>
            </div>
          </div>

          <div>
            <p className="mt-8 font-serif text-xl font-bold text-blue-900">
              Select Start Date
            </p>
            <div className="relative mt-4 w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaCalendarAlt className="h-5 w-5 text-gray-500" />
              </div>
              <DatePicker
                selected={selectedStartDate}
                onChange={(date) => setSelectedStartDate(date)}
                className="datepicker-input block w-full rounded-lg border border-emerald-300 bg-emerald-50 p-2.5 pl-10 text-emerald-800 outline-none ring-opacity-30 focus:ring focus:ring-emerald-300"
                placeholderText="Select start date"
                dateFormat="dd/MM/yyyy"
                locale="en-GB"
              />
            </div>
          </div>

          <div>
            <p className="mt-8 font-serif text-xl font-bold text-blue-900">
              Select End Date
            </p>
            <div className="relative mt-4 w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaCalendarAlt className="h-5 w-5 text-gray-500" />
              </div>
              <DatePicker
                selected={selectedEndDate}
                onChange={(date) => setSelectedEndDate(date)}
                className="datepicker-input block w-full rounded-lg border border-emerald-300 bg-emerald-50 p-2.5 pl-10 text-emerald-800 outline-none ring-opacity-30 focus:ring focus:ring-emerald-300"
                placeholderText="Select end date"
                dateFormat="dd/MM/yyyy"
                locale="en-GB"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="mr-4 w-32 rounded-full border-8 border-emerald-500 bg-emerald-600 px-6 py-3 text-lg font-bold text-white transition hover:translate-y-1"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="w-32 rounded-full border-8 border-gray-300 bg-gray-200 px-6 py-3 text-lg font-bold text-gray-700 transition hover:translate-y-1"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addd;
