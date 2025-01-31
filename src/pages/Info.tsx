import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Marker, GoogleMap, LoadScript } from "@react-google-maps/api";
import { getUserInfoMap } from "../api/helper";

interface BusinessData {
    userImage?: string;
    businessName: string;
    name: string;
    website?: string;
    email?: string;
    mobileNumber?: string;
    businessLic?: string;
    businessAddress: string;
    location: {
        coordinates: [number, number];
    };
}

const Info: React.FC = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const [infoData, setInfoData] = useState<BusinessData | null>(null);
    const defaultLocation = { lat: 30.7232768, lng: 76.7000576 };
    const [defaultCenter, setDefaultCenter] = useState(defaultLocation);

    useEffect(() => {
        if (id) {
            getBusinessData();
        }
    }, [id]);

    const getBusinessData = async () => {
        try {
            const response = await getUserInfoMap(id);
            setInfoData(response?.data?.data);
            const data = response?.data?.data?.location?.coordinates;
            if (data?.length === 2) {
                setDefaultCenter({ lat: data[1], lng: data[0] });
            }
        } catch (error) {
            console.error("Error fetching business data:", error);
        }
    };

    if (!infoData) return <div className="text-center text-lg font-semibold">Loading...</div>;

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-xl text-center font-sans">
                {/* Profile Image */}
                <img
                    src={infoData?.userImage || "https://via.placeholder.com/80"}
                    alt="Profile"
                    className="w-24 h-24 rounded-full mx-auto"
                />

                <h2 className="text-2xl mt-3 mb-1 font-semibold">{infoData.businessName}</h2>
                <p className="text-sm text-gray-600 mb-2">Owner at {infoData.name}</p>

                {/* Contact Info */}
                <div className="text-left space-y-2 my-4">
                    {infoData.website && (
                        <div className="flex items-center text-sm">
                            <span className="mr-2 text-xl">🌐</span>
                            <a href={infoData.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                {infoData.website}
                            </a>
                        </div>
                    )}
                    {infoData.email && (
                        <div className="flex items-center text-sm">
                            <span className="mr-2 text-xl">✉️</span>
                            {infoData.email}
                        </div>
                    )}
                    {infoData.mobileNumber && (
                        <div className="flex items-center text-sm">
                            <span className="mr-2 text-xl">📞</span>
                            {infoData.mobileNumber}
                        </div>
                    )}
                    {infoData.businessLic && (
                        <div className="flex items-center text-sm">
                            <span className="mr-2 text-xl">🆔</span>
                            {infoData.businessLic}
                        </div>
                    )}
                </div>

                {/* Google Map */}
                <div className="my-4 w-full h-60 rounded-lg overflow-hidden">
                    <LoadScript googleMapsApiKey="AIzaSyBTgjMWeFMxL5oe-KFnKts3YGBZJlEC6eM">
                        <GoogleMap
                            mapContainerStyle={{ width: '100%', height: '100%' }}
                            zoom={14}
                            center={defaultCenter} // Default or updated location
                        >
                            <Marker position={defaultCenter} />
                            <Marker position={defaultLocation} label="Default" /> 
                        </GoogleMap>
                    </LoadScript>
                </div>

                {/* Address */}
                <p className="text-sm text-gray-700 my-2">{infoData.businessAddress}</p>
            </div>
        </div>
    );
};

export default Info;
