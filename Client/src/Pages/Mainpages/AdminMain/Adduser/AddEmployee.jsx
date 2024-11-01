import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Textbox from "../../../../Components/Tools/Textbox";
import Loading from "../../../../Components/Tools/Loader";
import Button from "../../../../Components/Tools/Button";
import { toast } from "sonner";
import { useRegisterMutation } from "../../../../redux/slices/api/authApiSlice";
import {
  useUpdateUserMutation,
  useGetApproversQuery,
} from "../../../../redux/slices/api/userApiSlice";

const AddEmployee = ({ userData }) => {
  let defaultValues = userData ?? {};
  const { user } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ defaultValues });

  const dispatch = useDispatch();
  const [addNewUser, { isLoading }] = useRegisterMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();


  const {
    data: approversData,
    isLoading: isApproversLoading,
    error: approversError,
  } = useGetApproversQuery();
  const approvers = approversData?.approvers || []; 

  const handleOnSubmit = async (data) => {
    try {
      const employeeID = `${data.employeeIdCode}${data.employeeIdNumber}`;

      data.isAdmin = false;
      data.isManager = false;
      data.isEmployee = false;

      switch (data.role) {
        case "Admin":
          data.isAdmin = true;
          break;
        case "Manager":
          data.isManager = true;
          break;
        case "Employee":
          data.isEmployee = true;
          break;
        default:
          break;
      }

      if (userData) {
        const result = await updateUser({
          ...data,
          employeeID,
          _id: userData._id,
        }).unwrap();
        toast.success("Profile updated successfully");

        if (userData._id === user._id) {
          dispatch(setCredentials({ ...result.user }));
        }
      } else {
        await addNewUser({
          ...data,
          employeeID,
          password: data.password,
        }).unwrap();
        toast.success("New User added successfully");
      }

      window.location.reload();
      setTimeout(() => {
        setOpen(false);
      }, 1500);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const selectedRole = watch("role");

  return (
    <div className="space-y-8 p-6">
      <form onSubmit={handleSubmit(handleOnSubmit)} className="">
        <div className="text-base font-bold leading-6 text-gray-900 mb-4">
          {userData ? "UPDATE PROFILE" : "Create new Account"}
        </div>
        <div className="mt-2 grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 bg-white p-8 rounded">
          <Textbox
            placeholder="Full name"
            type="text"
            name="name"
            label="Full Name"
            className="w-full rounded-2xl"
            register={register("name", {
              required: "Full name is required!",
            })}
            error={errors.name ? errors.name.message : ""}
          />
          <Textbox
            placeholder="Title"
            type="text"
            name="title"
            label="Title"
            className="w-full rounded-2xl"
            register={register("title", {
              required: "Title is required!",
            })}
            error={errors.title ? errors.title.message : ""}
          />
          <Textbox
            placeholder="Email Address"
            type="email"
            name="email"
            label="Email id"
            className="w-full rounded-2xl"
            register={register("email", {
              required: "Email Address is required!",
            })}
            error={errors.email ? errors.email.message : ""}
          />
          {/* Employee ID Input with left selector and right number input */}
          <div className="w-full rounded-2xl">
            <label className="block text-sm font-medium text-gray-700">
              ID
            </label>
            <div className="flex">
              <select
                name="employeeIdCode"
                className="block w-1/3 rounded-l-2xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register("employeeIdCode", {
                  required: !userData ? "Employee ID code is required!" : false,
                })}
              >
                <option value="">Select ID Code</option>
                <option value="AM">AM</option>
                <option value="M">M</option>
                <option value="EM">EM</option>
              </select>
              <input
                type="number"
                placeholder="ID Number"
                className="w-2/3 rounded-r-2xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register("employeeIdNumber", {
                  required: !userData
                    ? "Employee ID number is required!"
                    : false,
                })}
              />
            </div>
            {errors.employeeIdCode && (
              <p className="text-red-500 text-sm mt-1">
                {errors.employeeIdCode.message}
              </p>
            )}
            {errors.employeeIdNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.employeeIdNumber.message}
              </p>
            )}
          </div>
          {/* Role Selector */}
          <div className="w-full rounded-2xl">
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              name="role"
              className="w-full mt-1 block rounded-2xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              {...register("role", { required: "User role is required!" })}
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Employee">Employee</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
            )}
          </div>
          {/* Reporting Manager Selector - Enabled only for Employee role */}
          {selectedRole === "Employee" && (
            <div className="w-full rounded-2xl">
              <label className="block text-sm font-medium text-gray-700">
                Reporting Manager
              </label>
              {isApproversLoading ? (
                <Loading />
              ) : approversError ? (
                <p className="text-red-500">Failed to load managers</p>
              ) : (
                <select
                  name="reportingManager"
                  className="w-full mt-1 block rounded-2xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  {...register("reportingManager", {
                    required: "Reporting Manager is required for employees!",
                  })}
                >
                  <option value="">Select Reporting Manager</option>
                  {approvers.map((manager) => (
                    <option key={manager._id} value={manager._id}>
                      {manager.name}
                    </option>
                  ))}
                </select>
              )}
              {errors.reportingManager && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.reportingManager.message}
                </p>
              )}
            </div>
          )}
          {!userData && (
            <Textbox
              placeholder="Password"
              type="password"
              name="password"
              label="Password"
              className="w-full rounded-2xl"
              register={register("password", {
                required: "Password is required!",
              })}
              error={errors.password ? errors.password.message : ""}
            />
          )}
        </div>
        {isLoading || isUpdating ? (
          <div className="py-5">
            <Loading />
          </div>
        ) : (
          <div className="py-3 mt-4 text-center sm:flex sm:flex-row-reverse">
            <Button
              type="submit"
              className="bg-customplam px-8 text-sm font-semibold text-white bg-green-500 hover:bg-green-700 sm:w-auto rounded-2xl"
              label={userData ? "Update" : "Add"}
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default AddEmployee;
