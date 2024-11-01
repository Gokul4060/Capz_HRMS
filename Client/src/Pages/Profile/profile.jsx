import React from "react";
import Personal_Info from "./subProfile/Personal_Info";
import Work_Info from "./subProfile/Work_Info";
import Contact from "./subProfile/Contact";
import Bank_Info from "./subProfile/Bank_Info";
import Heirarchy_Info from "./subProfile/Heirarchy_Info";
import Identity_Info from "./subProfile/Identity_Info";
import Exit_Info from "./subProfile/Exit_Info";
import Profile_Pic from "./subProfile/Profile_Pic";


const profile = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:mt-14 space-y-5 md:ml-10 pb-5 w-full pr-5">
        <p className="font-bold text-lg">My Profile</p>
       {/* <div
          className="rounded-lg border bg-cover bg-center  shadow-lg relative"
          style={{
            backgroundImage: `url(${img})`, // Use your image here
          }}
        >
          <div className="m-10 max-w-sm bg-white rounded-2xl">
         

       
            <div className="absolute inset-0 bg-black bg-opacity-20 rounded-lg "></div>
      
            <div className="relative z-10 rounded-2xl shadow-2xl ">
              <div className="relative mx-auto w-36 rounded-full  mt-8">
                <span className="absolute right-0 m-3 h-3 w-3 rounded-full  bg-green-500 ring-2 ring-green-300 ring-offset-2"></span>
                <img
                  className="mx-auto h-auto w-full rounded-full "
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                  alt="Profile"
                />
              </div>
              <h1 className="my-1 text-center text-xl font-bold leading-8 text-gray-900">
                Michael Simbal
              </h1>
              <h3 className="font-lg text-semibold text-center leading-6 text-gray-600">
                Marketing Exec. at Denva Corp
              </h3>
           
              <ul className="mt-3 divide-y rounded bg-gray-100 py-2 px-3 text-gray-600 shadow-sm hover:text-gray-700 hover:shadow">
                <li className="flex items-center py-3 text-sm">
                  <span>Status</span>
                  <span className="ml-auto">
                    <span className="rounded-full bg-green-200 py-1 px-2 text-xs font-medium text-green-700">
                      Open for side gigs
                    </span>
                  </span>
                </li>
                <li className="flex items-center py-3 text-sm">
                  <span>Joined On</span>
                  <span className="ml-auto">Apr 08, 2022</span>
                </li>
              </ul>
            </div>
          </div>
        </div> */}

        <Profile_Pic />

        <Personal_Info />

        <Work_Info />

        <Contact />

        <Bank_Info />

        <Heirarchy_Info />

        <Identity_Info />

        <Exit_Info />
      </div>
    </div>
  );
};

export default profile;
