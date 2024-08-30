import Link from "next/link";
import { CircleUser } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import ProfileDropdown from "./profiledropdown";

export default function NavBar() {
  return (
    <header className="top-0 flex h-16 items-center gap-8 border-b bg-white dark:bg-black color-white px-4 md:px-6">
      <Link href="#" className="flex items-center gap-8 text-lg font-semibold">
        <div className="my-2 py-5">
          <Image
            src="/images/logo.png"
            alt="logo"
            width={90}
            height={90}
          ></Image>
        </div>
        <h3 className="scroll-m-20 text-2xl font-bold tracking-tight text-foreground">
          Sanjeevni Setu
        </h3>
      </Link>
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Home
        </Link>
        <Link
          href="/about"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          About
        </Link>
        {/* <Link
          href="#"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Contact
        </Link> */}
      </nav>
      <div className="ml-auto flex items-center gap-4">
        <ProfileDropdown />
      </div>
    </header>
  );
}
