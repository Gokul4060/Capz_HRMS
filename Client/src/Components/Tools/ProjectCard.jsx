import clsx from "clsx";
import React, { useState } from "react";
import {
  MdAttachFile,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { useSelector } from "react-redux";
import {
  BGS,
  PRIOTITYSTYELS,
  PROJECT_TYPE,
  formatDate,
} from "../../utils/index";
import ProjectDialog from "../Layout/Project/ProjectDialog";
import { BiMessageAltDetail } from "react-icons/bi";
import { FaList } from "react-icons/fa";
import UserInfo from "../Layout/UserInfo";
import { IoMdAdd } from "react-icons/io";
import AddSubProject from "../Layout/Project/AddTask";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const ProjectCard = ({ project }) => {
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="w-full h-fit bg-white shadow-md p-4 rounded">
        <div className="w-full flex justify-between">
          <div
            className={clsx(
              "flex flex-1 gap-1 items-center text-sm font-medium",
              PRIOTITYSTYELS[project?.priority]
            )}
          >
            <span className="text-lg">{ICONS[project?.priority]}</span>
            <span className="uppercase">{project?.priority} Priority</span>
          </div>
          {user?.isManager && <ProjectDialog project={project} />}{" "}
          {/* Changed isAdmin to isManager */}
        </div>

        <>
          <div className="flex items-center gap-2">
            <div
              className={clsx(
                "w-4 h-4 rounded-full",
                PROJECT_TYPE[project.stage]
              )}
            />
            <h4 className="line-clamp-1 text-black">{project?.title}</h4>{" "}
          </div>
          <span className="text-sm text-gray-600">
            {formatDate(new Date(project?.startDate))} -{" "}
            {formatDate(new Date(project?.endDate))}
          </span>
        </>

        <div className="w-full border-t border-gray-200 my-2" />
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="flex gap-1 items-center text-sm text-gray-600">
              <BiMessageAltDetail />
              <span>{project?.activities?.length}</span>
            </div>
            <div className="flex gap-1 items-center text-sm text-gray-600 ">
              <MdAttachFile />
              <span>{project?.assets?.length}</span>
            </div>
            <div className="flex gap-1 items-center text-sm text-gray-600 ">
              <FaList />
              <span>0/{project?.subProjects?.length}</span>
            </div>
          </div>

          <div className="flex flex-row-reverse">
            {project?.team?.map((m, index) => (
              <div
                key={index}
                className={clsx(
                  "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                  BGS[index % BGS?.length]
                )}
              >
                <UserInfo user={m} />
              </div>
            ))}
          </div>
        </div>

        {project?.subProjects?.length > 0 ? (
          <div className="py-4 border-t border-gray-200">
            <h5 className="text-base line-clamp-1 text-black">
              {project?.subProjects[0].title}
            </h5>

            <div className="p-4 space-x-8">
              <span className="text-sm text-gray-600">
                {formatDate(new Date(project?.subProjects[0]?.startDate))} -{" "}
                {formatDate(new Date(project?.subProjects[0]?.endDate))}
              </span>
              <span className="bg-blue-600/10 px-3 py-1 rounded-full text-blue-700 font-medium">
                {project?.subProjects[0].tag}
              </span>
            </div>
          </div>
        ) : (
          <div className="py-4 border-t border-gray-200">
            <span className="text-gray-500">No Tasks</span>
          </div>
        )}

        <div className="w-full pb-2">
          <button
            onClick={() => setOpen(true)}
            disabled={user.isManager ? false : true} // Changed isAdmin to isManager
            className="w-full flex gap-4 items-center text-sm text-gray-500 font-semibold disabled:cursor-not-allowed disabled::text-gray-300"
          >
            <IoMdAdd className="text-lg" />
            <span>ADD Task</span>
          </button>
        </div>
      </div>
      <AddSubProject open={open} setOpen={setOpen} id={project._id} />
    </>
  );
};

export default ProjectCard;
