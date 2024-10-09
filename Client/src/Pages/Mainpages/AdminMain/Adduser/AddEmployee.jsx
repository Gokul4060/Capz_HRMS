import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Textbox from "../../../../Components/Tools/Textbox";
import Loading from "../../../../Components/Tools/Loader";
import Button from "../../../../Components/Tools/Button";
import { toast } from "sonner";
import { useRegisterMutation } from "../../../../redux/slices/api/authApiSlice";
import { useUpdateUserMutation } from "../../../../redux/slices/api/userApiSlice";

const AddEmployee = ({ userData }) => {
  let defaultValues = userData ?? {};
  const { user } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const dispatch = useDispatch();
  const [addNewUser, { isLoading }] = useRegisterMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const handleOnSubmit = async (data) => {
    try {
      // Reset all role fields to false
      data.isAdmin = false;
      data.isManager = false;
      data.isDeveloper = false;

      // Set the correct role field based on the selected role
      switch (data.role) {
        case "Admin":
          data.isAdmin = true;
          break;
        case "Manager":
          data.isManager = true;
          break;
        case "Developer":
          data.isDeveloper = true;
          break;
        default:
          break;
      }

      // Proceed with either adding a new user or updating an existing user
      if (userData) {
        // Update the user profile
        const result = await updateUser({
          ...data,
          _id: userData._id,
        }).unwrap();
        toast.success("Profile updated successfully");

        // Update the local user data if updating current user
        if (userData._id === user._id) {
          dispatch(setCredentials({ ...result.user }));
        }
      } else {
        // Register a new user
        await addNewUser({ ...data, password: data.password }).unwrap();
        toast.success("New User added successfully");
      }

      // Reload the page and close the form
      window.location.reload();
      setTimeout(() => {
        setOpen(false);
      }, 1500);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

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
              <option value="Developer">Developer</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
            )}
          </div>
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
