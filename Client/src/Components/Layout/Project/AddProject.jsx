import React, { useState } from "react";
import ModalWrapper from "../../Tools/ModalWrape.jsx";
import { Dialog } from "@headlessui/react";
import Textbox from "../../Tools/Textbox.jsx";
import { useForm } from "react-hook-form";
import UserList from "../../Layout/Project/UserList.jsx";
import SelectList from "../../Tools/SelectList.jsx";
import { BiImages } from "react-icons/bi";
import Button from "../../Tools/Button.jsx";
import {
  useCreateProjectMutation,
  useUpdateProjectMutation,
} from "../../../redux/slices/api/projectApiSlice.js";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../../Pages/Profile/subProfile/config.js";
import { toast } from "sonner";
import { dateFormatter } from "../../../utils/index.js";

const STAGES = ["PLANNING", "IN PROGRESS", "COMPLETED"]; // Updated for project stages
const PRIORITIES = ["HIGH", "MEDIUM", "NORMAL", "LOW"];

const uploadedFileURLs = [];

const AddProject = ({ open, setOpen, project }) => {
  const defaultValues = {
    title: project?.title || "",
    startDate: dateFormatter(project?.startDate || new Date()),
    endDate: dateFormatter(project?.endDate || new Date()),
    team: [],
    stage: "",
    priority: "",
    assets: [],
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });
  const [team, setTeam] = useState(project?.team || []);
  const [stage, setStage] = useState(
    project?.stage?.toUpperCase() || STAGES[0]
  );
  const [priority, setPriority] = useState(
    project?.priority?.toUpperCase() || PRIORITIES[2]
  );
  const [assets, setAssets] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [createProject, { isLoading }] = useCreateProjectMutation();
  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();
  const URLS = project?.assets ? [...project.assets] : [];

  const submitHandler = async (data) => {
    for (const file of assets) {
      setUploading(true);
      try {
        await uploadFile(file);
      } catch (error) {
        console.error("Error uploading file:", error.message);
        return;
      } finally {
        setUploading(false);
      }
    }

    try {
      const newData = {
        ...data,
        assets: [...URLS, ...uploadedFileURLs],
        team,
        stage,
        priority,
      };

      const res = project?._id
        ? await updateProject({ ...newData, _id: project._id }).unwrap()
        : await createProject(newData).unwrap();

      toast.success(res.message);

      setTimeout(() => {
        setOpen(false);
      }, 500);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleSelect = (e) => {
    setAssets(e.target.files);
  };

  const uploadFile = async (file) => {
    const storage = getStorage(app);
    const name = new Date().getTime() + file.name;
    const storageRef = ref(storage, name);

    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          console.log("Uploading");
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              uploadedFileURLs.push(downloadURL);
              resolve();
            })
            .catch((error) => {
              reject(error);
            });
        }
      );
    });
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <Dialog.Title
            as="h2"
            className="text-base font-bold leading-6 text-gray-900 mb-4 "
          >
            {project ? "UPDATE PROJECT" : "ADD PROJECT"}{" "}
            {/* Updated for project */}
          </Dialog.Title>

          <div className="mt-2 flex flex-col gap-6">
            <Textbox
              placeholder="Project Title"
              type="text"
              name="title"
              label="Project Title"
              className="w-full rounded"
              register={register("title", { required: "Title is required" })}
              error={errors.title ? errors.title.message : ""}
            />

            <UserList setTeam={setTeam} team={team} />

            <div className="flex gap-4">
              <SelectList
                label="Project Stage"
                lists={STAGES} // Updated for project stages
                selected={stage}
                setSelected={setStage}
              />

              <div className="w-full">
                <Textbox
                  placeholder="Start Date"
                  type="date"
                  name="startDate"
                  label="Start Date"
                  className="w-full rounded"
                  register={register("startDate", {
                    required: "Start Date is required!",
                  })}
                  error={errors.startDate ? errors.startDate.message : ""}
                />
              </div>

              <div className="w-full">
                <Textbox
                  placeholder="End Date"
                  type="date"
                  name="endDate"
                  label="End Date"
                  className="w-full rounded"
                  register={register("endDate", {
                    required: "End Date is required!",
                  })}
                  error={errors.endDate ? errors.endDate.message : ""}
                />
              </div>
            </div>

            <div className="flex gap-4">
              <SelectList
                label="Priority Level"
                lists={PRIORITIES}
                selected={priority}
                setSelected={setPriority}
              />

              <div className="w-full flex items-center justify-center mt-4">
                <label
                  className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer my-4"
                  htmlFor="imgUpload"
                >
                  <input
                    type="file"
                    className="hidden"
                    id="imgUpload"
                    onChange={(e) => handleSelect(e)}
                    accept=".jpg, .png, .jpeg"
                    multiple={true}
                  />
                  <BiImages />
                  <span>Add Assets</span>
                </label>
              </div>
            </div>

            <div className="bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4">
              {uploading ? (
                <span className="text-sm py-2 text-red-500">
                  Uploading assets
                </span>
              ) : (
                <Button
                  label="Submit"
                  type="submit"
                  className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto"
                />
              )}

              <Button
                type="button"
                className="bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto"
                onClick={() => setOpen(false)}
                label="Cancel"
              />
            </div>
          </div>
        </form>
      </ModalWrapper>
    </>
  );
};

export default AddProject;
