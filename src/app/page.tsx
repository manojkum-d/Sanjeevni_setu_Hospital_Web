"use client";
import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/router";
import NavBar from "@/components/component/navbar";

const QRCodeScanner = dynamic(() => import("../components/component/qr"), {
  ssr: false,
});

const Page: React.FC = () => {
  return (
    <>
      <NavBar />

      <QRCodeScanner />
    </>
  );
};

export default Page;
