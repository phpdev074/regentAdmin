import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import { getUserInfoMap } from "../api/helper";
import { FiGlobe, FiPhone, FiLinkedin } from "react-icons/fi";

interface BusinessData {
  userImage?: string;
  businessName: string;
  name: string;
  website?: string;
  linkedin?: string;
  mobileNumber?: string;
  businessLic?: string;
  businessAddress: string;
  businessLogo?: string;
  businessContect?: string;
  businessEmail?: string;
  industry?: string;
  location: {
    coordinates: [number, number];
  };
  userId?: { name: string };
}

const Info: React.FC = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [infoData, setInfoData] = useState<BusinessData | null>(null);

  console.log("==>infoData", infoData);

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
        // coordinates[1] is latitude, coordinates[0] is longitude
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
  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');
          html, body {
            margin: 0;
            padding: 0;
            background-color: transparent !important;
          }
        `}
      </style>
      <div
        className="w-full min-h-screen text-center px-2 py-4"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        {/* Profile Image */}
        <div className="flex justify-center mt-2">
          <img
            src={
              infoData?.businessLogo ||
              "https://reagent.s3.us-west-2.amazonaws.com/64533be8-1c89-4309-83d7-97bd1db9e3c7_userimage.jpg"
            }
            alt="Profile"
            className="w-[96px] h-[96px] rounded-full object-cover"
          />
        </div>

        {/* Name + Business */}
        <h2 className="text-[26px] font-[500] text-black mt-4 px-2">
          {infoData?.userId?.name || "Unknown Name"}
        </h2>
        <p className="text-[17px] text-[#333] font-[400] mt-1 mb-6 px-2">
          Owner at {infoData?.businessName || "Unknown Business"}
        </p>

        {/* Info Boxes */}
        <div className="mb-6 px-2">
          <div className="border border-black rounded-[8px] overflow-hidden flex flex-col divide-y divide-black bg-white">
            {infoData?.website && (
              <div className="flex items-center px-4 py-3">
                <FiGlobe className="mr-4 text-black shrink-0" size={22} strokeWidth={2} />
                <span className="truncate text-[15px] font-[500] text-black">{infoData?.website}</span>
              </div>
            )}

            {infoData?.linkedin && (
              <div className="flex items-center px-4 py-3">
                <FiGlobe className="mr-4 text-black shrink-0" size={22} strokeWidth={2} />
                <span className="truncate text-[15px] font-[500] text-black">{infoData?.linkedin}</span>
              </div>
            )}

            {infoData?.businessContect && (
              <div className="flex items-center px-4 py-3">
                <FiPhone className="mr-4 text-black shrink-0" size={22} strokeWidth={2} />
                <span className="truncate text-[15px] font-[500] text-black">{infoData?.businessContect}</span>
              </div>
            )}

            {infoData?.businessLic && (
              <div className="flex items-center px-4 py-3">
                <LicenseIcon className="mr-4 text-black shrink-0" />
                <span className="truncate text-[15px] font-[500] text-black">Lic. #{infoData?.businessLic}</span>
              </div>
            )}
          </div>
        </div>

        {/* Map */}
        <div className="h-[200px] rounded-[16px] overflow-hidden border border-gray-500 mb-4 mx-2">
          <LoadScript googleMapsApiKey="AIzaSyAgxLFYeAyJJ7c8ftgiDb9f_WUfpxyePNk">
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "100%" }}
              zoom={14}
              center={mapCenter}
            >
              {markerVisible && <MarkerF position={mapCenter} />}
            </GoogleMap>
          </LoadScript>
        </div>

        {/* Address */}
        <p className="text-[15px] text-[#333] mt-2 mb-6 px-4 font-[400]">
          {infoData.businessAddress || "No address available"}
        </p>
      </div>
    </>
  );
};

export default Info;

const LicenseIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="7" y="3" width="10" height="2" rx="1" fill="currentColor" />
    <rect x="5" y="6" width="14" height="2" rx="1" fill="currentColor" />
    <path d="M4 9H20L18.5 21H5.5L4 9Z" />
    <rect
      x="10"
      y="14"
      width="4"
      height="2"
      rx="1"
      fill="currentColor"
      stroke="none"
    />
  </svg>
);
