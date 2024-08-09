import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { User } from "@nextui-org/react";
import { getCookie } from "cookies-next";

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

const PatientProfileCard: React.FC<PatientProfileCardProps> = ({ userId }) => {
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const token = getCookie("accessToken") as string;
        const url = `http://localhost:8000/api/users/userprofile/hospital/${userId}`;
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPatientData(response.data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      }
    };

    if (userId) {
      fetchPatientData();
    } else {
      setError("No user ID provided");
    }
  }, [userId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!patientData) {
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
          name={patientData.userId} // Note: The API response doesn't include name and gender
          description="Patient" // You might want to fetch this from another API
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
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientProfileCard;
