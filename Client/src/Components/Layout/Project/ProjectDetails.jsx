import clsx from "clsx";
import moment from "moment";
import React, { useState } from "react";
import { FaBug, FaProjectDiagram, FaThumbsUp, FaUser } from "react-icons/fa"; // Updated to project-related icons
import { GrInProgress } from "react-icons/gr";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdOutlineDoneAll,
  MdOutlineMessage,
  MdTaskAlt,
} from "react-icons/md";
import { usePostProjectActivityMutation, useGetSingleProjectQuery  } from "../../../redux/slices/api/projectApiSlice"
import { RxActivityLog } from "react-icons/rx";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { projects } from "../../../assets/data"; // Updated to projects
import Tabs from "../../Tools/Tabs";
import { PRIOTITYSTYELS, PROJECT_TYPE, getInitials } from "../../../utils/index"; // Updated to PROJECT_TYPE
import Loading from "../../Tools/Loader";
import Button from "../../Tools/Button";

const assets = [
  "https://images.pexels.com/photos/2418664/pexels-photo-2418664.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/8797307/pexels-photo-8797307.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/2534523/pexels-photo-2534523.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/804049/pexels-photo-804049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
];

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const bgColor = {
  high: "bg-red-200",
  medium: "bg-yellow-200",
  low: "bg-blue-200",
};

const TABS = [
  { title: "Project Detail", icon: <FaProjectDiagram /> }, // Updated for Project Detail
  { title: "Activities/Timeline", icon: <RxActivityLog /> },
];

const PROJECTTYPEICON = {
  commented: (
    <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white">
      <MdOutlineMessage />,
    </div>
  ),
  started: (
    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
      <FaThumbsUp size={20} />
    </div>
  ),
  assigned: (
    <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-500 text-white">
      <FaUser size={14} />
    </div>
  ),
  bug: (
    <div className="text-red-600">
      <FaBug size={24} />
    </div>
  ),
  completed: (
    <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white">
      <MdOutlineDoneAll size={24} />
    </div>
  ),
  "in progress": (
    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-violet-600 text-white">
      <GrInProgress size={16} />
    </div>
  ),
};

const act_types = [
  "Started",
  "Completed",
  "In Progress",
  "Commented",
  "Bug",
  "Assigned",
];

