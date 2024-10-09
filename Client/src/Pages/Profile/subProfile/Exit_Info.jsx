import React, { useEffect, useState } from 'react'
import { PiPencilSimpleLineBold } from "react-icons/pi";
import { usePersonaldataMutation,useGetPersonaldataQuery } from '../../../redux/slices/api/userApiSlice';

function Exit_Info() {
    const [isEditingExitInfo, setIsEditingExitInfo] = useState(false);
    const [updatePersonalData, { isLoading }] = usePersonaldataMutation();
    const { data: fetchedData, isLoading: isFetching, error } = useGetPersonaldataQuery();

    const [exitInfo, setExitInfo] = useState({
        resignationletterdate: '',
        exitinterviewdate: '',
        relievingdate: '',
        leaveencashed: '',
        newworkplace: '',
        reasonforleaving: '',
        feedback: ''
    })


    useEffect(() => {
        if (fetchedData?.resignationInformation) {
            setExitInfo(fetchedData.resignationInformation); // Set exit information
        }
    }, [fetchedData]);

    const toggleEditExitInfo = () => setIsEditingExitInfo(!isEditingExitInfo)

    const handleSaveAddress = async () => {
        try {
            // Define the data to be sent to the API
            const data = {
                resignationInformation: exitInfo, // This is the updated exit information
            };

            // Call the API to update the exit information
            await updatePersonalData(data);

            // Close the editing form on success
            setIsEditingExitInfo(false);
        } catch (error) {
            console.error("Error updating exit information", error);
        }
    };
    return (
      <div>
        <div className="border shadow-lg rounded-lg p-5 relative bg-white">
          <p className="font-semibold text-lg md:text-base">Exit Information</p>
          <div
            onClick={toggleEditExitInfo}
            className="border rounded-2xl absolute right-3 top-3 text-xs text-gray-400 flex p-2 space-x-1 cursor-pointer hover:bg-gray-100 transition"
          >
            <p className="-mt-0.5">Edit</p> <PiPencilSimpleLineBold />
          </div>
          {isEditingExitInfo ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-y-3">
                <div>
                  <p className="text-gray-400">Resignation Letter Date</p>
                  <input
                    type="date"
                    value={exitInfo.resignationletterdate}
                    onChange={(e) =>
                      setExitInfo({
                        ...exitInfo,
                        resignationletterdate: e.target.value,
                      })
                    }
                    className="border rounded-md p-2"
                  />
                </div>
                <div>
                  <p className="text-gray-400">Exit Interview Date</p>
                  <input
                    type="date"
                    value={exitInfo.exitinterviewdate}
                    onChange={(e) =>
                      setExitInfo({
                        ...exitInfo,
                        exitinterviewdate: e.target.value,
                      })
                    }
                    className="border rounded-md p-2"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-y-3">
                <div>
                  <p className="text-gray-400">Relieving Date</p>
                  <input
                    type="date"
                    value={exitInfo.relievingdate}
                    onChange={(e) =>
                      setExitInfo({
                        ...exitInfo,
                        relievingdate: e.target.value,
                      })
                    }
                    className="border rounded-md p-2"
                  />
                </div>
                <div>
                  <p className="text-gray-400">Leave Encashed</p>
                  <input
                    type="text"
                    value={exitInfo.leaveencashed}
                    onChange={(e) =>
                      setExitInfo({
                        ...exitInfo,
                        leaveencashed: e.target.value,
                      })
                    }
                    className="border rounded-md p-2"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-y-3">
                <div>
                  <p className="text-gray-400">New Workplace</p>
                  <input
                    type="text"
                    value={exitInfo.newworkplace}
                    onChange={(e) =>
                      setExitInfo({ ...exitInfo, newworkplace: e.target.value })
                    }
                    className="border rounded-md p-2"
                  />
                </div>
                <div>
                  <p className="text-gray-400">Reason for Leaving</p>
                  <input
                    type="text"
                    value={exitInfo.reasonforleaving}
                    onChange={(e) =>
                      setExitInfo({
                        ...exitInfo,
                        reasonforleaving: e.target.value,
                      })
                    }
                    className="border rounded-md p-2"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-y-3">
                <div>
                  <p className="text-gray-400">Feedback</p>
                  <input
                    type="text"
                    value={exitInfo.feedback}
                    onChange={(e) =>
                      setExitInfo({ ...exitInfo, feedback: e.target.value })
                    }
                    className="border rounded-md p-2"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-3">
                <button
                  onClick={toggleEditExitInfo}
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
                  <p className="text-gray-400">Resignation Letter</p>
                  <p>{exitInfo.resignationletterdate}</p>
                </div>
                <div>
                  <p className="text-gray-400">Exit Interview Date</p>
                  <p>{exitInfo.exitinterviewdate}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-y-3">
                <div>
                  <p className="text-gray-400">Relieving Date</p>
                  <p>{exitInfo.relievingdate}</p>
                </div>
                <div>
                  <p className="text-gray-400">Leave Encashed</p>
                  <p>{exitInfo.leaveencashed}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-y-3">
                <div>
                  <p className="text-gray-400">New Workplace</p>
                  <p>{exitInfo.newworkplace}</p>
                </div>
                <div>
                  <p className="text-gray-400">Reason for Leaving</p>
                  <p>{exitInfo.reasonforleaving}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-y-3">
                <div>
                  <p className="text-gray-400">Feedback</p>
                  <p>{exitInfo.feedback}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
}

export default Exit_Info