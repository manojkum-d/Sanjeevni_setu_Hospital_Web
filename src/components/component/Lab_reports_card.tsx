import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Lab_reports_card() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Lab Results</CardTitle>
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
              <div className="text-sm font-medium">Complete Blood Count</div>
              <div className="text-xs text-muted-foreground">
                Completed: 06/01/2023
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              <Button variant="outline" size="sm">
                View Report
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Lipid Panel</div>
              <div className="text-xs text-muted-foreground">
                Completed: 05/15/2023
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              <Button variant="outline" size="sm">
                View Report
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">
                Comprehensive Metabolic Panel
              </div>
              <div className="text-xs text-muted-foreground">
                Completed: 04/20/2023
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              <Button variant="outline" size="sm">
                View Report
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
