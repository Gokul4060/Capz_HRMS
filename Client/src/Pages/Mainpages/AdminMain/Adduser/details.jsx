import React from "react";
import { useParams } from "react-router-dom";
import { useGetProfileInfoByIdQuery } from "../../../../redux/slices/api/userApiSlice";
import {
  FiUser,
  FiPhone,
  FiInfo,
  FiBriefcase,
  FiCreditCard,
} from "react-icons/fi"; // Import icons
import { FaLocationArrow } from "react-icons/fa6";

const Details = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetProfileInfoByIdQuery(id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-gray-500 text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-lg">
          Error fetching profile information: {error.message}
        </div>
      </div>
    );
  }

  const {
    personalInformation,
    workInformation,
    contactInformation,
    hierarchyInformation,
    identityInformation,
    resignationInformation,
    bankInformation,
  } = data || {};

  // Extract the user's first and last name
  const userName =
    `${personalInformation?.firstName || ""} ${
      personalInformation?.lastName || ""
    }`.trim() || "User Profile";

  return (
    <div className="container mx-auto p-8">
      {/* Display the user's name dynamically in the heading */}
      <h2 className="text-3xl font-light bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white rounded-lg shadow-lg px-6 py-4 mb-8 border-b-4 border-green-700 flex items-center justify-between">
        {userName}'s Details
        <FiInfo size={28} className="text-white" />
      </h2>

      {/* Personal Information */}
      <div className="bg-white shadow-lg border rounded-xl p-6 mb-10 transition duration-300 hover:shadow-xl">
        <h3 className="text-lg font-semibold text-green-600 mb-4 border-b pb-2 flex items-center">
          <FiUser className="mr-2" /> Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center">
            <FaLocationArrow className="text-green-500 mr-2" />
            <p className="text-gray-500">
              First Name:{" "}
              <span className="text-gray-700">
                {personalInformation?.firstName || "N/A"}
              </span>
            </p>
          </div>
          <div className="flex items-center">
            <FaLocationArrow className="text-green-500 mr-2" />
            <p className="text-gray-500">
              Last Name:{" "}
              <span className="text-gray-700">
                {personalInformation?.lastName || "N/A"}
              </span>
            </p>
          </div>
          <div className="flex items-center">
            <FaLocationArrow className="text-green-500 mr-2" />
            <p className="text-gray-500">
              Age:{" "}
              <span className="text-gray-700">
                {personalInformation?.age || "N/A"}
              </span>
            </p>
          </div>
          <div className="flex items-center">
            <FaLocationArrow className="text-green-500 mr-2" />
            <p className="text-gray-500">
              Blood Group:{" "}
              <span className="text-gray-700">
                {personalInformation?.bloodgroup || "N/A"}
              </span>
            </p>
          </div>
          <div className="flex items-center">
            <FaLocationArrow className="text-green-500 mr-2" />
            <p className="text-gray-500">
              Marital Status:{" "}
              <span className="text-gray-700">
                {personalInformation?.maritalstatus || "N/A"}
              </span>
            </p>
          </div>
          <div className="flex items-center">
            <FaLocationArrow className="text-green-500 mr-2" />
            <p className="text-gray-500">
              Expertise:{" "}
              <span className="text-gray-700">
                {personalInformation?.expertise || "N/A"}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Work Information */}
      <div className="bg-white shadow-lg border rounded-xl p-6 mb-10 transition duration-300 hover:shadow-xl">
        <h3 className="text-lg font-semibold text-green-600 mb-4 border-b pb-2 flex items-center">
          <FiBriefcase className="mr-2" /> Work Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center">
            <FaLocationArrow className="text-green-500 mr-2" />
            <p className="text-gray-500">
              Role:{" "}
              <span className="text-gray-700">
                {workInformation?.role || "N/A"}
              </span>
            </p>
          </div>
          <div className="flex items-center">
            <FaLocationArrow className="text-green-500 mr-2" />
            <p className="text-gray-500">
              Department:{" "}
              <span className="text-gray-700">
                {workInformation?.department || "N/A"}
              </span>
            </p>
          </div>
          <div className="flex items-center">
            <FaLocationArrow className="text-green-500 mr-2" />
            <p className="text-gray-500">
              Location:{" "}
              <span className="text-gray-700">
                {workInformation?.location || "N/A"}
              </span>
            </p>
          </div>
          <div className="flex items-center">
            <FaLocationArrow className="text-green-500 mr-2" />
            <p className="text-gray-500">
              Designation:{" "}
              <span className="text-gray-700">
                {workInformation?.designation || "N/A"}
              </span>
            </p>
          </div>
          <div className="flex items-center">
            <FaLocationArrow className="text-green-500 mr-2" />
            <p className="text-gray-500">
              Employee Type:{" "}
              <span className="text-gray-700">
                {workInformation?.employeetype || "N/A"}
              </span>
            </p>
          </div>
          <div className="flex items-center">
            <FaLocationArrow className="text-green-500 mr-2" />
            <p className="text-gray-500">
              Employee Status:{" "}
              <span className="text-gray-700">
                {workInformation?.employeestatus || "N/A"}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white shadow-lg border rounded-xl p-6 mb-10 transition duration-300 hover:shadow-xl">
        <h3 className="text-lg font-semibold text-green-600 mb-4 border-b pb-2 flex items-center">
          <FiPhone className="mr-2" /> Contact Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center">
            <FaLocationArrow className="text-green-500 mr-2" />
            <p className="text-gray-500">
              Work Phone:{" "}
              <span className="text-gray-700">
                {contactInformation?.workphonenumber || "N/A"}
              </span>
            </p>
          </div>
          <div className="flex items-center">
            <FaLocationArrow className="text-green-500 mr-2" />
            <p className="text-gray-500">
              Email:{" "}
              <span className="text-gray-700">
                {contactInformation?.personalemailaddress || "N/A"}
              </span>
            </p>
          </div>
          <div className="flex items-center">
            <FaLocationArrow className="text-green-500 mr-2" />
            <p className="text-gray-500">
              Present Address:{" "}
              <span className="text-gray-700">
                {contactInformation?.presentaddress || "N/A"}
              </span>
            </p>
          </div>
          <div className="flex items-center">
            <FaLocationArrow className="text-green-500 mr-2" />
            <p className="text-gray-500">
              Permanent Address:{" "}
              <span className="text-gray-700">
                {contactInformation?.permanentaddress || "N/A"}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Hierarchy Information */}
      <div className="bg-white shadow-lg border rounded-xl p-6 mb-10 transition duration-300 hover:shadow-xl">
        <h3 className="text-lg font-semibold text-green-600 mb-4 border-b pb-2 flex items-center">
          <FiUser className="mr-2" /> Hierarchy Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center">
            <FaLocationArrow className="text-green-500 mr-2" />
            <p className="text-gray-500">
              Reporting Manager:{" "}
              <span className="text-gray-700">
                {hierarchyInformation?.reportingmanager || "N/A"}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Identity Information */}
      <div className="bg-white shadow-lg border rounded-xl p-6 mb-10 transition duration-300 hover:shadow-xl">
        <h3 className="text-lg font-semibold text-green-600 mb-4 border-b pb-2 flex items-center">
          <FiCreditCard className="mr-2" /> Identity Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center">
            <FaLocationArrow className="text-green-500 mr-2" />
            <p className="text-gray-500">
              UAN:{" "}
              <span className="text-gray-700">
                {identityInformation?.uan || "N/A"}
              </span>
            </p>
          </div>
          <div className="flex items-center">
            <FaLocationArrow className="text-green-500 mr-2" />
            <p className="text-gray-500">
              PAN:{" "}
              <span className="text-gray-700">
                {identityInformation?.pan || "N/A"}
              </span>
            </p>
          </div>
          <div className="flex items-center">
            <FaLocationArrow className="text-green-500 mr-2" />
            <p className="text-gray-500">
              Aadhar Number:{" "}
              <span className="text-gray-700">
                {identityInformation?.aadhar || "N/A"}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Bank Information */}
      <div className="bg-white shadow-lg border rounded-xl p-6 mb-10 transition duration-300 hover:shadow-xl">
        <h3 className="text-lg font-semibold text-green-600 mb-4 border-b pb-2 flex items-center">
          <FiCreditCard className="mr-2" /> Bank Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center">
            <FaLocationArrow className="text-green-500 mr-2" />
            <p className="text-gray-500">
              Bank Name:{" "}
              <span className="text-gray-700">
                {bankInformation?.bankname || "N/A"}
              </span>
            </p>
          </div>
          <div className="flex items-center">
            <FaLocationArrow className="text-green-500 mr-2" />
            <p className="text-gray-500">
              Account Number:{" "}
              <span className="text-gray-700">
                {bankInformation?.accountnumber || "N/A"}
              </span>
            </p>
          </div>
          <div className="flex items-center">
            <FaLocationArrow className="text-green-500 mr-2" />
            <p className="text-gray-500">
              IFSC Code:{" "}
              <span className="text-gray-700">
                {bankInformation?.ifsccode || "N/A"}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Resignation Information */}
      <div className="bg-white shadow-lg border rounded-xl p-6 mb-10 transition duration-300 hover:shadow-xl">
        <h3 className="text-lg font-semibold text-green-600 mb-4 border-b pb-2 flex items-center">
          <FiUser className="mr-2" /> Resignation Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center">
            <FaLocationArrow className="text-green-500 mr-2" />
            <p className="text-gray-500">
              Resignation Letter Date:{" "}
              <span className="text-gray-700">
                {resignationInformation?.resignationletterdate || "N/A"}
              </span>
            </p>
          </div>
          <div className="flex items-center">
            <FaLocationArrow className="text-green-500 mr-2" />
            <p className="text-gray-500">
              Exit Interview Date:{" "}
              <span className="text-gray-700">
                {resignationInformation?.exitinterviewdate || "N/A"}
              </span>
            </p>
          </div>
          <div className="flex items-center">
            <FaLocationArrow className="text-green-500 mr-2" />
            <p className="text-gray-500">
              Relieving Date:{" "}
              <span className="text-gray-700">
                {resignationInformation?.relievingdate || "N/A"}
              </span>
            </p>
          </div>
          <div className="flex items-center">
            <FaLocationArrow className="text-green-500 mr-2" />
            <p className="text-gray-500">
              Leave Encashment:{" "}
              <span className="text-gray-700">
                {resignationInformation?.leaveencashed || "N/A"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
