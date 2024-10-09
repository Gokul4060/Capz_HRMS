import React, { useEffect, useState } from 'react'
import { PiPencilSimpleLineBold } from "react-icons/pi";
import { usePersonaldataMutation,useGetPersonaldataQuery } from '../../../redux/slices/api/userApiSlice';

function Contact() {
    const [isEditingContactDetails, setIsEditingContactDetails] = useState(false);
    const [updatePersonalData, { isLoading }] = usePersonaldataMutation();
    const { data: fetchedData, isLoading: isFetching, error } = useGetPersonaldataQuery();

    const [contactInfo, setContactInfo] = useState({
        workphonenumber: '',
        extension: '',
        seatinglocation: '',
        presentaddress: '',
        permanentaddress: '',
        personalmobilenumber: '',
        personalemailaddress: ''
    });

    const toggleEditContactDetails = () => setIsEditingContactDetails(!isEditingContactDetails);

    const handleSaveAddress = async () => {
        try {
            // Define the data to be sent to the API
            const data = {
                contactInformation: contactInfo, // This is the updated contact information
            };
            
            // Call the API to update the contact information
            await updatePersonalData(data);
        
            // Close the editing form on success
            setIsEditingContactDetails(false);
        } catch (error) {
            console.error("Error updating contact information", error);
        }
    };
    
    useEffect(() => {
        if (fetchedData?.contactInformation) {
            setContactInfo(fetchedData.contactInformation); // Set contact information
        }
    }, [fetchedData]);
    

    return (
      <div>
        <div className="border shadow-lg rounded-lg p-5 relative bg-white">
          <p className="font-semibold text-lg md:text-base">Contact Details</p>
          <div
            onClick={toggleEditContactDetails}
            className="border rounded-2xl absolute right-3 top-3 text-xs text-gray-400 flex p-2 space-x-1 cursor-pointer hover:bg-gray-100 transition"
          >
            <p className="-mt-0.5">Edit</p> <PiPencilSimpleLineBold />
          </div>
          {isEditingContactDetails ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-y-3">
                <div>
                  <p className="text-gray-400">Work Phone Number</p>
                  <input
                    type="text"
                    value={contactInfo.workphonenumber}
                    onChange={(e) =>
                      setContactInfo({
                        ...contactInfo,
                        workphonenumber: e.target.value,
                      })
                    }
                    className="border rounded-md p-2"
                  />
                </div>
                <div>
                  <p className="text-gray-400">Extension</p>
                  <input
                    type="text"
                    value={contactInfo.extension}
                    onChange={(e) =>
                      setContactInfo({
                        ...contactInfo,
                        extension: e.target.value,
                      })
                    }
                    className="border rounded-md p-2"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-y-3">
                <div>
                  <p className="text-gray-400">Seating Location</p>
                  <input
                    type="text"
                    value={contactInfo.seatinglocation}
                    onChange={(e) =>
                      setContactInfo({
                        ...contactInfo,
                        seatinglocation: e.target.value,
                      })
                    }
                    className="border rounded-md p-2"
                  />
                </div>
                <div>
                  <p className="text-gray-400">Present Address</p>
                  <input
                    type="text"
                    value={contactInfo.presentaddress}
                    onChange={(e) =>
                      setContactInfo({
                        ...contactInfo,
                        presentaddress: e.target.value,
                      })
                    }
                    className="border rounded-md p-2"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-y-3">
                  <div>
                    <p className="text-gray-400">Permanent Address</p>
                    <input
                      type="text"
                      value={contactInfo.permanentaddress}
                      onChange={(e) =>
                        setContactInfo({
                          ...contactInfo,
                          permanentaddress: e.target.value,
                        })
                      }
                      className="border rounded-md p-2"
                    />
                  </div>
                </div>
                <div>
                  <p className="text-gray-400">Personal Mobile Number</p>
                  <input
                    type="text"
                    value={contactInfo.personalmobilenumber}
                    onChange={(e) =>
                      setContactInfo({
                        ...contactInfo,
                        personalmobilenumber: e.target.value,
                      })
                    }
                    className="border rounded-md p-2"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-y-3">
                <div>
                  <p className="text-gray-400">Personal Email Address</p>
                  <input
                    type="text"
                    value={contactInfo.personalemailaddress}
                    onChange={(e) =>
                      setContactInfo({
                        ...contactInfo,
                        personalemailaddress: e.target.value,
                      })
                    }
                    className="border rounded-md p-2"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-3">
                <button
                  onClick={toggleEditContactDetails}
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
                  <p className="text-gray-400">Work Phone Number</p>
                  <p>{contactInfo.workphonenumber}</p>
                </div>
                <div>
                  <p className="text-gray-400">Extension</p>
                  <p>{contactInfo.extension}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-y-3">
                <div>
                  <p className="text-gray-400">Seating Location</p>
                  <p>{contactInfo.seatinglocation}</p>
                </div>
                <div>
                  <p className="text-gray-400">Present Address</p>
                  <p>{contactInfo.presentaddress}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-y-3">
                <div>
                  <p className="text-gray-400">Permanent Address</p>
                  <p>{contactInfo.permanentaddress}</p>
                </div>
                <div>
                  <p className="text-gray-400">Personal Mobile Number</p>
                  <p>{contactInfo.personalmobilenumber}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-y-3">
                <div>
                  <p className="text-gray-400">Personal Email Address</p>
                  <p>{contactInfo.personalemailaddress}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
}

export default Contact