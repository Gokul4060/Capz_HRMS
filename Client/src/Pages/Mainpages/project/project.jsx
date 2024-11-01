import React, { useState } from "react";
import { FaList } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import { useParams } from "react-router-dom";
import Loading from "../../../Components/Tools/Loader";
import Title from "../../../Components/Tools/Title";
import Button from "../../../Components/Tools/Button";
import { IoMdAdd } from "react-icons/io";
import Tabs from "../../../Components/Tools/Tabs";
import ProjectTitle from "../../../Components/Tools/ProjectTitle";
import BoardView from "../../../Components/Tools/BoardView";
import { useGetAllProjectsQuery } from "../../../redux/slices/api/projectApiSlice"; // Use project API
import Table from "../../../Components/Layout/Project/Table"; // Updated to project table
import AddProject from "../../../Components/Layout/Project/AddProject"; // Updated to project form
import {
  FaLaptop,
  FaFilePen,
  FaBars,
  FaFileCircleCheck,
  FaFileCircleExclamation,
} from "react-icons/fa6";

const TABS = [
  { title: "Board View", icon: <MdGridView /> },
  { title: "List View", icon: <FaList /> },
];

const MAINTAB = [
  { title: "Project", icon: <FaLaptop /> },
  { title: "Task", icon: <FaBars /> },
  { title: "Todo", icon: <FaFilePen /> },
  { title: "Completed", icon: <FaFileCircleCheck /> },
  { title: "In progress", icon: <FaFileCircleExclamation /> },
];

const PROJECT_TYPE = {
  todo: "bg-blue-600",
  "in progress": "bg-yellow-600",
  completed: "bg-green-600",
};

const Projects = () => {
  const params = useParams();

  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const status = params?.status || "";
  const { data, isLoading } = useGetAllProjectsQuery({
    strQuery: status,
    isTrashed: "",
    search: "",
  });

  return isLoading ? (
    <div className="py-10">
      <Loading />
    </div>
  ) : (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <Title title={status ? `${status} Projects` : "Projects"} />

        {!status && (
          <Button
            onClick={() => setOpen(true)}
            label="Create Project"
            icon={<IoMdAdd className="text-lg" />}
            className="flex flex-row-reverse gap-1 items-center bg-green-600 text-white rounded-md py-2 2xl:py-2.5"
          />
        )}
      </div>

      <Tabs tabs={TABS} setSelected={setSelected}>
        {!status && (
          <div className="w-full flex justify-between gap-4 md:gap-x-12 py-4">
            <ProjectTitle label="To Do" className={PROJECT_TYPE.todo} />
            <ProjectTitle
              label="In Progress"
              className={PROJECT_TYPE["in progress"]}
            />
            <ProjectTitle
              label="Completed"
              className={PROJECT_TYPE.completed}
            />
          </div>
        )}

        {selected !== 1 ? (
          <BoardView projects={data?.projects} />
        ) : (
          <div className="w-full">
            <Table projects={data?.projects} />
          </div>
        )}
      </Tabs>

      <AddProject open={open} setOpen={setOpen} />
    </div>
  );
};

export default Projects;
