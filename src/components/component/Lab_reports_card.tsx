"use client";

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
import { SearchIcon } from "lucide-react";

interface LabReport {
  _id: string;
  testName: string;
  completedDate: string;
  url: string;
}

interface Iprops {
  userId: string;
}

const LabReportsCard: React.FC<Iprops> = ({ userId }) => {
  const [labReports, setLabReports] = useState<LabReport[]>([]);
  const [filteredLabReports, setFilteredLabReports] = useState<LabReport[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedReport, setSelectedReport] = useState<LabReport | null>(null);

  useEffect(() => {
    const fetchLabReports = async () => {
      try {
        const token = getCookie("accessToken") as string;
        const response = await axios.get(
          `http://localhost:8000/api/labreports/hospital/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLabReports(response.data.labReports);
        setFilteredLabReports(response.data.labReports);
      } catch (error) {
        console.error("Error fetching lab reports:", error);
      }
    };

    fetchLabReports();
  }, [userId]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = labReports.filter((report) =>
        report.testName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredLabReports(filtered);
    } else {
      setFilteredLabReports(labReports);
    }
  }, [searchQuery, labReports]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleViewReport = (report: LabReport) => {
    setSelectedReport(report);
    onOpen();
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-col pb-2">
          <CardTitle className="text-sm font-medium">Lab Results</CardTitle>
          <div className="relative w-full max-w-xs mb-4 mt-2">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search lab reports..."
              className="pl-8 w-full border border-gray-300 rounded p-2"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {filteredLabReports.length > 0 ? (
              filteredLabReports.map((report) => (
                <div
                  key={report._id}
                  className="flex items-center justify-between p-2 border border-gray-200 rounded-md"
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
              ))
            ) : (
              <div className="flex justify-center items-center p-4">
                <Image
                  src="/images/not_found_doc.jpg"
                  alt="No lab reports available"
                  width={300}
                  height={300}
                />
              </div>
            )}
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
