import React, { useEffect, useState } from 'react'
import { PiPencilSimpleLineBold } from "react-icons/pi";
import { usePersonaldataMutation, useGetPersonaldataQuery } from '../../../redux/slices/api/userApiSlice';

function Bank_Info() {
    const [isEditingBankInfo, setIsEditingBankInfo] = useState(false);
    const [updatePersonalData, { isLoading }] = usePersonaldataMutation();
    const { data: fetchedData, isLoading: isFetching, error } = useGetPersonaldataQuery();

    const [bankInfo, setBankInfo] = useState({
        bankholdername: '',
        accountnumber: '',
        ifsccode: '',
        bankname: ''
    });

    const toggleEditBankInfo = () => setIsEditingBankInfo(!isEditingBankInfo);
    const handleSaveAddress = async () => {
        try {
            // Define the data to be sent to the API
            const data = {
                bankInformation: bankInfo, // This is the updated bank information
            };
            
            // Call the API to update the bank information
            await updatePersonalData(data);
        
            // Close the editing form on success
            setIsEditingBankInfo(false);
        } catch (error) {
            console.error("Error updating bank information", error);
        }
    };

    useEffect(() => {
        if (fetchedData?.bankInformation) {
            setBankInfo(fetchedData.bankInformation); // Set bank information
        }
    }, [fetchedData]);

    return (
        <div>
            <div className="border shadow-lg rounded-lg p-5 relative bg-white">
                <p className="font-semibold text-lg md:text-base">Bank Information</p>
                <div
                    onClick={toggleEditBankInfo}
                    className="border rounded-2xl absolute right-3 top-3 text-xs text-gray-400 flex p-2 space-x-1 cursor-pointer hover:bg-gray-100 transition"
                >
                    <p className="-mt-0.5">Edit</p> <PiPencilSimpleLineBold />
                </div>
                {isEditingBankInfo ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-y-3">
                            <div>
                                <p className="text-gray-400">Bank Holder Name</p>
                                <input
                                    type="text"
                                    value={bankInfo.bankholdername}
                                    onChange={(e) =>
                                        setBankInfo({ ...bankInfo, bankholdername: e.target.value })
                                    }
                                    className="border rounded-md p-2"
                                />
                            </div>
                            <div>
                                <p className="text-gray-400">Account Number</p>
                                <input
                                    type="text"
                                    value={bankInfo.accountnumber}
                                    onChange={(e) =>
                                        setBankInfo({ ...bankInfo, accountnumber: e.target.value })
                                    }
                                    className="border rounded-md p-2"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-y-3">
                            <div>
                                <p className="text-gray-400">IFSC Code</p>
                                <input
                                    type="text"
                                    value={bankInfo.ifsccode}
                                    onChange={(e) =>
                                        setBankInfo({ ...bankInfo, ifsccode: e.target.value })
                                    }
                                    className="border rounded-md p-2"
                                />
                            </div>
                            <div>
                                <p className="text-gray-400">Bank Name</p>
                                <input
                                    type="text"
                                    value={bankInfo.bankname}
                                    onChange={(e) =>
                                        setBankInfo({ ...bankInfo, bankname: e.target.value })
                                    }
                                    className="border rounded-md p-2"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3 mt-3">
                            <button
                                onClick={toggleEditBankInfo}
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
                                <p className="text-gray-400">Bank Holder Name</p>
                                <p>{bankInfo.bankholdername}</p>
                            </div>
                            <div>
                                <p className="text-gray-400">Account Number</p>
                                <p>{bankInfo.accountnumber}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-y-3">
                            <div>
                                <p className="text-gray-400">IFSC Code</p>
                                <p>{bankInfo.ifsccode}</p>
                            </div>
                            <div>
                                <p className="text-gray-400">Bank Name</p>
                                <p>{bankInfo.bankname}</p>
                            </div>
                        </div>

                    </>
                )}
            </div>

        </div>
    )
}

export default Bank_Info