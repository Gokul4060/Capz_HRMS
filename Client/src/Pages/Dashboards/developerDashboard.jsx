import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import { IoIosVideocam } from "react-icons/io";
import { FaAngleRight } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoPersonCircleOutline } from "react-icons/io5";
import { TfiMenuAlt } from "react-icons/tfi";
import { TbClockX } from "react-icons/tb";

function developmentDashboard() {
  const [details, setDetails] = useState([
    {
      id: "1",
      storename: "Solaris Sparkle",
      location: "Miami, Florida",
      sell: "102 Quantity",
      amount: "12.50K",
    },
    {
      id: "2",
      storename: "Solaris Sparkle",
      location: "Miami, Florida",
      sell: "102 Quantity",
      amount: "12.50K",
    },
    {
      id: "3",
      storename: "Solaris Sparkle",
      location: "Miami, Florida",
      sell: "102 Quantity",
      amount: "12.50K",
    },
  ]);

  const [team, setTeam] = useState([
    {
      img: "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?size=626&ext=jpg&ga=GA1.1.203137344.1726047967&semt=ais_hybrid",
      name: "Mahid Ahmed",
      designation: "Project Manager",
    },
    {
      img: "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?size=626&ext=jpg&ga=GA1.1.203137344.1726047967&semt=ais_hybrid",
      name: "Mahid Ahmed",
      designation: "Project Manager",
    },
    {
      img: "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?size=626&ext=jpg&ga=GA1.1.203137344.1726047967&semt=ais_hybrid",
      name: "Mahid Ahmed",
      designation: "Project Manager",
    },
    {
      img: "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?size=626&ext=jpg&ga=GA1.1.203137344.1726047967&semt=ais_hybrid",
      name: "Mahid Ahmed",
      designation: "Project Manager",
    },
  ]);

  const [open, setOpen] = useState(false);
  const toggleDropdown2 = () => {
    setOpen((prevState) => !prevState);
  };

  const [selectedOption, setSelectedOption] = useState("Month");
  const [chartData, setChartData] = useState({
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Projects",
        data: [12, 19, 10, 15, 8, 12, 7, 14, 20, 16, 9, 18],
        backgroundColor: "#004C3F",
      },
    ],
  });

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setOpen(false);

    if (option === "Month") {
      setChartData({
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        datasets: [
          {
            label: "Projects",
            data: [12, 19, 10, 15, 8, 12, 7, 14, 20, 16, 9, 18],
            backgroundColor: "#004C3F",
          },
        ],
      });
    } else if (option === "Year") {
      setChartData({
        labels: ["2021", "2022", "2023"],
        datasets: [
          {
            label: "Projects",
            data: [120, 190, 170],
            backgroundColor: "#004C3F",
          },
        ],
      });
    }
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const handleClickOutside = (event) => {
    if (
      event.target.closest("#menu-button") === null &&
      event.target.closest("#dropdown-menu") === null
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="">
      <div className="">
        <div>
          <div className="lg:grid lg:grid-cols-3 gap-5  ">
            <div className="border rounded-lg shadow-md p-5 shadow-#79ADA4   bg-#C9D9C6">
              <p className="text-sm font-semibold">Total Earning</p>
              <div className="text-center mt-5">
                <p className="font-bold text-#004E3E">242.65K</p>
                <p className="text-[10px] text-gray-400 mt-2">
                  From the running month
                </p>
              </div>
            </div>
            <div className=" border rounded-lg shadow-md p-5 mt-5 lg:mt-0 shadow-#79ADA4 bg-#C9D9C6">
              <p className="text-sm font-semibold">Average Earning</p>
              <div className="text-center mt-5">
                <p className="font-bold text-#004E3E">17.347K</p>
                <p className="text-[10px] text-gray-400  mt-2">
                  Daily Earning of this Month{" "}
                </p>
              </div>
            </div>
            <div className="border rounded-lg shadow-md p-5 mt-5 lg:mt-0 shadow-#79ADA4 bg-#C9D9C6">
              <p className="text-sm font-semibold">Conversation Rate</p>
              <div className="text-center mt-5">
                <p className="font-bold text-#004E3E">74.86%</p>
                <p className="text-[10px] text-gray-400  mt-2">
                  +6.04% greater than last month
                </p>
              </div>
            </div>

            <div className="lg:flex md:w-[700px] lg:w-[730px]">
              <div className="border bg-gradient-to-tr from-white to-#ECECEC  rounded-lg mt-3 lg:h-64 shadow-md shadow-#79ADA4 relative  lg:w-[400px] p-5">
                <p className="text-sm sm:text-lg font-semibold">Regular sell</p>
                <div className="md:grid md:grid-cols-2">
                  <div className="absolute right-5 -mt-7 z-50">
                    <button
                      type="button"
                      className="inline-flex w-24 text-xs text-left gap-x-1 rounded-md bg-white px-3 py-2 font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      id="menu-button"
                      aria-expanded={open}
                      aria-haspopup="true"
                      onClick={toggleDropdown2}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-4 text-#004E3E"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                        />
                      </svg>
                      {selectedOption}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-4 absolute right-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m19.5 8.25-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </button>
                    {open && (
                      <div
                        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="menu-button"
                        tabindex="-1"
                      >
                        <div className="py-1 bg-#ECECEC" role="none">
                          <a
                            href="#"
                            onClick={() => handleOptionSelect("Month")}
                            className="block px-4 py-2 text-sm hover:bg-#C3D9D6 text-gray-700"
                          >
                            {" "}
                            Month{" "}
                          </a>
                          <a
                            href="#"
                            onClick={() => handleOptionSelect("Year")}
                            className="block px-4 py-2 text-sm hover:bg-#C3D9D6 text-gray-700"
                          >
                            {" "}
                            Year{" "}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-20 md:mt-10">
                  <Bar
                    data={chartData}
                    options={{ maintainAspectRatio: false }}
                  />
                </div>
              </div>
              <div className="lg:ml-5 mt-3 p-5 lg:w-72 ">
                <p className="text-lg font-semibold">Summary</p>
                <div className="grid grid-cols-2 mt-5 ml-2">
                  <div>
                    <IoPersonCircleOutline className="border rounded-lg  text-#004C3F size-8"></IoPersonCircleOutline>
                    <p className="text-xs text-gray-400 mt-1">Task Completed</p>
                    <p className="text-sm font-semibold text-#004C3F">
                      100k Completed
                    </p>
                  </div>
                  <div className="ml-5">
                    <AiOutlineLoading3Quarters className="border rounded-lg p-1 text-#004C3F size-8"></AiOutlineLoading3Quarters>
                    <p className="text-xs text-gray-400 mt-1">In Progress</p>
                    <p className="text-sm font-semibold text-#004C3F">
                      15 Tasks
                    </p>
                  </div>
                  <div className="mt-5">
                    <TfiMenuAlt className="border rounded-lg p-1 text-#004C3F size-8"></TfiMenuAlt>
                    <p className="text-xs text-gray-400 mt-1">Task ToDo</p>
                    <p className="text-sm font-semibold text-#004C3F">
                      20 Tasks
                    </p>
                  </div>
                  <div className="ml-5 mt-5">
                    <TbClockX className="border rounded-lg p-1 text-#004C3F size-8"></TbClockX>
                    <p className="text-xs text-gray-400 mt-1">
                      Incomplete Task
                    </p>
                    <p className="text-sm font-semibold text-#004C3F">
                      15 Tasks
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:ml-20 md:ml-10 mt-5 md:mt-0">
          <div className="border border-none rounded-lg shadow-md lg:w-60 shadow-#79ADA4  p-5 bg-gradient-to-r from-#004C3F via-#004C3F to-#00b781">
            <p className="text-white font-bold ">Upgrade to pro</p>
            <p className="mt-5 text-gray-400 font-semibold">$4.20/Month</p>
            <p className="text-xs text-gray-400">$50 Billed annually</p>
            <button
              type="button"
              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-xs px-5 py-2.5 text-center me-2 mt-5"
            >
              Upgrade Now
            </button>
          </div>
          <div className="md:border rounded-lg md:shadow-md md:shadow-#79ADA4 lg:w-60 p-5 mt-8 md:mt-5 bg-gradient-to-tr from-white to-#ECECEC">
            <div className="flex">
              <div className="rounded-full mt-1 ml-2  bg-#C3D9D6 p-2">
                <IoIosVideocam />
              </div>
              <p className="font-semibold text-xl ml-3 mt-1">Daily Meeting</p>
            </div>
            <div className="text-[8px] text-gray-400 flex gap-3">
              <p className="ml-16">12+ Person</p>
              <p>8:30pm</p>
            </div>
            <div className="flex">
              <div className="p-5 flex -space-x-3 mt-2">
                <img
                  src={
                    "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?size=626&ext=jpg&ga=GA1.1.203137344.1726047967&semt=ais_hybrid"
                  }
                  className="rounded-full size-5"
                ></img>
                <img
                  src={
                    "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?size=626&ext=jpg&ga=GA1.1.203137344.1726047967&semt=ais_hybrid"
                  }
                  className="rounded-full size-5"
                ></img>
                <img
                  src={
                    "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?size=626&ext=jpg&ga=GA1.1.203137344.1726047967&semt=ais_hybrid"
                  }
                  className="rounded-full size-5"
                ></img>
              </div>
              <p className="text-[12px]  mt-6  font-bold">
                They will conduct the meeting
              </p>
            </div>
            <button
              type="button"
              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-xs px-5 py-2.5 text-center me-2 mt-6 ml-10 lg:ml-0"
            >
              Click for Meeting
            </button>
          </div>
        </div>
      </div>
      <div className="lg:grid lg:grid-cols-2 lg:ml-20">
        <div className="border  relative lg:rounded-lg lg:shadow-md lg:shadow-#79ADA4 bg-gradient-to-tr from-white to-#ECECEC p-5 lg:w-[700px] lg:ml-20 mt-10">
          <p className="font-semibold">Top Store</p>
          <button
            type="button"
            className="text-white bg-#004C3F   font-medium rounded-lg text-xs px-5 py-2.5  me-2 absolute right-2 -mt-7 h-8 w-14 "
          >
            <p className="-ml-[10px] -mt-[1px]">Share</p>
          </button>
          <div className=" overflow-x-auto rounded-2xl  mt-7 space-x-20">
            <table className=" w-full  border shadow-md   text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-#C9D9C6">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Store Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Sell
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Amount
                  </th>
                </tr>
              </thead>
              {details.map((a) => (
                <tbody key={a.id} className="text-sm font-semibold">
                  <tr className="border-b bg-#D9D9D9">
                    <td className="px-6 py-4">{a.storename}</td>
                    <td className="px-6 py-4">{a.location}</td>
                    <td className="px-6 py-4">{a.sell}</td>
                    <td className="px-6 py-4">{a.amount}</td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
        <div className="border  rounded-lg  shadow-md shadow-#79ADA4  lg:w-60 p-5 lg:mt-9 mt-5  lg:ml-[120px] bg-gradient-to-tr from-white to-#ECECEC ">
          <p className="font-semibold">Team Member</p>
          {team.map((b, index) => (
            <div
              key={b.id || index}
              className=" border bg-#D9D9D9 p-2 rounded-lg mt-2 flex relative"
            >
              <img src={b.img} className="rounded-full size-8"></img>
              <div className="flex-row ml-2">
                <p className="text-xs font-semibold">{b.name}</p>
                <p className="text-xs text-#004E3E">{b.designation}</p>
              </div>
              <div className="absolute mt-2 right-2 text-#004C3F">
                {" "}
                <FaAngleRight />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default developmentDashboard;
