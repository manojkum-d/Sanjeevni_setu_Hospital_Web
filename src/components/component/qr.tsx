"use client";
import React, { useState, useRef, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

export default function QrScanner() {
  const [scanning, setScanning] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const qrCodeScannerRef = useRef<Html5QrcodeScanner | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (scanning) {
      qrCodeScannerRef.current?.clear();

      qrCodeScannerRef.current = new Html5QrcodeScanner(
        "qr-reader",
        { fps: 10, qrbox: 250 },
        false
      );

      qrCodeScannerRef.current.render(
        (decodedText) => {
          // Validate the decoded text
          if (isValidQrCode(decodedText)) {
            setError(null); // Clear any previous errors
            toast.success("QR code scanned successfully!", {
              description: "Redirecting to patient details...",
            });
            router.push(`/hospital/dashboard/${decodedText}`); // Send the userId directly to the dashboard route
          } else {
            setError("Invalid QR code. Please try scanning a valid QR code.");
            toast.error("Invalid QR code", {
              description: "Please try scanning a valid QR code.",
            });
          }
        },
        (errorMessage) => {
          console.error("QR Code Scanner Error:", errorMessage);
          if (errorMessage.includes("No camera found")) {
            alert(
              "No camera found or permission denied. Please ensure that your camera is accessible."
            );
          }
        }
      );

      return () => {
        qrCodeScannerRef.current?.clear().catch((err) => {
          console.error("Error clearing QR code scanner:", err);
        });
      };
    }
  }, [scanning, router]);

  // Function to validate the QR code
  const isValidQrCode = (decodedText: string) => {
    // Regular expression to match the userId format you provided
    const validPattern = /^[a-f0-9]{24}$/; // 24 characters long, hexadecimal
    return validPattern.test(decodedText);
  };

  return (
    <div className="flex flex-1 items-center justify-center h-[100] mt-8">
      <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-35 pointer-events-none"></div>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Scan for Patient Details</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-6">
          <div
            id="qr-reader"
            className="w-full aspect-square bg-muted rounded-lg overflow-hidden"
          />
          {error && (
            <p className="text-red-500">{error}</p> // Display error message if any
          )}
          <button
            onClick={() => setScanning(true)}
            disabled={scanning}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            {scanning ? "Scanning..." : "Start Scanning"}
          </button>
          <p className="text-muted-foreground">
            Point your camera at a QR code to scan it and retrieve patient
            details.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