const ProjectDetails = () => {
  const { id } = useParams();
   const { data, isLoading, refetch } = useGetSingleProjectQuery(id);
  const [selected, setSelected] = useState(0);
  const project = data?.project; // Updated to project

  return (
    <div className="w-full flex flex-col gap-3 mb-4 overflow-y-hidden">
      <h1 className="text-2xl text-gray-600 font-bold">{project?.title}</h1>{" "}
      {/* Updated to project title */}
      <Tabs tabs={TABS} setSelected={setSelected}>
        {selected === 0 ? (
          <>
            <div className="w-full flex flex-col md:flex-row gap-5 2xl:gap-8 bg-white shadow-md p-8 overflow-y-auto">
              {/* LEFT */}
              <div className="w-full md:w-1/2 space-y-8">
                <div className="flex items-center gap-5">
                  <div
                    className={clsx(
                      "flex gap-1 items-center text-base font-semibold px-3 py-1 rounded-full",
                      PRIOTITYSTYELS[project?.priority], // Updated to project
                      bgColor[project?.priority]
                    )}
                  >
                    <span className="text-lg">{ICONS[project?.priority]}</span>
                    <span className="uppercase">
                      {project?.priority} Priority
                    </span>
                  </div>

                  <div className={clsx("flex items-center gap-2")}>
                    <div
                      className={clsx(
                        "w-4 h-4 rounded-full",
                        PROJECT_TYPE[project.stage] // Updated to project stage
                      )}
                    />
                    <span className="text-black uppercase">
                      {project?.stage}
                    </span>
                  </div>
                </div>

                <p className="text-gray-500">
                  Created At: {new Date(project?.createdAt).toDateString()}{" "}
                  {/* Updated to project creation date */}
                </p>

                <div className="flex items-center gap-8 p-4 border-y border-gray-200">
                  <div className="space-x-2">
                    <span className="font-semibold">Assets :</span>
                    <span>{project?.assets?.length}</span>{" "}
                    {/* Updated to project assets */}
                  </div>

                  <span className="text-gray-400">|</span>

                  <div className="space-x-2">
                    <span className="font-semibold">Sub-Projects :</span>{" "}
                    {/* Updated to sub-projects */}
                    <span>{project?.subProjects?.length}</span> {/* Updated */}
                  </div>
                </div>

                <div className="space-y-4 py-6">
                  <p className="text-gray-600 font-semibold test-sm">
                    PROJECT TEAM
                  </p>{" "}
                  {/* Updated */}
                  <div className="space-y-3">
                    {project?.team?.map((m, index) => (
                      <div
                        key={index}
                        className="flex gap-4 py-2 items-center border-t border-gray-200"
                      >
                        <div
                          className={
                            "w-10 h-10 rounded-full text-white flex items-center justify-center text-sm -mr-1 bg-blue-600"
                          }
                        >
                          <span className="text-center">
                            {getInitials(m?.name)}
                          </span>
                        </div>

                        <div>
                          <p className="text-lg font-semibold">{m?.name}</p>
                          <span className="text-gray-500">{m?.title}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 py-6">
                  <p className="text-gray-500 font-semibold text-sm">
                    Tasks
                  </p>{" "}
                  {/* Updated */}
                  <div className="space-y-8">
                    {project?.subProjects?.map(
                      (
                        el,
                        index // Updated to sub-projects
                      ) => (
                        <div key={index} className="flex gap-3">
                          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-violet-50-200">
                            <MdTaskAlt className="text-violet-600" size={26} />
                          </div>

                          <div className="space-y-1">
                            <div className="flex gap-2 items-center">
                              <span className="text-sm text-gray-500">
                                {new Date(el?.startDate).toDateString()}{" "}
                                {/* Updated to sub-project start date */}
                              </span>

                              <span className="px-2 py-0.5 text-center text-sm rounded-full bg-violet-100 text-violet-700 font-semibold">
                                {el?.tag}
                              </span>
                            </div>
                            <p className="text-gray-700">{el?.title}</p>{" "}
                            {/* Updated to sub-project title */}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
              {/* RIGHT */}
              <div className="w-full md:w-1/2 space-y-8">
                <p className="text-lg font-semibold">ASSETS</p>

                <div className="w-full grid grid-cols-2 gap-4">
                  {project?.assets?.map(
                    (
                      el,
                      index // Updated to project assets
                    ) => (
                      <img
                        key={index}
                        src={el}
                        alt={project?.title}
                        className="w-full rounded h-28 md:h-36 2xl:h-52 cursor-pointer transition-all duration-700 hover:scale-125 hover:z-50"
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <Activities activity={data?.activities} id={id} refetch={refetch}/>
            {/* Updated */}
          </>
        )}
      </Tabs>
    </div>
  );
};

const Activities = ({ activity, id, refetch }) => {
  const [selected, setSelected] = useState(act_types[0]);
  const [text, setText] = useState("");

  const [postActivity, {isLoading}] = usePostProjectActivityMutation();

  const handleSubmit = async () => {
    try {
        const activityData = {
          type: selected?.toLowerCase(),
          activity:text,
        }
        const result = await postActivity({
          data: activityData,
          id
        }).unwrap();
        console.log(result);
        setText("");
        toast.success(result?.message);
        refetch();
    } catch (error)   {
      console.log(error);
      toast.error(error?.data?.message || error.error);
    }
  };

  const Card = ({ item }) => {
    return (
      <div className="flex space-x-4">
        <div className="flex flex-col items-center flex-shrink-0">
          <div className="w-10 h-10 flex items-center justify-center">
            {PROJECTTYPEICON[item?.type]} {/* Updated to project type icons */}
          </div>
          <div className="w-full flex items-center">
            <div className="w-0.5 bg-gray-300 h-full"></div>
          </div>
        </div>

        <div className="flex flex-col gap-y-1 mb-8">
          <p className="font-semibold">{item?.by?.name}</p>
          <div className="text-gray-500 space-y-2">
            <span className="capitalize">{item?.type}</span>
            <span className="text-sm">{moment(item?.date).fromNow()}</span>
          </div>
          <div className="text-gray-700">{item?.activity}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full flex gap-10 2xl:gap-20 min-h-screen px-10 py-8 bg-white shadow rounded-md justify-between overflow-y-auto">
      <div className="w-full md:w-1/2">
        <h4 className="text-gray-600 font-semibold text-lg mb-5">Activities</h4>

        <div className="w-full">
          {activity?.map((el, index) => (
            <Card
              key={index}
              item={el}
              isConnected={index < activity.length - 1}
            />
          ))}
        </div>
      </div>

      <div className="w-full md:w-1/3">
        <h4 className="text-gray-600 font-semibold text-lg mb-5">
          Add Activity
        </h4>
        <div className="w-full flex flex-wrap gap-5">
          {act_types.map((item, index) => (
            <div key={item} className="flex gap-2 items-center">
              <input
                type="checkbox"
                className="w-4 h-4"
                checked={selected === item ? true : false}
                onChange={(e) => setSelected(item)}
              />
              <p>{item}</p>
            </div>
          ))}
          <textarea
            rows={10}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type ......"
            className="bg-white w-full mt-10 border border-gray-300 outline-none p-4 rounded-md focus:ring-2 ring-blue-500"
          ></textarea>
          {isLoading ? (
            <Loading />
          ) : (
            <Button
              type="button"
              label="Submit"
              onClick={handleSubmit}
              className="bg-blue-600 text-white rounded"
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default ProjectDetails;
