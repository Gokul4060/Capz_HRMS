import React, { useEffect, useState } from 'react'
import { PiPencilSimpleLineBold } from "react-icons/pi";
import { usePersonaldataMutation,useGetPersonaldataQuery } from '../../../redux/slices/api/userApiSlice';


function Personal_Info() {
    const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(false);
    const [updatePersonalData, { isLoading }] = usePersonaldataMutation();
    const { data: fetchedData, isLoading: isFetching, error } = useGetPersonaldataQuery();

    const [personalInfo, setPersonalInfo] = useState({
        firstName: "",
        lastName: "",
        age: '',
        bloodgroup: '',
        maritalstatus: '',
        aboutme: '',
        expertise: ''
    });
    const toggleEditPersonalInfo = () => setIsEditingPersonalInfo(!isEditingPersonalInfo);
    
    const handleSavePersonalInfo = async () => {
        try {
            const data = {
                personalInformation: personalInfo, // Send updated personal information
            };
            await updatePersonalData(data); // Call the API to update the info
            setIsEditingPersonalInfo(false); // Close the editing form on success
        } catch (error) {
            console.error("Error updating personal information", error);
        }
    }


    useEffect(() => {
        if (fetchedData?.personalInformation) {
            setPersonalInfo(fetchedData.personalInformation);
        }
    }, [fetchedData]);



    return (
      <div>
        <div className="border shadow-lg rounded-lg p-5 relative bg-white">
          <p className="font-semibold text-lg md:text-base">
            Personal Information
          </p>
          <div
            onClick={toggleEditPersonalInfo}
            className="border rounded-2xl absolute right-3 top-3 text-xs text-gray-400 flex p-2 space-x-1 cursor-pointer hover:bg-gray-100 transition"
          >
            <p className="-mt-0.5">Edit</p> <PiPencilSimpleLineBold />
          </div>
          {isEditingPersonalInfo ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-y-3">
                <div>
                  <p className="text-gray-400">First Name</p>
                  <input
                    type="text"
                    value={personalInfo.firstName}
                    onChange={(e) =>
                      setPersonalInfo({
                        ...personalInfo,
                        firstName: e.target.value,
                      })
                    }
                    className="border rounded-md p-2"
                  />
                </div>
                <div>
                  <p className="text-gray-400">Last Name</p>
                  <input
                    type="text"
                    value={personalInfo.lastName}
                    onChange={(e) =>
                      setPersonalInfo({
                        ...personalInfo,
                        lastName: e.target.value,
                      })
                    }
                    className="border rounded-md p-2"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-y-3">
                <div>
                  <p className="text-gray-400">Age</p>
                  <input
                    type="number"
                    value={personalInfo.age}
                    onChange={(e) =>
                      setPersonalInfo({
                        ...personalInfo,
                        age: e.target.value,
                      })
                    }
                    className="border rounded-md p-2"
                  />
                </div>
                <div>
                  <p className="text-gray-400">Blood Group</p>
                  <input
                    type="text"
                    value={personalInfo.bloodgroup}
                    onChange={(e) =>
                      setPersonalInfo({
                        ...personalInfo,
                        bloodgroup: e.target.value,
                      })
                    }
                    className="border rounded-md p-2"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-y-3">
                <div>
                  <p className="text-gray-400">Marital Status</p>
                  <input
                    type="text"
                    value={personalInfo.maritalstatus}
                    onChange={(e) =>
                      setPersonalInfo({
                        ...personalInfo,
                        maritalstatus: e.target.value,
                      })
                    }
                    className="border rounded-md p-2"
                  />
                </div>
                <div>
                  <p className="text-gray-400">About Me</p>
                  <input
                    type="text"
                    value={personalInfo.aboutme}
                    onChange={(e) =>
                      setPersonalInfo({
                        ...personalInfo,
                        aboutme: e.target.value,
                      })
                    }
                    className="border rounded-md p-2"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-y-3">
                <div>
                  <p className="text-gray-400">Expertise</p>
                  <input
                    type="text"
                    value={personalInfo.expertise}
                    onChange={(e) =>
                      setPersonalInfo({
                        ...personalInfo,
                        expertise: e.target.value,
                      })
                    }
                    className="border rounded-md p-2"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-3">
                <button
                  onClick={toggleEditPersonalInfo}
                  className="text-gray-600 border border-gray-400 rounded-md py-1 px-3 text-sm hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSavePersonalInfo}
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
                  <p className="text-gray-400">First Name</p>
                  <p>{personalInfo.firstName}</p>
                </div>
                <div>
                  <p className="text-gray-400">Last Name</p>
                  <p>{personalInfo.lastName}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-y-3">
                <div>
                  <p className="text-gray-400">Age</p>
                  <p>{personalInfo.age}</p>
                </div>
                <div>
                  <p className="text-gray-400">Blood Group</p>
                  <p>{personalInfo.bloodgroup}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-y-3">
                <div>
                  <p className="text-gray-400">Marital Status</p>
                  <p>{personalInfo.maritalstatus}</p>
                </div>
                <div>
                  <p className="text-gray-400">About Me</p>
                  <p>{personalInfo.aboutme}</p>
                </div>
              </div>
              <div className="mt-6">
                <p className="text-gray-400">Expertise</p>
                <p>{personalInfo.expertise}</p>
              </div>
            </>
          )}
        </div>
      </div>
    );
}

export default Personal_Info