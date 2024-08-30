"use client";

import { LogOut, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteCookie } from "cookies-next";

import ProfileSheet from "@/components/component/profilesheet";
import ThemeButton from "@/components/component/themebutton";
import { useRouter } from "next/navigation";

export default function ProfileDropdown() {
  const router = useRouter();
  const handleSignOut = () => {
    deleteCookie("accessToken"); // Replace 'sessionToken' with the name of your cookie
    router.push("/hospital/login"); // Uncomment this line to redirect to the sign-in page after sign out
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="rounded-full">
          <User className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {/* Profile sheet item */}
          <DropdownMenuItem asChild>
            <ProfileSheet />
          </DropdownMenuItem>

          {/* Settings item */}
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>

          {/* Theme toggle button */}
          <DropdownMenuItem asChild>
            <div className="flex items-center justify-between w-full">
              <span>Theme</span>
              <ThemeButton />
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
