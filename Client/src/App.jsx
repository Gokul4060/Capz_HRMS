import { Transition } from "@headlessui/react";
import clsx from "clsx";
import { Fragment, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import Login from "./Pages/Auth/Login";
import { setOpenSidebar } from "./redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Landing from "./Pages/Landing";
import AdminDashboard from "./Pages/Dashboards/adminDashboard";
import UserManagement from "./Pages/Mainpages/AdminMain/Adduser/allEmployees";
import Attendance from "./Pages/Mainpages//Attendance/Attendance";
import AdminAttendanceUpdate from "./Pages/Mainpages/AdminMain/adminAttendance";
import PROFILE from "./Pages/Profile/profile";
import ManagerAttendance from "./Pages/Mainpages/Attendance/managerAttendance";
import DeveloperDashboard from "./Pages/Dashboards/developerDashboard";
import ManagerDashboard from "./Pages/Dashboards/managerDashboard";
import ManagerRecords from "./Pages/Mainpages/Leave/Manager/managerRecords";
import UserManage from "./Pages/Mainpages/AdminMain/userManagement";
import Leave from "./Pages/Mainpages/Leave/leave";
import CreateTask from "./Pages/Tasks/task";
import TimeSheet from "./Pages/Timesheet/timeSheet";
import TimeSheetget from "./Pages/Mainpages/AdminMain/TimeSheet/timesheetget";
import DemoDash from "./Pages/demo/demoDash";
import TimeDetails from "./Pages/Timesheet/infoTime"

function Layout() {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  return user ? (
    <div className="w-full h-screen flex flex-col md:flex-row">
      <div className="w-1/5 h-screen bg-white sticky top-0 hidden md:block">
        <Sidebar />
      </div>

      <MobileSidebar />

      <div className="flex-1 overflow-y-auto">
        <Navbar />

        <div className="p-4 2xl:px-10">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/log-in" state={{ from: location }} replace />
  );
}

const MobileSidebar = () => {
  const { isSidebarOpen } = useSelector((state) => state.auth);
  const mobileMenuRef = useRef(null);
  const dispatch = useDispatch();

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  return (
    <>
      <Transition
        show={isSidebarOpen}
        as={Fragment}
        enter="transition-opacity duration-700"
        enterFrom="opacity-x-10"
        enterTo="opacity-x-100"
        leave="transition-opacity duration-700"
        leaveFrom="opacity-x-100"
        leaveTo="opacity-x-0"
      >
        {(ref) => (
          <div
            ref={(node) => (mobileMenuRef.current = node)}
            className={clsx(
              "md:hidden w-full h-full bg-black/40 transition-all duration-700 transform ",
              isSidebarOpen ? "translate-x-0" : "translate-x-full"
            )}
            onClick={() => closeSidebar()}
          >
            <div className="bg-white w-3/4 h-full">
              <div className="w-full flex justify-end px-5 mt-5">
                <button
                  onClick={() => closeSidebar()}
                  className="flex justify-end items-end"
                >
                  <IoClose size={25} />
                </button>
              </div>

              <div className="-mt-10">
                <Sidebar />
              </div>
            </div>
          </div>
        )}
      </Transition>
    </>
  );
};

function App() {
  return (
    <main className="w-full min-h-screen bg-[#f3f4f6]">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/log-in" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<Layout />}>
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/developerDashboard" element={<DeveloperDashboard />} />
          <Route path="/ManagerDashboard" element={<ManagerDashboard />} />
          <Route path="/userManagement" element={<UserManagement />} />
          <Route path="/userManage" element={<UserManage />} />
          {/* Attendance Routes */}
          <Route path="/attendance" element={<Attendance />} />
          <Route
            path="/attendance/:admin"
            element={<AdminAttendanceUpdate />}
          />
          <Route path="/manager/:attendance" element={<ManagerAttendance />} />
          <Route path="/leavereq" element={<ManagerRecords />} />
          <Route path="/leave" element={<Leave />} />
          {/*Tasks Route */}
          <Route path="/tasks" element={<CreateTask />} />
          {/*Timesheet Route */}
          <Route path="/timesheet" element={<TimeSheet />} />
          <Route path="/timeget" element={<TimeSheetget />} />
          <Route path="/timesheet/:details" element={<TimeDetails />} />

          {/*profile Route */}
          <Route path="/profile" element={<PROFILE />} />
          <Route path="/demodash" element={<DemoDash />} />
        </Route>
      </Routes>

      <Toaster richColors />
    </main>
  );
}

export default App;
