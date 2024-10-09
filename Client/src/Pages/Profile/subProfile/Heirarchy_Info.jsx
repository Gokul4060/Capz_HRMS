import React, { useEffect, useState } from 'react'
import { PiPencilSimpleLineBold } from "react-icons/pi";
import { usePersonaldataMutation,useGetPersonaldataQuery } from '../../../redux/slices/api/userApiSlice';


function Heirarchy_Info() {

    const [isEditingHeirarchyInfo, setIsEditingHeirarchyInfo] = useState(false);
    const [updatePersonalData, { isLoading }] = usePersonaldataMutation();
    const { data: fetchedData, isLoading: isFetching, error } = useGetPersonaldataQuery();

    const [heirarchyInfo, setHeirarchyInfo] = useState({
        reportingmanager: ''
    });

    const toggleEditHeirarchyInfo = () => setIsEditingHeirarchyInfo(!isEditingHeirarchyInfo);

    const handleSaveAddress = async () => {
        try {
            // Define the data to be sent to the API
            const data = {
                hierarchyInformation: heirarchyInfo, // This is the updated hierarchy information
            };
            
            // Call the API to update the hierarchy information
            await updatePersonalData(data);
        
            // Close the editing form on success
            setIsEditingHeirarchyInfo(false); // Corrected variable name
        } catch (error) {
            console.error("Error updating hierarchy information", error);
        }
    };


    useEffect(() => {
        if (fetchedData?.hierarchyInformation) {
            setHeirarchyInfo(fetchedData.hierarchyInformation); // Set hierarchy information
        }
    }, [fetchedData]);

    return (
      <div>
        <div className="border shadow-lg rounded-lg p-5 relative bg-white">
          <p className="font-semibold text-lg md:text-base">
            Heirarchy Information
          </p>
          <div
            onClick={toggleEditHeirarchyInfo}
            className="border rounded-2xl absolute right-3 top-3 text-xs text-gray-400 flex p-2 space-x-1 cursor-pointer hover:bg-gray-100 transition"
          >
            <p className="-mt-0.5">Edit</p> <PiPencilSimpleLineBold />
          </div>
          {isEditingHeirarchyInfo ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-y-3">
                <div>
                  <p className="text-gray-400">Reporting Manager</p>
                  <input
                    type="text"
                    value={heirarchyInfo.reportingmanager}
                    onChange={(e) =>
                      setHeirarchyInfo({
                        ...heirarchyInfo,
                        reportingmanager: e.target.value,
                      })
                    }
                    className="border rounded-md p-2"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-3">
                <button
                  onClick={toggleEditHeirarchyInfo}
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
                  <p className="text-gray-400">Reporting Manager</p>
                  <p>{heirarchyInfo.reportingmanager}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
}

export default Heirarchy_Info