import React, { useMemo } from "react";


const DevelopmentTable = (props) => {
  const tableItems = [
    {
      name: "Solo learn app",
      date: "Oct 9, 2023",
      status: "Active",
      plan: "Monthly subscription",
    },
    {
      name: "Window wrapper",
      date: "Oct 12, 2023",
      status: "Active",
      plan: "Monthly subscription",
    },
    {
      name: "Unity loroin",
      date: "Oct 22, 2023",
      status: "Archived",
      plan: "Annually subscription",
    },
    {
      name: "Background remover",
      date: "Jan 5, 2023",
      status: "Active",
      plan: "Monthly subscription",
    },
    {
      name: "Colon tiger",
      date: "Jan 6, 2023",
      status: "Active",
      plan: "Annually subscription",
    },
  ];

  return (
    <div className=" max-w-screen-2xl bg-white px-4 md:px-8 rounded-2xl shadow-lg ">
      <div className="items-start justify-between md:flex">
        <div className="max-w-lg mt-8">
          <h3 className="text-xl font-bold text-gray-800 sm:text-2xl">
            My Tasks
          </h3>
          <p className="mt-2 text-gray-600">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>

      </div>
      <div className="relative mt-12 h-max overflow-auto mb-6">
        <table className="w-full table-auto text-left text-sm">
          <thead className="border-b font-medium ">
            <tr>
              <th className="py-3 pr-6">TaskName</th>
              <th className="py-3 pr-6">Date</th>
              <th className="py-3 pr-6">Status</th>
              <th className="py-3 pr-6">Due Date</th>
              <th className="py-3 pr-6"></th>
            </tr>
          </thead>
          <tbody className="divide-y text-gray-600">
            {tableItems.map((item, idx) => (
              <tr key={idx}>
                <td className="whitespace-nowrap py-4 pr-6">{item.name}</td>
                <td className="whitespace-nowrap py-4 pr-6">{item.date}</td>
                <td className="whitespace-nowrap py-4 pr-6">
                  <span
                    className={`rounded-full px-3 py-2 text-xs font-semibold ${
                      item.status == "Active"
                        ? "bg-green-50 text-green-600"
                        : "bg-blue-50 text-blue-600"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="whitespace-nowrap py-4 pr-6">{item.plan}</td>
                <td className="whitespace-nowrap text-right">
                  <a
                    href="javascript:void()"
                    className="rounded-lg border py-1.5 px-3 text-gray-600 duration-150 hover:bg-brand-500 hover:text-white"
                  >
                    View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DevelopmentTable;
