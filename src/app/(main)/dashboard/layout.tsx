"use client";
import Documents_card from "@/components/component/Documents_card";
import Health_metrics_card from "@/components/component/Health_metrics_card";
import Lab_reports_card from "@/components/component/Lab_reports_card";
import Medical_reminders_card from "@/components/component/Medical_reminders_card";
import Patient_profile_card from "@/components/component/Patient_profile_card";
import Prediction_card from "@/components/component/Prediction_card";
import Prescription_card from "@/components/component/Prescription_card";

export default function Dashboard() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-100">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Patient_profile_card />
          <Health_metrics_card />
          <Documents_card />
          <Medical_reminders_card />
          <Prescription_card />
          <Lab_reports_card />
          <Prediction_card />
        </div>
      </main>
    </div>
  );
}
