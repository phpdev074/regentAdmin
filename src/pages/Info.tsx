import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import { getUserInfoMap } from "../api/helper";
import { FiGlobe, FiPhone, FiArchive } from 'react-icons/fi';

interface BusinessData {
  userImage?: string;
  businessName: string;
  name: string;
  website?: string;
  linkedin?: string;
  mobileNumber?: string;
  businessLic?: string;
  businessAddress: string;
  location: {
    coordinates: [number, number];
  };
  userId?: { name: string };
}

const Info: React.FC = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [infoData, setInfoData] = useState<BusinessData | null>(null);

  const [mapCenter, setMapCenter] = useState({ lat: 30.7046, lng: 76.7179 });
  const [markerVisible, setMarkerVisible] = useState(false);

  useEffect(() => {
    if (id) {
      getBusinessData();
    }
  }, [id]);

  const getBusinessData = async () => {
    try {
      const response = await getUserInfoMap(id);
      const data = response?.data?.data;
      setInfoData(data);

      const coordinates = data?.location?.coordinates;
      if (coordinates?.length === 2) {
        setMapCenter({ lat: coordinates[1], lng: coordinates[0] });
        setMarkerVisible(true);
      } else {
        setMarkerVisible(false);
      }
    } catch (error) {
      console.error("Error fetching business data:", error);
    }
  };

  if (!infoData)
    return <div className="text-center text-lg font-semibold">Loading...</div>;
  console.log(infoData, "infoData====");
  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-6">
      <div className="w-full max-w-sm  rounded-2xl text-center">
        <div className="flex justify-center mt-6">
          <img
            src={
              infoData?.userImage ||
              "https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png"
            }
            alt="Profile"
            className="w-20 h-20 rounded-full border-2 border-gray-300"
          />
        </div>

        <h2 className="text-xl font-semibold mt-3">
          {infoData.name || "Unknown Name"}
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Owner at {infoData.userId?.name || "Unknown Business"}
        </p>
        <div className="px-[17px] mb-[42px]">
          <div className="border border-[#000000] rounded-[8px] overflow-hidden w-full text-[14px] text-[#000000] font-medium ">
          
            {infoData?.website && (
              <div className="flex items-center px-[12px] py-[12px] border-b border-[#000000]">
                 <FiGlobe className="mr-[12px]" size={18}/>
                <span className="truncate">{infoData?.website}</span>
              </div>
            )}

            <div className="flex items-center px-[12px] py-[12px] border-b border-[#000000]">
             <FiPhone className="mr-[12px]" size={18}/>
              <span className="truncate">{infoData?.userId?.mobileNumber}</span>
            </div>

            {infoData?.businessLic && (
              <div className="flex items-center px-[12px] py-[12px]">
             <LicenseIcon className="mr-[12px]" />
                <span className="truncate">Lic. #{infoData?.businessLic}</span>
              </div>
            )}
          </div>
        </div>
        <div className="my-4 mx-4 h-48 rounded-2xl overflow-hidden border border-gray-300 border border-[#000000] rounded-[8px]">
          <LoadScript googleMapsApiKey="AIzaSyBTgjMWeFMxL5oe-KFnKts3YGBZJlEC6eM">
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "100%" }}
              zoom={14}
              center={mapCenter}
            >
              {markerVisible && <MarkerF position={mapCenter} />}
            </GoogleMap>
          </LoadScript>
        </div>

        <p className="text-sm text-gray-700 mb-6">
          {infoData.businessAddress || "No address available"}
        </p>
      </div>
    </div>
  );
};

export default Info;
const LicenseIcon = ({ className }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Top rounded lines */}
    <rect x="7" y="3" width="10" height="2" rx="1" fill="currentColor" />
    <rect x="5" y="6" width="14" height="2" rx="1" fill="currentColor" />
    
    {/* Outer box */}
    <path d="M4 9H20L18.5 21H5.5L4 9Z" />

    {/* Inner horizontal bar */}
    <rect x="10" y="14" width="4" height="2" rx="1" fill="currentColor" stroke="none" />
  </svg>
);
