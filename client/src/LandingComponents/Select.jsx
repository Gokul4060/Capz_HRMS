import React from 'react';
import { useNavigate } from "react-router-dom";
const Select = () => {
   const navigate = useNavigate()
   return (
      <div className="flex justify-center items-center h-screen">
         <div className="max-w-md mx-auto border rounded-lg  overflow-hidden p-6">
            <main className="grid min-h-full place-items-center  sm:py-24 lg:px-8">
               <div className="text-center">
                  <p className="text-base font-semibold text-indigo-600">Your position</p>
                  <p className="mt-6 text-base leading-7 text-gray-600">Login As.</p>
                  <div className="mt-10 flex items-center justify-center gap-x-6">
                     <button onClick={() => { navigate("/register") }}
                        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                     >
                        Admin
                     </button>
                     <button onClick={() => { navigate("/EmpLogin") }}
                        href="#"
                        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                     >
                        Employee
                     </button>
                  </div>
               </div>
            </main>
         </div>
      </div>
   );
}

export default Select;
