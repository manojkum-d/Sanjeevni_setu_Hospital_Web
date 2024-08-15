"use client";
import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/router";

// Dynamically import the QR code scanner component to ensure it is only rendered client-side
const QRCodeScanner = dynamic(() => import("../components/component/qr"), {
  ssr: false,
});

const Page: React.FC = () => {
  return (
    <div className="flex flex-1 items-center justify-center h-[100] mt-8">
      <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-35 pointer-events-none">
        <Image
          src="/images/medicalbg.jpg" // Replace with your image path
          alt="Background image"
          layout="fill"
          style={{ objectFit: "cover" }}
          objectPosition="center"
        />
      </div>
      <QRCodeScanner />
    </div>
  );
};

export default Page;
