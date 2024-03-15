import React from "react";

// Admin Imports
import MainDashboard from "./AdminComponents/Main/views/admin/default";
import NFTMarketplace from "./AdminComponents/Main/views/admin/users";
import LeaveManagement from "./AdminComponents/Main/views/admin/leaveManagement";
import DataTables from "./AdminComponents/Main/views/admin/tables";

// user Imports
   

import EmpDashboard from "EmployeeComponents/User_main/views/user/default";
import Team from "EmployeeComponents/User_main/views/user/team";
import Profile from "EmployeeComponents/User_main/views/user/profile";
import Task from "EmployeeComponents/User_main/views/user/task";
import Contact from "EmployeeComponents/User_main/views/user/contact";

// Auth Imports


// Icon Imports
import {
  MdHome,

  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLogout,
  MdRequestPage,
  MdContactPhone 


} from "react-icons/md";

import {

  BiEdit ,

  BiSlider,
 
 

} from "react-icons/bi";


const routes = [
  {
    name: "Dashboard ",
    layout: "/admin",
    path: "dashboard",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Users",
    layout: "/admin",
    component: <NFTMarketplace />,
    secondary: true,
    path: "Users",
    icon: <MdPerson className="h-6 w-6" />,
  },
  {
    name: "Leads",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "data-tables",
    component: <DataTables />,
  },
  {
    name: "Leave",
    layout: "/admin",
    path: "LeaveManagement",
    icon: <BiEdit  className="h-6 w-6" />,
    component: <LeaveManagement/>,
  },

{
  name: "Settings",
  layout: "/admin",
  icon: <BiSlider className="h-6 w-6" />,
  path: "data-tables",
  component: < LeaveManagement/>,
},


// user Imports



{
  name: "Dashboard",
  layout: "/user",
  path: "layots",
  icon: <MdHome className="h-6 w-6" />,
  component: <EmpDashboard />,
},
{
  name: "Profile",
  layout: "/user",
  path: "profile",
  icon: <MdPerson className="h-6 w-6" />,
  component: <Profile />,
},
{
  name: "Team",
  layout: "/user",
  path: "team",
  icon: <MdOutlineShoppingCart className="h-6 w-6" />,
  component: <Team />,
  secondary: true,
},
{
  name: "Task",
  layout: "/user",
  icon: <MdBarChart className="h-6 w-6" />,
  path: "task",
  component: <Task />,
},

{
  name: "Request",
  layout: "/request",
  path: "#",
  icon: <MdRequestPage className="h-6 w-6" />,
 
},
{
  name: "Contact & help?",
  layout: "/user",
  path: "Contact",
  icon: <MdContactPhone  className="h-6 w-6" />,
  component: <Contact/>,
},

{
  name: "Logout",
  layout: "/user",
  path: "layouts",
  icon: <MdLogout className="h-6 w-6" />,
  
 
},
];
export default routes;
