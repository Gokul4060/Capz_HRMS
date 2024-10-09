import React from "react";
import { useNavigate } from "react-router-dom";
import img from "../../../assets/undraw_product.svg";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white">
      <section className="mx-auto -mt-11 py-6 px-4 md:py-12 md:px-8 lg:flex lg:items-center">
        <div className="space-y-6 flex-1 text-center lg:text-left">
          <a
            href="javascript:void(0)"
            className="inline-flex items-center gap-x-3 rounded-full p-1 pr-5 border border-gray-800 text-sm font-medium duration-150 hover:bg-gray-50"
          >
            <span className="flex items-center bg-gray-800 text-white rounded-full px-3 py-1">
              New
            </span>
            <p className="text-gray-700">
              One Stop Solution for Human Resource
            </p>
          </a>
          <h1 className="text-black font-bold text-3xl md:text-4xl lg:text-5xl">
            HR Software India
            <span className="text-customplam"> Digital workplace</span>
          </h1>
          <p className="text-gray-700 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Welcome to CapzHRMS, Empowering Your Workplace. Streamline HR
            processes, boost productivity, and enhance employee engagement with
            our intuitive platform. From seamless leave management to insightful
            performance tracking, we've got you covered. Experience efficiency,
            transparency, and connectivity like never before. Let's transform HR
            together.
          </p>
          <p className="text-gray-700 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            No matter the size of your business, our HRMS software in India is
            suitable for addressing your human resource management processes for
            smooth operation. Integrated with software like Time Attendance,
            Payroll, Leave, Claims, and Appraisal.
          </p>
          <div className="flex flex-col items-center gap-y-4 lg:flex-row lg:items-center lg:gap-x-4">
            <button
              onClick={() => {
                navigate("/log-in");
              }}
              className="flex items-center justify-center gap-x-2 py-2 px-5 shadow-lg text-white font-medium bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 rounded-full md:inline-flex"
            >
              Get started
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <a
              href="javascript:void(0)"
              className="flex items-center justify-center gap-x-2 py-2 px-5 text-gray-700 hover:text-gray-900 font-medium duration-150 md:inline-flex"
            >
              Learn more..
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
        <div className="flex-1 text-center lg:text-left mt-10 lg:mt-0 lg:ml-10">
          <img
            src={img}
            className="w-full max-w-md mx-auto sm:w-10/12 lg:w-full"
            alt="HR Software Illustration"
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
