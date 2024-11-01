
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import {
  FaProjectDiagram,
  FaCheckCircle,
  FaTasks,
  FaExclamationCircle,
} from "react-icons/fa";
import ProjectCard from "./ProjectCard";
import {
  useCreateProjectMutation, 
} from "../../../../redux/slices/api/projectApiSlice";
import { useGetManagerQuery } from "../../../../redux/slices/api/projectApiSlice";

const Project = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();
  const [showForm, setShowForm] = useState(false);

  const [createProject, { isLoading: isCreating }] = useCreateProjectMutation();
  const { data: projectResponse = {}, refetch } = useGetProjectQuery();
  const projects = projectResponse.data || []; // Ensure it's always an array

  const { data: users = [], isLoading: isUsersLoading } = useGetManagerQuery();

  const toggleForm = () => setShowForm(!showForm);

  const onSubmit = async (data) => {
    try {
      await createProject(data).unwrap();
      reset();
      refetch(); // Refetch projects after creation
      setShowForm(false);
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  };

useEffect(() => {
  if (users.length > 0) {
    console.log(users); // Check the structure of the users object
  }
}, [users]);

const userOptions = users
  .filter((user) => user.role && user.role.toLowerCase() === "manager") // Check for role and filter by "manager"
  .map((user) => ({
    value: user._id,
    label: user.name,
  }));


  const handleAssignedToChange = (selectedOptions) => {
    const selectedUsers = selectedOptions
      ? selectedOptions.map((opt) => opt.value)
      : [];
    setValue("assignedTo", selectedUsers);
  };

  if (isUsersLoading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="container mx-auto p-6 rounded-lg">
        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-indigo-100 p-4 rounded-lg shadow-lg flex items-center">
            <FaProjectDiagram className="h-10 w-10 text-indigo-600" />
            <div className="ml-4">
              <h2 className="text-lg font-bold text-indigo-600">
                Total Projects
              </h2>
              <p className="text-2xl font-semibold mt-2">01</p>
            </div>
          </div>
          <div className="bg-green-100 p-4 rounded-lg shadow-lg flex items-center">
            <FaCheckCircle className="h-10 w-10 text-green-600" />
            <div className="ml-4">
              <h2 className="text-lg font-bold text-green-600">
                Completed Projects
              </h2>
              <p className="text-2xl font-semibold mt-2">0</p>
            </div>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg shadow-lg flex items-center">
            <FaTasks className="h-10 w-10 text-yellow-600" />
            <div className="ml-4">
              <h2 className="text-lg font-bold text-yellow-600">
                Ongoing Projects
              </h2>
              <p className="text-2xl font-semibold mt-2">0</p>
            </div>
          </div>
          <div className="bg-red-100 p-4 rounded-lg shadow-lg flex items-center">
            <FaExclamationCircle className="h-10 w-10 text-red-600" />
            <div className="ml-4">
              <h2 className="text-lg font-bold text-red-600">
                Pending Approvals
              </h2>
              <p className="text-2xl font-semibold mt-2">0</p>
            </div>
          </div>
        </div>

        {/* Form Toggle and Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Projects</h1>
          <button
            onClick={toggleForm}
            className="py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            {showForm ? "Close Form" : "Create Project"}
          </button>
        </div>

        {/* Project Creation Form */}
        {showForm && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-4 mb-6"
          >
            <div>
              <label className="block text-sm font-medium">Project Title</label>
              <input
                type="text"
                {...register("projectTitle", { required: true })}
                className="mt-1 w-full border px-3 py-2 rounded-md"
                placeholder="Enter project title"
              />
              {errors.projectTitle && (
                <span className="text-red-500">Project title is required</span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">Created Date</label>
              <input
                type="date"
                {...register("createdDate", { required: true })}
                className="mt-1 w-full border px-3 py-2 rounded-md"
              />
              {errors.createdDate && (
                <span className="text-red-500">Created date is required</span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">
                Priority Level
              </label>
              <select
                {...register("priorityLevel", { required: true })}
                className="mt-1 w-full border px-3 py-2 rounded-md"
              >
                <option value="">Select priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              {errors.priorityLevel && (
                <span className="text-red-500">Priority level is required</span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">Status</label>
              <select
                {...register("status", { required: true })}
                className="mt-1 w-full border px-3 py-2 rounded-md"
              >
                <option value="">Select status</option>
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              {errors.status && (
                <span className="text-red-500">Status is required</span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">Assigned To</label>
              <Select
                isMulti
                options={userOptions}
                onChange={handleAssignedToChange}
                placeholder="Select users..."
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium">Description</label>
              <textarea
                {...register("description", { required: true })}
                rows="4"
                className="mt-1 w-full border px-3 py-2 rounded-md"
                placeholder="Enter project description"
              />
              {errors.description && (
                <span className="text-red-500">Description is required</span>
              )}
            </div>

            <div className="col-span-2 flex justify-end">
              <button
                type="submit"
                className="py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                disabled={isCreating}
              >
                {isCreating ? "Creating..." : "Create Project"}
              </button>
            </div>
          </form>
        )}
        <div>
          <ProjectCard projects={projects} />
        </div>
      </div>
    </div>
  );
};

export default Project;
