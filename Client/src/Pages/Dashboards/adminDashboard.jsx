import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
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
function AdminDashboard() {
  const [details, setDetails] = useState([
    {
      id: "A012",
      projectname: "Paytm Bank App",
      team: [
        "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?size=626&ext=jpg&ga=GA1.1.1110629685.1724934069&semt=ais_hybrid",
        "https://img.freepik.com/free-photo/cheerful-curly-business-girl-wearing-glasses_176420-206.jpg?size=626&ext=jpg&ga=GA1.1.1110629685.1724934069&semt=ais_hybrid",
        "https://img.freepik.com/premium-photo/young-indian-businesswoman-employee-standing-white-background_1254992-195913.jpg?size=626&ext=jpg&ga=GA1.1.1110629685.1724934069&semt=ais_hybrid",
        "https://img.freepik.com/free-photo/indian-business-man-with-crossed-hands-posing-isolated-white-wall_231208-2626.jpg?size=626&ext=jpg&ga=GA1.1.1110629685.1724934069&semt=ais_hybrid",
      ],
      projectcost: "$30,400",
      projectstatus: "Completed",
      payment: "Done",
    },
    {
      id: "A013",
      projectname: "Paytm Bank App",
      team: [
        "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?size=626&ext=jpg&ga=GA1.1.1110629685.1724934069&semt=ais_hybrid",
        "https://img.freepik.com/free-photo/cheerful-curly-business-girl-wearing-glasses_176420-206.jpg?size=626&ext=jpg&ga=GA1.1.1110629685.1724934069&semt=ais_hybrid",
        "https://img.freepik.com/premium-photo/young-indian-businesswoman-employee-standing-white-background_1254992-195913.jpg?size=626&ext=jpg&ga=GA1.1.1110629685.1724934069&semt=ais_hybrid",
        "https://img.freepik.com/free-photo/indian-business-man-with-crossed-hands-posing-isolated-white-wall_231208-2626.jpg?size=626&ext=jpg&ga=GA1.1.1110629685.1724934069&semt=ais_hybrid",
      ],
      projectcost: "$30,400",
      projectstatus: "Completed",
      payment: "Done",
    },
  ]);
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [percentage, setPercentage] = useState(67);
  const [selectedGender, setSelectedGender] = useState("Male");
  const { user } = useSelector((state) => state.auth);
  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
    if (gender === "Male") {
      setPercentage(67);
    } else if (gender === "Female") {
      setPercentage(33);
    }
  };
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
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
        backgroundColor: "#00B781",
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
            backgroundColor: "#00B781",
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
            backgroundColor: "#00B781",
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
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="pb-5 md:p-10 p-5 w-full -mt-7 -ml-20">
      <div className="lg:grid lg:grid-cols-2 ">
        <div className="md:p-3 md:-ml-2 ml-5 lg:ml-10 mt-6">
          <div className="md:space-y-3">
            <p className="text-xl md:text-2xl font-bold">
              Welcome, <span className="font-medium text-2xl">{user.name}</span>
            </p>
            <div className="flex ">
              <p className="md:text-sm text-xs">
                The salary is pending since 15 Dec
              </p>
              <p className="md:text-sm text-xs text-red-500">.Learn More</p>
            </div>
          </div>
          <div className="md:grid md:grid-cols-2 ">
            <div className="border rounded-lg bg-white grid grid-cols-2 lg:w-96 lg:h-80 p-5 shadow-lg  relative mt-3 gap-x-5">
              <p className="text-xs sm:text-xl font-bold text-#004C3F">
                Total Employees
              </p>
              <p className="font-bold md:text-2xl absolute right-1 p-5 text-#004C3F">
                375
              </p>
              <div className="mt-12 md:mt-20 lg:mt-12 -ml-14 md:-ml-20 w-[100px] h-[100px] sm:w-[150px] sm:h-[150px]">
                <CircularProgressbar
                  value={percentage}
                  text={`${percentage}%`}
                  styles={{
                    path: {
                      stroke: `#00b781`,
                    },
                    text: {
                      fill: "#00B781",
                      fontSize: "16px",
                    },
                    trail: {
                      stroke: "#D3D3D3",
                    },
                  }}
                />
              </div>
              <div
                className={`md:border border-[#C3D9D6] text-xs h-8 p-2 text-center mt-10 font-bold lg:w-32 ml-14 cursor-pointer ${
                  selectedGender === "Male"
                    ? " bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm text-white px-5 py-2.5 text-center me-2 mt-1 "
                    : "bg-transparent text-black"
                }`}
                onClick={() => handleGenderSelect("Male")}
              >
                <span
                  className={`flex w-3 h-3 rounded-full ml-5  ${
                    selectedGender === "Male" ? "bg-white" : "bg-gray-300"
                  }`}
                >
                  <p className="ml-4 -mt-[1px]">Male</p>
                </span>
              </div>
              <div
                className={`md:border border-[#C3D9D6] text-xs h-8 p-2 text-center mt-10 font-bold lg:w-32 ml-2 cursor-pointer ${
                  selectedGender === "Female"
                    ? "text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mt-1 w-40"
                    : "bg-transparent text-black"
                }`}
                onClick={() => handleGenderSelect("Female")}
              >
                <span
                  className={`flex w-3 h-3 rounded-full ml-5  ${
                    selectedGender === "Female" ? "bg-white" : "bg-gray-300"
                  }`}
                >
                  <p className="ml-4 -mt-[1px]">Female</p>
                </span>
              </div>
            </div>
            <div className="border bg-white rounded-lg mt-3 lg:h-80 shadow-md relative lg:w-96 md:left-10 lg:left-20 lg:ml-16 p-5">
              <div className="grid grid-cols-2">
                <p className="text-sm sm:text-xl font-bold text-#004C3F">
                  Total Projects
                </p>
                <p className="font-bold md:text-2xl -mt-2 absolute right-1 pr-5 text-#004C3F">
                  90
                </p>
              </div>
              <div className="md:grid md:grid-cols-2">
                <div className="flex gap-x-2">
                  <p className="text-xs">Currently running</p>
                  <p className="text-xs text-#004E3E">13 projects</p>
                </div>
                <div className="absolute right-5 mt-3 ">
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
                      <div className="py-1 bg-#C3D9D6" role="none">
                        <a
                          href="#"
                          onClick={() => handleOptionSelect("Month")}
                          className="block px-4 py-2 text-sm text-gray-700"
                        >
                          {" "}
                          Month{" "}
                        </a>
                        <a
                          href="#"
                          onClick={() => handleOptionSelect("Year")}
                          className="block px-4 py-2 text-sm text-gray-700"
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
          </div>
        </div>
        <div className="p-3 ml-5 relative lg:ml-28 lg:-mt-6 md:-left-20 lg:left-0">
          <div className="md:border bg-white md:rounded-lg md:shadow-md p-3  text-center md:ml-40 lg:w-96 mt-5 grid grid-cols-3">
            <p className="text-xs text-#004C3F">Attendance</p>
            <p className="text-xs text-#004C3F">Late</p>
            <p className="text-xs text-#004C3F">Absent</p>
            <p className="font-bold text-#004C3F">359</p>
            <p className="font-bold text-#004C3F">12</p>
            <p className="font-bold text-#004C3F">04</p>
          </div>
          <div className="md:border bg-white border-transparent rounded-lg relative  md:shadow-md text-center md:ml-40 lg:w-96 mt-5">
            <div className="flex p-3">
              <img
                src={
                  "https://img.freepik.com/free-photo/cheerful-curly-business-girl-wearing-glasses_176420-206.jpg?size=626&ext=jpg&ga=GA1.1.1110629685.1724934069&semt=ais_hybrid"
                }
                className="rounded-full size-14 "
              />
              <div className="text-left ml-2">
                <p>Jennie</p>
                <p className="text-xs font-bold text-gray-400">
                  Happy Birthday Today
                </p>
                <button
                  type="button"
                  className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mt-1 w-32"
                >
                  Wish Her
                </button>
              </div>
            </div>
          </div>
          <div className="md:border bg-white md:rounded-lg md:shadow-md relative p-3 md:ml-40 lg:w-96 mt-5">
            <p className="font-bold text-#004C3F">Employees on Holiday</p>
            <div className="grid grid-cols-2">
              <div className="flex mt-5">
                <img
                  src={
                    "https://img.freepik.com/free-photo/cheerful-curly-business-girl-wearing-glasses_176420-206.jpg?size=626&ext=jpg&ga=GA1.1.1110629685.1724934069&semt=ais_hybrid"
                  }
                  className="rounded-full size-14 "
                />
                <div className="text-left ml-2">
                  <p>Jennie</p>
                  <p className="text-xs text-gray-400">Health is not good</p>
                </div>
              </div>
              <div>
                <p className="text-red-500 text-xs absolute right-2 mt-7 ">
                  Only today
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="flex mt-5">
                <img
                  src={
                    "https://img.freepik.com/free-photo/cheerful-curly-business-girl-wearing-glasses_176420-206.jpg?size=626&ext=jpg&ga=GA1.1.1110629685.1724934069&semt=ais_hybrid"
                  }
                  className="rounded-full size-14 "
                />
                <div className="text-left ml-2">
                  <p>Jennie</p>
                  <p className="mt-2 text-xs text-gray-400">
                    Health is not good
                  </p>
                </div>
              </div>
              <div>
                <p className="text-red-500 text-xs absolute right-2 mt-7 ">
                  Only today
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:grid lg:grid-cols-2">
          <div className="md:border bg-white md:rounded-lg lg:mt-5 lg:ml-[50px] md:ml-[60px] md:shadow-md lg:w-[798px] md:mt-5 lg:h-72 p-5 relative">
            <div className="grid grid-cols-2 ">
              <p className="text-sm md:text-xl font-bold text-#004C3F">
                Project Summary
              </p>
              <div className="absolute right-5 inline-block text-left">
                <div>
                  <button
                    type="button"
                    className="inline-flex w-24 relative text-left gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 "
                    id="menu-button"
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    onClick={toggleDropdown}
                  >
                    Filter
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="#004E3E"
                      className="size-6 absolute -mt-[3px] right-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                      />
                    </svg>
                  </button>
                </div>
                {isOpen && (
                  <div
                    class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-m bg-#ECECEC shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabindex="-1"
                  >
                    <div class="py-1" role="none">
                      <a
                        href="#"
                        className="block hover:bg-#C3D9D6 px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        tabindex="-1"
                        id="menu-item-0"
                      >
                        Account settings
                      </a>
                      <a
                        href="#"
                        className="block hover:bg-#C3D9D6 px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        tabindex="-1"
                        id="menu-item-1"
                      >
                        Support
                      </a>
                      <a
                        href="#"
                        className="block hover:bg-#C3D9D6 px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        tabindex="-1"
                        id="menu-item-2"
                      >
                        License
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="relative overflow-x-auto shadow-md  mt-7">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-#C9D9C6">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      #
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <div className="flex items-center">
                        Project Name
                        <a href="#">
                          <svg
                            className="w-3 h-3 ms-1.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                          </svg>
                        </a>
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Team
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Project cost
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Project Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Payment
                    </th>
                  </tr>
                </thead>
                {details.map((a) => (
                  <tbody
                    key={a.id}
                    className="text-sm font-semibold bg-#E7E7E7"
                  >
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {a.id}
                      </th>
                      <td className="px-6 py-4">{a.projectname}</td>
                      <td className="px-6 py-4 flex -space-x-4">
                        {a.team.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`Team member ${index + 1}`}
                            className="rounded-full size-7 mr-2 inline-block"
                          />
                        ))}
                      </td>
                      <td className="px-6 py-4">{a.projectcost}</td>
                      <td className="px-6 py-4">{a.projectstatus}</td>
                      <td className="px-6 py-4">{a.payment}</td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </div>
          <div className="lg:border bg-white lg:rounded-lg -ml-3 mt-5 lg:mt-4 sm:mt-10 lg:ml-[580px] flex lg:flex-col md:flex-row md:w-80 lg:w-96 lg:shadow-md p-5">
            <div className="flex-shrink-0">
              <img
                src="https://freepngimg.com/thumb/cartoon/4-2-cartoon-transparent-thumb.png"
                className="h-36 lg:-ml-3  md:ml-40 w-auto md:h-52 md:w-52 lg:w-40 lg:h-32 object-fill"
                alt="image"
              />
            </div>
            <div className="flex flex-col justify-center ml-0 md:ml-4 mt-4 md:mt-0">
              <p className="font-bold text-lg text-#00b781">Need Help?</p>
              <p className="text-xs text-gray-400 mt-1">
                Do you have any problems while using the
              </p>
              <p className="text-xs text-gray-400">HR Management portal?</p>
              <button
                type="button"
                className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mt-1 w-40"
              >
                Contact Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AdminDashboard;
