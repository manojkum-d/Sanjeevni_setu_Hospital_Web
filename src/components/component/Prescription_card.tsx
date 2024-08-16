"use client";

import React, { useEffect, useState } from "react";
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
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { SearchIcon } from "lucide-react";

interface Prescription {
  _id: string;
  userId: string;
  prescribedBy: string;
  createdAt: string;
  url: string;
  dateTime: string;
}

interface PrescriptionCardProps {
  userId: string;
}

const PrescriptionCard: React.FC<PrescriptionCardProps> = ({ userId }) => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [filteredPrescriptions, setFilteredPrescriptions] = useState<
    Prescription[]
  >([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPrescription, setSelectedPrescription] =
    useState<Prescription | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        setIsLoading(true);
        const token = getCookie("accessToken") as string;

        const response = await axios.get(
          `https://sanjeeveni-setu-backend.onrender.com/api/prescription/hospital/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPrescriptions(response.data.prescriptions);
        setFilteredPrescriptions(response.data.prescriptions);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchPrescriptions();
    } else {
      setError("No user ID provided");
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = prescriptions.filter((prescription) =>
        prescription.prescribedBy
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
      setFilteredPrescriptions(filtered);
    } else {
      setFilteredPrescriptions(prescriptions);
    }
  }, [searchQuery, prescriptions]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleViewClick = (prescription: Prescription) => {
    setSelectedPrescription(prescription);
    onOpen();
  };

  if (isLoading) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold">Prescriptions</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="relative w-full max-w-xs mb-4">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search prescriptions..."
              className="pl-8 w-full border border-gray-300 rounded p-2"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-lg font-bold">
                  Prescribed By
                </TableHead>
                <TableHead className="text-lg font-bold">
                  Date and Time
                </TableHead>
                <TableHead className="text-lg font-bold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[1, 2, 3, 4].map((index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="h-4 w-[200px] bg-gray-200 animate-pulse"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-[200px] bg-gray-200 animate-pulse"></div>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" disabled>
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold">Prescriptions</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="relative w-full max-w-xs mb-4">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search prescriptions..."
              className="pl-8 w-full border border-gray-300 rounded p-2"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <div className="space-y-2">
            {filteredPrescriptions.length > 0 ? (
              filteredPrescriptions.map((prescription) => (
                <div
                  key={prescription._id}
                  className="flex items-center justify-between p-2 border border-gray-200 rounded-md"
                >
                  <div>
                    <div className="text-sm font-medium">
                      {prescription.prescribedBy}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(prescription.dateTime).toLocaleString()}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewClick(prescription)}
                    >
                      View
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center p-4">
                <Image
                  src="/images/not_found_doc.jpg"
                  alt="No prescriptions available"
                  width={300}
                  height={300}
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {selectedPrescription && (
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
              {selectedPrescription.prescribedBy}
            </ModalHeader>
            <ModalBody>
              {selectedPrescription.url?.endsWith(".pdf") ? (
                <iframe
                  src={selectedPrescription.url}
                  width="100%"
                  height="600px"
                  title={selectedPrescription.prescribedBy}
                ></iframe>
              ) : (
                <Image
                  src={selectedPrescription.url}
                  alt={selectedPrescription.prescribedBy}
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

export default PrescriptionCard;
