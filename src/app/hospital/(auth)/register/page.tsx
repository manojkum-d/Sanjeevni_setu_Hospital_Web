"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerHospital } from "@/app/_services/auth";
import { toast, Toaster } from "sonner";
import { ModeToggle } from "../../../../components/component/theme-button";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await registerHospital({ name, email, password, address, phoneNumber });
      toast.success("🎉 Registered successfully!", {
        description: "Your hospital is now registered with Sanjeevni Setu!",
      });
      router.push("/login");
    } catch (error: any) {
      console.error("Error during registration:", error);
      toast.error("Registration failed", {
        description: "Please check the information and try again.",
      });

      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up request:", error.message);
      }
    }
  };

  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2 bg-[hsl(var(--background))] text-[hsl(var(--foreground))] overflow-hidden">
      <div className="flex items-center justify-center py-12 lg:min-h-screen">
        <div className="mx-auto grid w-[420px] gap-6 border border-[hsl(var(--border))] rounded-lg p-6 bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))]">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Register</h1>
            <p className="text-balance text-[hsl(var(--muted-foreground))]">
              Register your hospital with Sanjeevni Setu!
            </p>
          </div>
          <form onSubmit={handleRegister} className="grid gap-4">
            <div className="grid gap-2">
              <ModeToggle />
              <Label htmlFor="name">Hospital Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Hospital Name"
                spellCheck="false"
                required
                className="text-black text-base"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@example.com"
                spellCheck="false"
                required
                className="text-black text-base"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                required
                className="text-black text-base"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                type="text"
                placeholder="Hospital Address"
                required
                className="text-black text-base"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                type="text"
                placeholder="Phone Number"
                required
                className="text-black text-base"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"
            >
              Register
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/hospital/login" className="underline">
              Login
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex lg:items-center lg:justify-center ">
        <Image
          src="/images/medi.gif"
          alt="Image"
          width={1500}
          height={1200}
          unoptimized={true}
          className="h-[70%] w-full object-cover mr-8 mt-4 dark:brightness-[0.9] rounded-md border-current"
        />
      </div>
    </div>
  );
}
