"use client";
import React, { useState, useRef, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function QrScanner() {
  const [scanning, setScanning] = useState<boolean>(false);
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
          router.push(`/hospital/dashboard/${decodedText}`); // Send the userId directly to the dashboard route
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

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Scan for Patient Details</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-6">
        <div
          id="qr-reader"
          className="w-full aspect-square bg-muted rounded-lg overflow-hidden"
        />
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
  );
}
