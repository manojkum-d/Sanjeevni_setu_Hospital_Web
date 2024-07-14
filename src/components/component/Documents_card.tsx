import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

export default function Documents_card() {
  return (
    <Card className="col-span-2 lg:col-span-4 w-[70%] ml-48">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-3xl font-extrabold">Documents</CardTitle>
        <div className="relative w-full max-w-[200px]">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search documents..."
            className="pl-8 w-full"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-lg font-bold">File Type</TableHead>
              <TableHead className="text-lg font-bold">Date</TableHead>
              <TableHead className="text-lg font-bold">Time</TableHead>
              <TableHead className="text-lg font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Lab Results</TableCell>
              <TableCell>01/01/2023</TableCell>
              <TableCell>10:30 AM</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Imaging Reports</TableCell>
              <TableCell>12/15/2022</TableCell>
              <TableCell>2:45 PM</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Prescriptions</TableCell>
              <TableCell>11/20/2022</TableCell>
              <TableCell>9:15 AM</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Doctors Notes</TableCell>
              <TableCell>10/05/2022</TableCell>
              <TableCell>4:20 PM</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
