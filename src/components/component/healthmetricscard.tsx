"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { TrendingUp } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  Bar,
  BarChart,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { getCookie } from "cookies-next";

interface Metric {
  date: any;
  createdAt: string;
  bloodPressure?: string;
  heartRate?: number;
  glucoseLevel?: number;
  cholesterol?: number;
}

interface ProcessedMetric {
  x: string;
  y: number;
}

interface ProcessedData {
  bloodPressure: ProcessedMetric[];
  heartRate: ProcessedMetric[];
  glucoseLevel: ProcessedMetric[];
  cholesterol: ProcessedMetric[];
}

interface HealthMetricsCardProps {
  userId: string;
}

const HealthMetricsCard: React.FC<HealthMetricsCardProps> = ({ userId }) => {
  const [metrics, setMetrics] = useState<Metric[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setIsLoading(true);
        const token = getCookie("accessToken") as string;
        const metricsUrl = `https://sanjeeveni-setu-backend.onrender.com/api/health-metrics/health-metrics/${userId}`;
        const metricsResponse = await axios.get(metricsUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMetrics(metricsResponse.data.healthMetrics);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchMetrics();
    } else {
      setError("No user ID provided");
      setIsLoading(false);
    }
  }, [userId]);

  const processedData = metrics
    ? processMetricsData(metrics)
    : {
        bloodPressure: [],
        heartRate: [],
        glucoseLevel: [],
        cholesterol: [],
      };

  const chartConfig: ChartConfig = {
    bloodPressure: { label: "Blood Pressure", color: "hsl(var(--chart-1))" },
    heartRate: { label: "Heart Rate", color: "hsl(var(--chart-2))" },
    glucoseLevel: { label: "Glucose Level", color: "hsl(var(--chart-3))" },
    cholesterol: { label: "Cholesterol", color: "hsl(var(--chart-4))" },
  };

  if (isLoading) {
    return (
      <Card className="col-span-2 lg:col-span-3">
        <CardHeader>
          <Skeleton className="h-8 w-[600px]" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-[600px] w-auto" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Card className="col-span-2 lg:col-span-3">
      <CardHeader>
        <CardTitle>Health Metrics</CardTitle>
        <CardDescription>Your health data over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ChartContainer config={chartConfig}>
            {processedData.bloodPressure.length > 0 ? (
              <LineChart
                data={processedData.bloodPressure}
                margin={{ left: 12, right: 12 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="x"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) =>
                    new Date(value).toLocaleDateString("default", {
                      month: "short",
                      year: "numeric",
                    })
                  }
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  label={{
                    value: chartConfig.bloodPressure.label,
                    angle: -90,
                    position: "insideLeft",
                  }}
                  domain={["dataMin", "dataMax"]}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                  // label="hii"
                />
                <Line
                  dataKey="y"
                  type="linear"
                  stroke="#ff6347"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            ) : (
              <div>No blood pressure data available</div>
            )}
          </ChartContainer>
          <ChartContainer config={chartConfig}>
            {processedData.heartRate.length > 0 ? (
              <BarChart
                data={processedData.heartRate}
                margin={{ left: 12, right: 12 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="x"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) =>
                    new Date(value).toLocaleDateString("default", {
                      month: "short",
                      year: "numeric",
                    })
                  }
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  label={{
                    value: chartConfig.heartRate.label,
                    angle: -90,
                    position: "insideLeft",
                  }}
                  domain={["dataMin", "dataMax"]}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <Bar dataKey="y" fill="#4682b4" radius={4} />
              </BarChart>
            ) : (
              <div>No heart rate data available</div>
            )}
          </ChartContainer>
          <ChartContainer config={chartConfig}>
            {processedData.glucoseLevel.length > 0 ? (
              <LineChart
                data={processedData.glucoseLevel}
                margin={{ left: 12, right: 12 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="x"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) =>
                    new Date(value).toLocaleDateString("default", {
                      month: "short",
                      year: "numeric",
                    })
                  }
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  label={{
                    value: chartConfig.glucoseLevel.label,
                    angle: -90,
                    position: "insideLeft",
                  }}
                  domain={["dataMin", "dataMax"]}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <Line
                  dataKey="y"
                  type="linear"
                  stroke="green"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            ) : (
              <div>No glucose level data available</div>
            )}
          </ChartContainer>
          <ChartContainer config={chartConfig}>
            {processedData.cholesterol.length > 0 ? (
              <LineChart
                data={processedData.cholesterol}
                margin={{ left: 12, right: 12 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="x"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) =>
                    new Date(value).toLocaleDateString("default", {
                      month: "short",
                      year: "numeric",
                    })
                  }
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  label={{
                    value: chartConfig.cholesterol.label,
                    angle: -90,
                    position: "insideLeft",
                  }}
                  domain={["dataMin", "dataMax"]}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <Line
                  dataKey="y"
                  type="linear"
                  stroke="#ffd700"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            ) : (
              <div>No cholesterol data available</div>
            )}
          </ChartContainer>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing your health metrics over time
        </div>
      </CardFooter>
    </Card>
  );

  function processMetricsData(metrics: Metric[]): ProcessedData {
    return {
      bloodPressure: metrics
        .filter((metric) => metric.bloodPressure)
        .map((metric) => ({
          x: metric.date, // Use the `date` field for the x-axis
          y: metric.bloodPressure
            ? parseInt(metric.bloodPressure.split("/")[0], 10)
            : 0,
        })),
      heartRate: metrics
        .filter((metric) => metric.heartRate !== undefined)
        .map((metric) => ({
          x: metric.date, // Use the `date` field for the x-axis
          y: metric.heartRate || 0,
        })),
      glucoseLevel: metrics
        .filter((metric) => metric.glucoseLevel !== undefined)
        .map((metric) => ({
          x: metric.date, // Use the `date` field for the x-axis
          y: metric.glucoseLevel || 0,
        })),
      cholesterol: metrics
        .filter((metric) => metric.cholesterol !== undefined)
        .map((metric) => ({
          x: metric.date, // Use the `date` field for the x-axis
          y: metric.cholesterol || 0,
        })),
    };
  }
};
export default HealthMetricsCard;
