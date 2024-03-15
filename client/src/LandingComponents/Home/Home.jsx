import React from "react"



import { useNavigate } from "react-router-dom";



const Home = () => {
  const navigate = useNavigate()


  // Replace javascript:void(0) path with your path


  return (
    <div className="bg-white">
      <section className="mt-24 mx-auto max-w-screen-2xl pb-12 px-4 items-center  lg:flex md:px-8">
        <div className="space-y-4 flex-1 sm:text-center lg:text-left">
          <a href="javascript:void(0)" className='inline-flex gap-x-6 items-center rounded-full p-1 pr-6 border text-sm font-medium duration-150 hover:bg-white'>
            <p className='flex items-center'>
              One Stop Solution for Human Resource
            </p>
          </a>
          <h1 className="text-black font-bold text-4xl xl:text-5xl">
            HR Software India
            <span className="text-indigo-400"> Digital workplace</span>
          </h1>
          <p className="text-gray-800 max-w-xl leading-relaxed sm:mx-auto lg:ml-0">
            Welcome to CapzHRMS, Empowering Your Workplace. Streamline HR processes, boost productivity, and enhance employee engagement with our intuitive platform. From seamless leave management to insightful performance tracking, we've got you covered. Experience efficiency, transparency, and connectivity like never before. Let's transform HR together.
          </p>
          <p className="text-gray-800 max-w-xl leading-relaxed sm:mx-auto lg:ml-0">
            No matter the size of your business, our HRMS software in India is suitable in addressing your human resource management processes for smooth operation. Integrated with software like Time Attendance, Payroll, Leave, Claims and Appraisal
          </p>
          <div className=' flex items-center gap-x-3 sm:text-sm '>
            <button onClick={() => { navigate("/select") }} className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 duration-150 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex">
              Get started
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
              </svg>
            </button>
            <a href="javascript:void(0)" className="flex items-center justify-center gap-x-1 py-2 px-4 text-gray-700 hover:text-gray-900 font-medium duration-150 md:inline-flex">
              Learn more..
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
        <div className="flex-1 text-center mt-7 lg:mt-0 lg:ml-3">
          <img src="https://i.postimg.cc/HxHyt53c/undraw-heatmap-uyye.png" className="w-full mx-auto sm:w-10/12  lg:w-full" />
        </div>
      </section>
    </div>
  )
}


export default Home
