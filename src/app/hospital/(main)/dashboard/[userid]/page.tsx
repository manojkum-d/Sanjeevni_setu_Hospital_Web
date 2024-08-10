"use client";
import React from "react";
import { useParams } from "next/navigation";
import Documents_card from "@/components/component/Documents_card";
import Health_metrics_card from "@/components/component/Health_metrics_card";
import Lab_reports_card from "@/components/component/Lab_reports_card";
import Medical_reminders_card from "@/components/component/Medical_reminders_card";
import Patient_profile_card from "@/components/component/Patient_profile_card";
import Prediction_card from "@/components/component/Prediction_card";
import Prescription_card from "@/components/component/Prescription_card";

const Page: React.FC = () => {
  const params = useParams();

  // Log all params to debug
  // console.log("All params:", params);

  // Extract the userid from params
  const userid = params.userid as string | undefined;

  // console.log("userid:", userid);

  if (!userid) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        Fetching user data...
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-100">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Patient_profile_card userId={userid} />
          <Health_metrics_card userId={userid} />

          <Documents_card userId={userid} />
          {/* <Medical_reminders_card userid={userid} />
          <Prescription_card userid={userid} />
          <Lab_reports_card userid={userid} />
          <Prediction_card userid={userid} />  */}
        </div>
      </main>
    </div>
  );
};

export default Page;
