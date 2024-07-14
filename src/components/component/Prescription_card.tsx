import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Prescription_card() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Prescriptions</CardTitle>
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
                Prescribed by Dr. Smith
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              <Button variant="outline" size="sm">
                Refill
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Metformin</div>
              <div className="text-xs text-muted-foreground">
                Prescribed by Dr. Johnson
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              <Button variant="outline" size="sm">
                Refill
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
