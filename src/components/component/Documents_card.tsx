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
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setIsLoading(true);
        const token = getCookie("accessToken") as string;

        const response = await axios.get(
          `http://localhost:8000/api/documents/hospital/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDocuments(response.data.documents);
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

  const handleViewClick = (doc: Document) => {
    setSelectedDoc(doc);
    onOpen();
  };

  if (isLoading) {
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

  if (!documents.length) {
    return <div>No documents available for User ID: {userId}</div>;
  }

  return (
    <>
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
                <TableHead className="text-lg font-bold">Name</TableHead>
                <TableHead className="text-lg font-bold">
                  Date and Time
                </TableHead>
                <TableHead className="text-lg font-bold">Description</TableHead>
                <TableHead className="text-lg font-bold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
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
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedDoc && (
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

export default DocumentsCard;
