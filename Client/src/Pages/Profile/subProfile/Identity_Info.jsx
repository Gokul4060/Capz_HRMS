import React, { useEffect, useState } from 'react'
import { PiPencilSimpleLineBold } from "react-icons/pi";
import { usePersonaldataMutation,useGetPersonaldataQuery } from '../../../redux/slices/api/userApiSlice';

function Identity_Info() {
    const [isEditingIdentityInfo, setIsEditingIdentityInfo] = useState(false);
    const [updatePersonalData, { isLoading }] = usePersonaldataMutation();
    const { data: fetchedData, isLoading: isFetching, error } = useGetPersonaldataQuery();

    const [identityInfo, setIdentityInfo] = useState({
        uan: '',
        pan: '',
        aadhar: ''
    });

    const toggleEditIdentityInfo = () => setIsEditingIdentityInfo(!isEditingIdentityInfo);

    const handleSaveAddress = async () => {
        try {
            // Define the data to be sent to the API
            const data = {
                identityInformation: identityInfo, // This is the updated identity information
            };
            
            // Call the API to update the identity information
            await updatePersonalData(data);
        
            // Close the editing form on success
            setIsEditingIdentityInfo(false);
        } catch (error) {
            console.error("Error updating identity information", error);
        }
    };

    useEffect(() => {
        if (fetchedData?.identityInformation) {
            setIdentityInfo(fetchedData.identityInformation); // Set identity information
        }
    }, [fetchedData]);

    return (
      <div>
        <div className="border shadow-lg rounded-lg p-5 relative bg-white">
          <p className="font-semibold text-lg md:text-base">
            Identity Information
          </p>
          <div
            onClick={toggleEditIdentityInfo}
            className="border rounded-2xl absolute right-3 top-3 text-xs text-gray-400 flex p-2 space-x-1 cursor-pointer hover:bg-gray-100 transition"
          >
            <p className="-mt-0.5">Edit</p> <PiPencilSimpleLineBold />
          </div>
          {isEditingIdentityInfo ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-y-3">
                <div>
                  <p className="text-gray-400">UAN</p>
                  <input
                    type="text"
                    value={identityInfo.uan}
                    onChange={(e) =>
                      setIdentityInfo({ ...identityInfo, uan: e.target.value })
                    }
                    className="border rounded-md p-2"
                  />
                </div>
                <div>
                  <p className="text-gray-400">PAN</p>
                  <input
                    type="text"
                    value={identityInfo.pan}
                    onChange={(e) =>
                      setIdentityInfo({ ...identityInfo, pan: e.target.value })
                    }
                    className="border rounded-md p-2"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-y-3">
                <div>
                  <p className="text-gray-400">Aadhar</p>
                  <input
                    type="text"
                    value={identityInfo.aadhar}
                    onChange={(e) =>
                      setIdentityInfo({
                        ...identityInfo,
                        aadhar: e.target.value,
                      })
                    }
                    className="border rounded-md p-2"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-3">
                <button
                  onClick={toggleEditIdentityInfo}
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
                  <p className="text-gray-400">UAN</p>
                  <p>{identityInfo.uan}</p>
                </div>
                <div>
                  <p className="text-gray-400">PAN</p>
                  <p>{identityInfo.pan}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-y-3">
                <div>
                  <p className="text-gray-400">Aadhar</p>
                  <p>{identityInfo.aadhar}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
}

export default Identity_Info