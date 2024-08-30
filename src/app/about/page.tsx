"use client";
import React from "react";
import Image from "next/image";
import NavBar from "@/components/component/navbar";

const teamInfo = [
  {
    name: "Balla Koushik ",
    role: "Full Stack Developer",
  },
  {
    name: "Chris Alister",
    role: "Data Analyst",
  },
  {
    name: "Manoj Kumar d",
    role: "Full Stack Developer",
  },
];

const AboutPage = () => {
  return (
    <>
      <NavBar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-12">
          Meet Our Team
        </h1>
        <div className="relative w-full max-w-5xl h-[500px] lg:h-[600px] rounded-lg shadow-2xl overflow-hidden">
          {/* Replace the src with your team image */}
          <Image
            src="/images/team.jpeg" // Replace with the actual team image path
            alt="Our Team"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80 flex flex-col justify-end p-8 lg:p-12 text-white rounded-lg">
            {teamInfo.map((member, index) => (
              <div key={index} className="mb-6 text-center lg:text-left">
                <h2 className="text-2xl lg:text-3xl font-bold">
                  {member.name}
                </h2>
                <p className="text-lg lg:text-xl">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
