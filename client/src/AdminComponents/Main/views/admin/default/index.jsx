import MiniCalendar from "AdminComponents/calendar/MiniCalendar";
import WeeklyRevenue from "AdminComponents/Main/views/admin/default/components/WeeklyRevenue";
import TotalSpent from "AdminComponents/Main/views/admin/default/components/TotalSpent";
import PieChartCard from "AdminComponents/Main/views/admin/default/components/PieChartCard";
import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";

import { columnsDataCheck, columnsDataComplex } from "./variables/columnsData";

import Widget from "AdminComponents/widget/Widget";
import CheckTable from "AdminComponents/Main/views/admin/default/components/CheckTable";
import ComplexTable from "AdminComponents/Main/views/admin/default/components/ComplexTable";
import DailyTraffic from "AdminComponents/Main/views/admin/default/components/DailyTraffic";
import TaskCard from "AdminComponents/Main/views/admin/default/components/TaskCard";
import tableDataCheck from "./variables/tableDataCheck.json";
import tableDataComplex from "./variables/tableDataComplex.json";

const Dashboard = () => {
  return (
    <div>
      {/* Card widget */}

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"All Employees"}
          subtitle={"40"}
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"Tasks"}
          subtitle={"10 "}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Employee Attendance"}
          subtitle={"90%"}
        />
        <Widget
          icon={<MdDashboard className="h-6 w-6" />}
          title={"Requests"}
          subtitle={"7"}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Leads"}
          subtitle={"30"}
        />
        <Widget
          icon={<IoMdHome className="h-6 w-6" />}
          title={"Total Projects"}
          subtitle={"33"}
        />
      </div>

      {/* Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <TotalSpent />
        <WeeklyRevenue />
      </div>

      {/* Tables & Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* Check Table */}
        <div>
          <CheckTable
            columnsData={columnsDataCheck}
            tableData={tableDataCheck}
          />
        </div>

        {/* Traffic chart & Pie Chart */}

        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <DailyTraffic />
          <PieChartCard />
        </div>

        {/* Complex Table , Task & Calendar */}

        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />

        {/* Task chart & Calendar */}

        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <TaskCard />
          <div className="grid grid-cols-1 rounded-[20px]">
            <MiniCalendar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
