import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
} from "@nextui-org/react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { toast } from "sonner";

interface AddDocumentModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  userId: string;
}

const AddDocumentModal: React.FC<AddDocumentModalProps> = ({
  isOpen,
  onOpenChange,
  userId,
}) => {
  const [docname, setDocname] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!docname || !description) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const token = getCookie("accessToken") as string;
      const formData = new FormData();
      formData.append("description", description);
      formData.append("docname", docname);

      if (file) {
        formData.append("document", file); // Ensure this matches your backend field name
      }

      await axios.post(
        `http://localhost:8000/api/documents/hospital/upload/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Close the modal and reset fields
      onOpenChange(false);
      setDocname("");
      setDescription("");
      setFile(null);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    }
  };

  return (
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
        <ModalHeader className="text-xl font-bold">
          Add New Document
        </ModalHeader>
        <ModalBody>
          {error && <div className="text-red-500 mb-2">{error}</div>}
          <Input
            label="Document Name"
            placeholder="Enter document name"
            value={docname}
            onChange={(e) => setDocname(e.target.value)}
            className="mb-4"
          />
          <Textarea
            label="Description"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mb-4"
          />
          <Input
            type="file"
            label="Upload File (optional)"
            onChange={handleFileChange}
            className="mb-4"
          />
        </ModalBody>
        <ModalFooter>
          <Button color="default" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddDocumentModal;
