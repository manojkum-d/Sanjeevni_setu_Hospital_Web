"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
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
import { SearchIcon } from "lucide-react";
import { getCookie } from "cookies-next";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import AddDocumentModal from "./adddocument"; // Import the new component

interface Document {
  _id: string;
  userId: string;
  docname: string;
  dateTime: string;
  url: string;
  description: string;
  createdAt: string;
}

interface DocumentsCardProps {
  userId: string;
}

const DocumentsCard: React.FC<DocumentsCardProps> = ({ userId }) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const {
    isOpen: isAddModalOpen,
    onOpen: openAddModal,
    onOpenChange: closeAddModal,
  } = useDisclosure();
  const {
    isOpen: isViewModalOpen,
    onOpen: openViewModal,
    onOpenChange: closeViewModal,
  } = useDisclosure();

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setIsLoading(true);
        const token = getCookie("accessToken") as string;

        const response = await axios.get(
          `https://sanjeeveni-setu-backend.onrender.com/api/documents/hospital/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDocuments(response.data.documents);
        setFilteredDocuments(response.data.documents); // Set initial filtered documents
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchDocuments();
    } else {
      setError("No user ID provided");
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = documents.filter(
        (doc) =>
          doc.docname.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredDocuments(filtered);
    } else {
      setFilteredDocuments(documents);
    }
  }, [searchQuery, documents]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleViewClick = (doc: Document) => {
    setSelectedDoc(doc);
    openViewModal();
  };

  if (isLoading) {
    return (
      <Card className="col-span-2 lg:col-span-4 w-[70%] ml-48">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-3xl font-extrabold">Documents</CardTitle>
          <div className="flex items-center space-x-4">
            <div className="relative w-full max-w-[200px]">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search documents..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <Button onClick={openAddModal}>Add New Document</Button>{" "}
            {/* Add this button */}
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-lg font-bold">Name</TableHead>
                <TableHead className="text-lg font-bold">
                  Date and Time
                </TableHead>
                <TableHead className="text-lg font-bold">Description</TableHead>
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
      <Card className="col-span-2 lg:col-span-4 w-[90vw]">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-3xl font-extrabold">Documents</CardTitle>
          <div className="flex items-center space-x-4">
            <Button onClick={openAddModal}>Add New Document</Button>{" "}
            <div className="relative w-full max-w-[200px]">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search documents..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            {/* Add this button */}
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-lg font-bold">Name</TableHead>
                <TableHead className="text-lg font-bold">
                  Date and Time
                </TableHead>
                <TableHead className="text-lg font-bold">Description</TableHead>
                <TableHead className="text-lg font-bold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.length > 0 ? (
                filteredDocuments.map((doc) => (
                  <TableRow key={doc._id}>
                    <TableCell>{doc.docname}</TableCell>
                    <TableCell>
                      {new Date(doc.dateTime).toLocaleString()}
                    </TableCell>
                    <TableCell>{doc.description}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewClick(doc)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4}>
                    <div className="flex justify-center items-center">
                      <Image
                        src="/images/not_found_doc.jpg" // Path to your no-data image
                        alt="No documents available"
                        width={300}
                        height={300}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedDoc && (
        <Modal
          backdrop="opaque"
          isOpen={isViewModalOpen}
          onOpenChange={closeViewModal}
          classNames={{
            backdrop:
              "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
          }}
        >
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">
              {selectedDoc.docname}
            </ModalHeader>
            <ModalBody>
              {selectedDoc.url.endsWith(".pdf") ? (
                <iframe
                  src={selectedDoc.url}
                  width="100%"
                  height="600px"
                  title={selectedDoc.docname}
                ></iframe>
              ) : (
                <Image
                  src={selectedDoc.url}
                  alt={selectedDoc.docname}
                  width={500}
                  height={500}
                />
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="default" onClick={closeViewModal}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      <AddDocumentModal
        isOpen={isAddModalOpen}
        onOpenChange={closeAddModal}
        userId={userId}
      />
    </>
  );
};

export default DocumentsCard;
