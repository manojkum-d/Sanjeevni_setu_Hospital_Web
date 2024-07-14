import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function Medical_reminders_card() {
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
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Amoxicillin</div>
              <div className="text-xs text-muted-foreground">
                Take 2 capsules, 3 times a day
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              Next dose: 2:00 PM
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Metformin</div>
              <div className="text-xs text-muted-foreground">
                Take 1 tablet, twice a day
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              Next dose: 6:00 PM
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Atorvastatin</div>
              <div className="text-xs text-muted-foreground">
                Take 1 tablet, once a day
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              Next dose: 8:00 AM
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
