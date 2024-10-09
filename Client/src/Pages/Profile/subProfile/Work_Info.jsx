import React, { useEffect, useState } from 'react'
import { PiPencilSimpleLineBold } from "react-icons/pi";
import { usePersonaldataMutation,useGetPersonaldataQuery } from '../../../redux/slices/api/userApiSlice';

function Work_Info() {
    const [isEditingWorkInfo, setIsEditingWorkInfo] = useState(false);
    const [updatePersonalData, { isLoading }] = usePersonaldataMutation();
    const { data: fetchedData, isLoading: isFetching, error } = useGetPersonaldataQuery();

    const [workInfo, setWorkInfo] = useState({
        department: '',
        location: '',
        designation: '',
        role: '',
        employeetype: '',
        employeestatus: '',
        sourceofhire: '',
        currentexperience: '',
        totalexperience: ''
    });
    const toggleEditWorkInfo = () => setIsEditingWorkInfo(!isEditingWorkInfo);

    const handleSaveAddress = async () => {
        try {
            const data = {
                workInformation: workInfo, // Send updated work information
            };
            await updatePersonalData(data); // Call the API to update the info (this should handle both address and work info updates)
            setIsEditingWorkInfo(false); // Close the editing form on success
        } catch (error) {
            console.error("Error updating work information", error);
        }
    };
    

    useEffect(() => {
       
        if (fetchedData?.workInformation) {
            setWorkInfo(fetchedData.workInformation); // Set work information
        }
    }, [fetchedData]);


    return (
      <div>
        <div className="border shadow-lg rounded-lg p-5 relative bg-white">
          <p className="font-semibold text-lg md:text-base">Work Information</p>
          <div
            onClick={toggleEditWorkInfo}
            className="border rounded-2xl absolute right-3 top-3 text-xs text-gray-400 flex p-2 space-x-1 cursor-pointer hover:bg-gray-100 transition"
          >
            <p className="-mt-0.5">Edit</p> <PiPencilSimpleLineBold />
          </div>
          {isEditingWorkInfo ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-y-3">
                <div>
                  <p className="text-gray-400">Department</p>
                  <input
                    type="text"
                    value={workInfo.department}
                    onChange={(e) =>
                      setWorkInfo({ ...workInfo, department: e.target.value })
                    }
                    className="border rounded-md p-2"
                  />
                </div>
                <div>
                  <p className="text-gray-400">Location</p>
                  <input
                    type="text"
                    value={workInfo.location}
                    onChange={(e) =>
                      setWorkInfo({ ...workInfo, location: e.target.value })
                    }
                    className="border rounded-md p-2"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-y-3">
                <div>
                  <p className="text-gray-400">Designation</p>
                  <input
                    type="text"
                    value={workInfo.designation}
                    onChange={(e) =>
                      setWorkInfo({ ...workInfo, designation: e.target.value })
                    }
                    className="border rounded-md p-2"
                  />
                </div>
                <div>
                  <p className="text-gray-400">Role</p>
                  <input
                    type="text"
                    value={workInfo.role}
                    onChange={(e) =>
                      setWorkInfo({ ...workInfo, role: e.target.value })
                    }
                    className="border rounded-md p-2"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-y-3">
                <div>
                  <p className="text-gray-400">Employee Type</p>
                  <input
                    type="text"
                    value={workInfo.employeetype}
                    onChange={(e) =>
                      setWorkInfo({ ...workInfo, employeetype: e.target.value })
                    }
                    className="border rounded-md p-2"
                  />
                </div>
                <div>
                  <p className="text-gray-400">Employee Status</p>
                  <input
                    type="text"
                    value={workInfo.employeestatus}
                    onChange={(e) =>
                      setWorkInfo({
                        ...workInfo,
                        employeestatus: e.target.value,
                      })
                    }
                    className="border rounded-md p-2"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-y-3">
                <div>
                  <p className="text-gray-400">Source of Hire</p>
                  <input
                    type="text"
                    value={workInfo.sourceofhire}
                    onChange={(e) =>
                      setWorkInfo({ ...workInfo, sourceofhire: e.target.value })
                    }
                    className="border rounded-md p-2"
                  />
                </div>
                <div>
                  <p className="text-gray-400">Current Experience</p>
                  <input
                    type="text"
                    value={workInfo.currentexperience}
                    onChange={(e) =>
                      setWorkInfo({
                        ...workInfo,
                        currentexperience: e.target.value,
                      })
                    }
                    className="border rounded-md p-2"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-y-3">
                <div>
                  <p className="text-gray-400">Total Experience</p>
                  <input
                    type="text"
                    value={workInfo.totalexperience}
                    onChange={(e) =>
                      setWorkInfo({
                        ...workInfo,
                        totalexperience: e.target.value,
                      })
                    }
                    className="border rounded-md p-2"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-3">
                <button
                  onClick={toggleEditWorkInfo}
                  className="text-gray-600 border border-gray-400 rounded-md py-1 px-3 text-sm hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveAddress}
                  className="bg-green-600 text-white py-1 px-3 rounded-md text-sm hover:bg-green-700 transition"
                >
                  Save
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-y-3">
                <div>
                  <p className="text-gray-400">Department</p>
                  <p>{workInfo.department}</p>
                </div>
                <div>
                  <p className="text-gray-400">Location</p>
                  <p>{workInfo.location}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-y-3">
                <div>
                  <p className="text-gray-400">Designation</p>
                  <p>{workInfo.designation}</p>
                </div>
                <div>
                  <p className="text-gray-400">Role</p>
                  <p>{workInfo.role}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-y-3">
                <div>
                  <p className="text-gray-400">Employee Type</p>
                  <p>{workInfo.employeetype}</p>
                </div>
                <div>
                  <p className="text-gray-400">Employee Status</p>
                  <p>{workInfo.employeestatus}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-y-3">
                <div>
                  <p className="text-gray-400">Source of Hire</p>
                  <p>{workInfo.sourceofhire}</p>
                </div>
                <div>
                  <p className="text-gray-400">Current Experience</p>
                  <p>{workInfo.currentexperience}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-y-3">
                <div>
                  <p className="text-gray-400">Total Experience</p>
                  <p>{workInfo.totalexperience}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
}

export default Work_Info