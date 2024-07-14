"use client";
import React, { useState, useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Qr() {
  const [data, setData] = useState<string>("No result");
  const [scanning, setScanning] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);

  useEffect(() => {
    // Initialize scanner
    scannerRef.current = new Html5Qrcode("qr-reader");

    // Clean up on unmount
    return () => {
      if (scannerRef.current && scanning) {
        scannerRef.current.stop().catch(console.error);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startScanning = () => {
    if (scannerRef.current) {
      scannerRef.current
        .start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          (decodedText) => {
            setData(decodedText);
            setScanning(false);
            scannerRef.current?.stop().catch(console.error);
          },
          (errorMessage) => {
            console.log(errorMessage);
          }
        )
        .catch((err) => {
          console.error(err);
        });
      setScanning(true);
    }
  };

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
          onClick={startScanning}
          disabled={scanning}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          {scanning ? "Scanning..." : "Start Scanning"}
        </button>
        <p className="text-muted-foreground">
          Point your camera at a QR code to scan it and retrieve patient
          details.
        </p>
        <div className="mt-4">
          <h3 className="font-semibold">Scanned Data:</h3>
          <p>{data}</p>
        </div>
      </CardContent>
    </Card>
  );
}
