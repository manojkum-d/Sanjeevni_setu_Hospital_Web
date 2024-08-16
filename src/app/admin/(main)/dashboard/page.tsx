"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EyeIcon, EditIcon, DeleteIcon } from "@/components/ui/icons";
import { toast } from "sonner";
import axios from "axios";
import { getCookie } from "cookies-next";
import { Chip } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

interface Hospital {
  _id: string;
  name: string;
  email: string;
  address: string;
  phoneNumber: string;
  isApproved: boolean;
}

export default function HospitalTable() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isConfirmOpen,
    onOpen: onConfirmOpen,
    onOpenChange: onConfirmOpenChange,
  } = useDisclosure();
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(
    null
  );

  useEffect(() => {
    const fetchHospitals = async () => {
      const token = getCookie("accessToken");

      if (!token) {
        toast.error("Authentication token not found");
        return;
      }

      try {
        const response = await axios.get(
          "https://sanjeeveni-setu-backend.onrender.com/api/admin/hospitals",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setHospitals(response.data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error("Failed to fetch hospitals", {
            description: error.message,
          });
        } else {
          toast.error("An unknown error occurred");
        }
      }
    };

    fetchHospitals();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this hospital?")) {
      // Perform delete operation
      toast.success("Hospital deleted successfully");
    }
  };

  const handleEditClick = (hospital: Hospital) => {
    setSelectedHospital(hospital);
    onOpen();
  };

  const handleApprove = () => {
    onOpenChange();
    onConfirmOpen();
  };

  const handleConfirmApprove = async () => {
    if (!selectedHospital) return;

    const token = getCookie("accessToken");

    if (!token) {
      toast.error("Authentication token not found");
      return;
    }

    try {
      await axios.put(
        `https://sanjeeveni-setu-backend.onrender.com/api/admin/hospital/approve/${selectedHospital._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Hospital approved successfully");

      // Update the state to reflect the approval status
      setHospitals((prevHospitals) =>
        prevHospitals.map((hospital) =>
          hospital._id === selectedHospital._id
            ? { ...hospital, isApproved: true }
            : hospital
        )
      );

      onConfirmOpenChange();
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error("Failed to approve hospital", {
          description: error.message,
        });
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  const filteredHospitals = hospitals.filter((hospital) =>
    hospital.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 w-[70vw] mt-11 ">
      <h1 className="text-2xl font-bold mb-4">Hospital List</h1>
      <Input
        placeholder="Search by hospital name..."
        value={searchTerm}
        onChange={handleSearch}
        className="mb-4"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Approval Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredHospitals.map((hospital) => (
            <TableRow key={hospital._id}>
              <TableCell>{hospital.name}</TableCell>
              <TableCell>{hospital.email}</TableCell>
              <TableCell>{hospital.address}</TableCell>
              <TableCell>{hospital.phoneNumber}</TableCell>
              <TableCell>
                <Chip color={hospital.isApproved ? "success" : "danger"}>
                  {hospital.isApproved ? "Approved" : "Not Approved"}
                </Chip>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon">
                    <EyeIcon />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEditClick(hospital)}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(hospital._id)}
                  >
                    <DeleteIcon />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Approve Modal */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Approve</ModalHeader>
              <ModalBody>
                <p>
                  Do you want to approve the hospital: {selectedHospital?.name}?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onClick={handleApprove}>
                  Approve
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Confirmation Modal */}
      <Modal isOpen={isConfirmOpen} onOpenChange={onConfirmOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Confirm Approval
              </ModalHeader>
              <ModalBody>
                <p>Are you sure you want to approve this hospital?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="default" onClick={onClose}>
                  No
                </Button>
                <Button color="primary" onClick={handleConfirmApprove}>
                  Yes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
