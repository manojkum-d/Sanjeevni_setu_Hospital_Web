"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login, setToken } from "@/app/_services/auth";
import { toast } from "sonner";
import { ModeToggle } from "../../../../components/component/theme-button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await login({ email, password });
      setToken(response.accessToken);
      toast.success("🎉 Logged in successfully!", {
        description: "Welcome back to Sanjeevni Setu!",
      });
      router.push("/");
    } catch (error: any) {
      console.error("Error during login:", error);
      toast.error("Login failed", {
        description: "Please check your credentials and try again.",
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
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-35 pointer-events-none">
        <Image
          src="/images/medicalbg.jpg" // Replace with your image path
          alt="Background image"
          layout="fill"
          style={{ objectFit: "cover" }}
          objectPosition="center"
        />
      </div>
      <div className="absolute top-10 left-10 animate-float">
        <Image
          src="/images/heart.png"
          alt="Heart Icon"
          width={60}
          height={60}
          // fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="absolute bottom-10 right-10 animate-float-delayed">
        <Image
          src="/images/stethoscope-icon.png"
          alt="Stethoscope Icon"
          width={80}
          height={80}
        />
      </div>

      {/* Login form */}
      <div className="z-10 mx-auto w-[420px] border border-border rounded-[var(--radius)] p-6 bg-card text-card-foreground shadow-lg backdrop-blur-sm bg-opacity-90">
        <div className="grid gap-6">
          <div className=" grid gap-2 text-center">
            <Image
              src="/images/logo.png"
              alt="Sanjeevni Setu Logo"
              width={150}
              height={150}
              style={{ objectFit: "cover" }}
              className="mx-auto mb-0"
            />
            <h1 className="text-3xl font-bold font-heading">Login</h1>
            <p className="text-balance text-muted-foreground">
              Welcome to Sanjeevni Setu!
            </p>
          </div>
          <form onSubmit={handleLogin} className="grid gap-4">
            <div className="grid gap-2">
              <div className="flex justify-end">
                <ModeToggle />
              </div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@example.com"
                spellCheck="false"
                required
                className="bg-background text-foreground"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline text-primary"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                className="bg-background text-foreground"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Login
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/hospital/register" className="underline text-primary">
              Sign up
            </Link>
          </div>
          <div className="mt-0 text-center text-sm">
            Are You the admin?
            <Link href="/admin/login" className="underline text-primary">
              Admin?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
