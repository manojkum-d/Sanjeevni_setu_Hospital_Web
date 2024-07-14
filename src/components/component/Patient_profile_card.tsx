import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { User } from "@nextui-org/react";
export default function Patient_profile_card() {
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-4xl font-extrabold">
            Patient Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <User
            name="Manoj kumar d"
            description="Male"
            avatarProps={{
              src: "https://github.com/shadcn.png",
              size: "lg",
            }}
          />
          <div className="">
            <div>
              <div className=" mt-2 text-sm text-muted-foreground">
                <div>
                  <strong>Age:</strong> 45
                </div>

                <div>
                  <strong>Contact:</strong> (123) 456-7890
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="text-sm">
              <strong>Blood Type:</strong> O+
            </div>
            <div className="text-sm">
              <strong>Allergies:</strong> Penicillin
            </div>
            <div className="text-sm">
              <strong>Primary Care Physician:</strong> Dr. Smith
            </div>
            <div className="text-sm">
              <strong>Surgeries:</strong> Appendectomy
            </div>
            <div className="text-sm">
              <strong>Past Medical History:</strong> Diabetes, Hypertension
            </div>
            <div className="text-sm">
              <strong>Relatives:</strong>
              <ul className="list-disc pl-4">
                <li>Wife: Jane Doe, (987) 654-3210</li>
                <li>Son: John Doe Jr., (456) 789-0123</li>
                <li>Daughter: Sarah Doe, (321) 987-6543</li>
              </ul>
            </div>
            <div className="text-sm">
              <strong>Communicable Diseases:</strong> None
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
