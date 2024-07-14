import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Dashboard() {
  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2 bg-[hsl(var(--background))] text-[hsl(var(--foreground))] overflow-hidden">
      <div className="hidden lg:flex lg:items-center lg:justify-center ">
        <Image
          src="/images/medi.gif"
          alt="Image"
          width="1500"
          height="1200"
          className="h-[80%] w-full object-cover mr-16 dark:brightness-[0.1] dark:grayscale"
        />
      </div>
    </div>
  );
}
