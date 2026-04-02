"use client";

import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

export default function UserMenu() {
  const { user, logout } = useUser();

  if (!user) {
    return (
      <div className="flex flex-row gap-4">
        <Link href="/auth/login">
          <Button variant="secondary" className="hover:cursor-pointer">
            Log In
          </Button>
        </Link>
        <Link href="/auth/signup">
          <Button variant="outline" className="hover:cursor-pointer">
            Sign Up
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2">
          <span className="font-semibold">{user.username}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.186l3.71-3.955a.75.75 0 111.08 1.04l-4.24 4.523a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuLabel>Signed in as</DropdownMenuLabel>
        <DropdownMenuItem disabled>{user.email}</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={logout}
          className="text-red-500 focus:text-red-500"
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}