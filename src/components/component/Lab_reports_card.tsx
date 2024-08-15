// components/LabReportsCard.tsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { getCookie } from "cookies-next";
import Image from "next/image";

interface Iprops {
  userId: string;
}

const LabReportsCard: React.FC<Iprops> = ({ userId }) => {
  const [labReports, setLabReports] = useState<any[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedReport, setSelectedReport] = useState<any | null>(null);

  useEffect(() => {
    // Replace with your API endpoint and token
    const fetchLabReports = async () => {
      try {
        const token = getCookie("accessToken") as string;
        const response = await axios.get(
          `http://localhost:8000/api/labreports/hospital/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Replace with your token
            },
          }
        );
        setLabReports(response.data.labReports);
      } catch (error) {
        console.error("Error fetching lab reports:", error);
      }
    };

    fetchLabReports();
  }, [userId]);

  const handleViewReport = (report: any) => {
    setSelectedReport(report);
    onOpen();
  };

  return (
    <>
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
            {labReports.map((report) => (
              <div
                key={report._id}
                className="flex items-center justify-between"
              >
                <div>
                  <div className="text-sm font-medium">{report.testName}</div>
                  <div className="text-xs text-muted-foreground">
                    Completed:{" "}
                    {new Date(report.completedDate).toLocaleDateString()}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewReport(report)}
                  >
                    View Report
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedReport && (
        <Modal
          backdrop="opaque"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          classNames={{
            backdrop:
              "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
          }}
        >
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">
              {selectedReport.testName}
            </ModalHeader>
            <ModalBody>
              <p>
                <strong>Completed Date:</strong>{" "}
                {new Date(selectedReport.completedDate).toLocaleDateString()}
              </p>
              {selectedReport.url.endsWith(".pdf") ? (
                <iframe
                  src={selectedReport.url}
                  width="100%"
                  height="600px"
                  title={selectedReport.testName}
                ></iframe>
              ) : (
                <Image
                  src={selectedReport.url}
                  alt={selectedReport.testName}
                  width={500}
                  height={500}
                />
              )}
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="default"
                onClick={() => onOpenChange()}
              >
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default LabReportsCard;
