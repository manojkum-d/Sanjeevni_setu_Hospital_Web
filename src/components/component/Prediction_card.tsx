import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Prediction_card() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Predictions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Heart Disease Risk</div>
              <div className="text-xs text-muted-foreground">15% risk</div>
            </div>
            <div className="text-xs text-muted-foreground">
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Cancer Risk</div>
              <div className="text-xs text-muted-foreground">8% risk</div>
            </div>
            <div className="text-xs text-muted-foreground">
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Diabetes Risk</div>
              <div className="text-xs text-muted-foreground">25% risk</div>
            </div>
            <div className="text-xs text-muted-foreground">
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
