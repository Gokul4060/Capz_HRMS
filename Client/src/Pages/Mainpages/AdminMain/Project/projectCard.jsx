import React from "react";

const ProjectCard = ({ projects }) => {
  if (!Array.isArray(projects) || projects.length === 0) {
    return <div>No projects found.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <div
          key={project._id}
          className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-bold mb-2">{project.projectTitle}</h2>
          <p className="text-sm text-gray-600 mb-4">
            Created on: {new Date(project.createdDate).toLocaleDateString()}
          </p>
          <p className="text-sm mb-2">Priority: {project.priorityLevel}</p>
          <p className="text-sm mb-2">Status: {project.status}</p>
          <p className="text-sm mb-2">
            Assigned To: {project.assignedTo && project.assignedTo.join(", ")}
          </p>
          <p className="text-sm text-gray-700">{project.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ProjectCard;
