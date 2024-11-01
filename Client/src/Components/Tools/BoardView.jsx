import React from "react";
import ProjectCard from "./ProjectCard"; // Updated to ProjectCard

const BoardView = ({ projects }) => {
  // Changed tasks to projects
  return (
    <div className="w-full py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 2xl:gap-10">
      {projects.map(
        (
          project,
          index // Updated to projects
        ) => (
          <ProjectCard project={project} key={index} /> // Updated to ProjectCard
        )
      )}
    </div>
  );
};

export default BoardView;
