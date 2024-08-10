import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { User } from "@nextui-org/react";
import { getCookie } from "cookies-next";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

interface PatientProfileCardProps {
  userId: string;
}

interface PatientData {
  _id: string;
  userId: string;
  bloodType: string;
  allergies: string[];
  primaryCarePhysician: string;
  surgeries: string[];
  pastMedicalHistory: string[];
  relatives: {
    name: string;
    relation: string;
    phoneNumber: string;
    _id: string;
  }[];
  communicableDiseases: string[];
}

interface UserProfileData {
  fullName: string;
  email: string;
  gender: string;
  dateOfBirth: string;
}

interface QRCodeData {
  qrCode: string;
  qrImageUrl: string;
  userId: string;
}

const PatientProfileCard: React.FC<PatientProfileCardProps> = ({ userId }) => {
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [userProfileData, setUserProfileData] =
    useState<UserProfileData | null>(null);
  const [qrCodeData, setQRCodeData] = useState<QRCodeData | null>(null); // Added QR code data state
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        console.log("Starting to fetch data");
        setIsLoading(true);
        const token = getCookie("accessToken") as string;

        // Fetch patient profile details
        const patientUrl = `http://localhost:8000/api/users/userprofile/hospital/${userId}`;
        const patientResponse = await axios.get(patientUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPatientData(patientResponse.data);

        // Fetch user profile details (name, email, etc.)
        const profileUrl = `http://localhost:8000/api/users/hospital/profile/${userId}`;
        const profileResponse = await axios.get(profileUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserProfileData(profileResponse.data);

        // Fetch QR code data
        const qrCodeUrl = `http://localhost:8000/api/hospitals/get-qr-code/${userId}`;
        const qrCodeResponse = await axios.get(qrCodeUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setQRCodeData(qrCodeResponse.data);
        //  const url =  qrCodeData!.qrImageUrl
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      } finally {
        console.log("Finished fetching data");
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchPatientData();
    } else {
      setError("No user ID provided");
      setIsLoading(false);
    }
  }, [userId]);

  console.log("Current loading state:", isLoading);

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <Skeleton className="h-8 w-[200px]" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {[1, 2, 3, 4, 5].map((index) => (
              <Skeleton key={index} className="h-4 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!patientData || !userProfileData) {
    return <div>No patient data available for User ID: {userId}</div>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-4xl font-extrabold">
          Patient Profile
        </CardTitle>
      </CardHeader>
      <CardContent>
        <User
          name={userProfileData.fullName}
          description={userProfileData.email}
          avatarProps={{
            src: "https://github.com/shadcn.png",
            size: "lg",
          }}
        />
        <div className="mt-2 text-sm text-muted-foreground">
          <div>
            <strong>User ID:</strong> {patientData.userId}
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <div className="text-sm">
            <strong>Blood Type:</strong> {patientData.bloodType}
          </div>
          <div className="text-sm">
            <strong>Allergies:</strong> {patientData.allergies.join(", ")}
          </div>
          <div className="text-sm">
            <strong>Primary Care Physician:</strong>{" "}
            {patientData.primaryCarePhysician}
          </div>
          <div className="text-sm">
            <strong>Surgeries:</strong> {patientData.surgeries.join(", ")}
          </div>
          <div className="text-sm">
            <strong>Past Medical History:</strong>{" "}
            {patientData.pastMedicalHistory.join(", ")}
          </div>
          <div className="text-sm">
            <strong>Relatives:</strong>
            <ul className="list-disc pl-4">
              {patientData.relatives.map((relative) => (
                <li key={relative._id}>
                  {relative.name} ({relative.relation}), {relative.phoneNumber}
                </li>
              ))}
            </ul>
          </div>
          <div className="text-sm">
            <strong>Communicable Diseases:</strong>{" "}
            {patientData.communicableDiseases.join(", ")}
          </div>
          {/* QR Code Section */}
          {qrCodeData && (
            <div className="mt-4">
              <strong>QR Code:</strong>
              <div className="mt-2">
                <Image
                  src={qrCodeData.qrImageUrl}
                  alt={`QR Code for ${qrCodeData.userId}`}
                  width={100}
                  height={100}
                  className="w-48 h-48"
                />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientProfileCard;
