import React, { useState } from "react";
import Title from "../../../../Components/Tools/Button";
import Button from "../../../../Components/Tools/Button";
import { getInitials } from "../../../../utils";
import clsx from "clsx";
import ConfirmatioDialog, {
  UserAction,
} from "../../../../Components/Tools/Dialogs";
import {
  useDeleteUserMutation,
  useGetEmployeeListQuery,
  useUserActionMutation,
} from "../../../../redux/slices/api/userApiSlice";
import { toast } from "sonner";
import AddEmployee from "./AddEmployee";

const AllEmployees = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openAction, setOpenAction] = useState(false);
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const { data, isLoading, refetch } = useGetEmployeeListQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [userAction] = useUserActionMutation();

  const userActionHandler = async () => {
    try {
      const result = await userAction({
        isActive: !selected?.isActive,
        id: selected?._id,
      });

      refetch();
      toast.success(result.data.message);
      setSelected(null);
      setTimeout(() => {
        setOpenAction(false);
      }, 500);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error);
    }
  };

  const deleteHandler = async () => {
    try {
      const result = await deleteUser(selected);

      refetch();
      toast.success("Deleted Successfully");
      setSelected(null);

      setTimeout(() => {
        setOpenDialog(false);
      }, 500);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error);
    }
  };

  const deleteClick = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };

  const editClick = (el) => {
    setSelected(el);
    setShowForm(true);
  };

  const userStatusClick = (el) => {
    setSelected(el);
    setOpenAction(true);
  };

  const TableHeader = () => (
    <thead className="bg-customplam rounded-lg">
      <tr className="text-left text-sm font-medium text-white">
        <th className="py-4 px-6">Full Name</th>
        <th className="py-4 px-6">Title</th>
        <th className="py-4 px-6">Email</th>
        <th className="py-4 px-6">Role</th>
        <th className="py-4 px-6">Status</th>
        <th className="py-4 px-6">Action</th>
      </tr>
    </thead>
  );

  const TableRow = ({ user }) => (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150">
      <td className="py-4 px-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-customplam text-white">
            <span className="text-sm font-medium">
              {getInitials(user.name)}
            </span>
          </div>
          <span className="text-gray-900 font-medium">
            {user.name || "No Name Provided"}
          </span>
        </div>
      </td>
      <td className="py-4 px-6 text-gray-700">{user.title}</td>
      <td className="py-4 px-6 text-gray-700">
        {user.email || "No Email Provided"}
      </td>
      <td className="py-4 px-6 text-gray-700">{user.role}</td>
      <td className="py-4 px-6">
        <button
          onClick={() => userStatusClick(user)}
          className={clsx(
            "w-fit px-4 py-2 rounded-full text-sm font-semibold",
            user?.isActive
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          )}
        >
          {user?.isActive ? "Active" : "Disabled"}
        </button>
      </td>
      <td className="py-4 px-6 flex gap-2">
        <Button
          className="text-green-600 hover:text-green-500 font-semibold"
          label="Edit"
          type="button"
          onClick={() => editClick(user)}
        />
        <Button
          className="text-red-600 hover:text-red-500 font-semibold"
          label="Delete"
          type="button"
          onClick={() => deleteClick(user?._id)}
        />
      </td>
    </tr>
  );

  return (
    <>
      <div className="w-full mb-6">
        <div className="bg-white px-8 py-6 shadow-lg rounded-lg">
          <div className="flex items-center justify-between mb-6">
            <Title title="User Management" />
            <Button
              label="Add Employee"
              onClick={() => setShowForm(!showForm)}
              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 rounded-lg px-4 py-2"
            />
          </div>
          {showForm && (
            <div className="mt-6">
              <AddEmployee userData={selected} />
            </div>
          )}
          <div className="bg-white rounded-lg mt-6">
            <div className="overflow-x-auto">
              <h1 className="text-xl font-bold leading-6 text-gray-900 mb-4 mt-5">
                Added Employees
              </h1>
              <table className="w-full rounded-lg shadow">
                <TableHeader />
                <tbody>
                  {data?.map((user, index) => (
                    <TableRow key={index} user={user} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />

      <UserAction
        open={openAction}
        setOpen={setOpenAction}
        onClick={userActionHandler}
      />
    </>
  );
};

export default AllEmployees;
