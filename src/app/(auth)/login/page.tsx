"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login, setToken } from "@/app/_services/auth";
import { toast, Toaster } from "sonner";

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
        description: "Welcome back to Sanjeevni setu!",
      });
      router.push("/dashboard");
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
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2 bg-[hsl(var(--background))] text-[hsl(var(--foreground))] overflow-hidden">
      <div className="flex items-center justify-center py-12 lg:min-h-screen">
        <div className="mx-auto grid w-[420px] gap-6 border border-[hsl(var(--border))] rounded-lg p-6 bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))]">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-[hsl(var(--muted-foreground))]">
              Welcome to Sanjeevni setu!
            </p>
          </div>
          <form onSubmit={handleLogin} className="grid gap-4">
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
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                className="text-black text-base"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"
            >
              Login
            </Button>
          </form>
          <Button
            variant="outline"
            className="w-full bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))]"
            onClick={() =>
              toast.info("🔐 Google login", {
                description: "Google login is not implemented yet.",
              })
            }
          >
            Login with Google
          </Button>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline">
              Sign up
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
          className="h-[70%] w-full object-cover mr-8 mt-4 dark:brightness-[0.1] rounded-md border-current"
        />
      </div>
    </div>
  );
}
