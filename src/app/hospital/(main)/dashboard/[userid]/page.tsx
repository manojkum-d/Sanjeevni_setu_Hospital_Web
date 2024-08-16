"use client";
import React from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Patient_profile_card from "@/components/component/patient_profile_card";
import Health_metrics_card from "@/components/component/health_metrics_card";
import DocumentsCard from "@/components/component/documentcard";
import Lab_reports_card from "@/components/component/lab_reports_card";
import Medical_reminders_card from "@/components/component/medical_reminders_card";
import Prescription_card from "@/components/component/prescription_card";
import Prediction_card from "@/components/component/prediction_card";
// import BlurFade from "@/components/magicui/blur-fade";

const Layout: React.FC = () => {
  const params = useParams();

  const userid = params.userid as string | undefined;

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
          <DocumentsCard userId={userid} />
          <Prescription_card userId={userid} />
          <Medical_reminders_card userId={userid} />
          <Lab_reports_card userId={userid} />
          <Prediction_card />
        </div>
      </main>
    </div>
  );
};

export default Layout;
