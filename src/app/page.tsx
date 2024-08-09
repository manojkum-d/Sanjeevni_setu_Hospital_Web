"use client";
import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useRouter } from "next/router";

// Dynamically import the QR code scanner component to ensure it is only rendered client-side
const QRCodeScanner = dynamic(() => import("../components/component/qr"), {
  ssr: false,
});

const Page: React.FC = () => {
  return <QRCodeScanner />;
};

export default Page;
