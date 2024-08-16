"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getCookie } from "cookies-next";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

interface MedicalRemindersCardProps {
  userId: string;
}

interface MedicationReminder {
  _id: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  nextDose: string;
  documentUrl?: string;
}

const Medical_reminders_card: React.FC<MedicalRemindersCardProps> = ({
  userId,
}) => {
  const [medicationReminders, setMedicationReminders] = useState<
    MedicationReminder[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMedicationReminders = async () => {
      try {
        const token = getCookie("accessToken") as string;
        const response = await axios.get(
          `https://sanjeeveni-setu-backend.onrender.com/api/medication-reminders/hospital/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMedicationReminders(response.data.medicationReminders);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchMedicationReminders();
    } else {
      setError("No user ID provided");
      setIsLoading(false);
    }
  }, [userId]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <Skeleton className="h-8 w-[200px]" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[1, 2, 3].map((index) => (
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

  if (!medicationReminders.length) {
    return <div>No medication reminders available for User ID: {userId}</div>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">
          Medication Reminders
        </CardTitle>
        <Link
          href="#"
          className="text-sm text-muted-foreground hover:text-foreground"
          prefetch={false}
        >
          View all
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {medicationReminders.map((reminder) => (
            <div
              key={reminder._id}
              className="flex items-center justify-between"
            >
              <div>
                <div className="text-sm font-medium">
                  {reminder.medicationName}
                </div>
                <div className="text-xs text-muted-foreground">
                  {reminder.dosage}, {reminder.frequency}
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                Next dose:{" "}
                {new Date(reminder.nextDose).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Medical_reminders_card;
