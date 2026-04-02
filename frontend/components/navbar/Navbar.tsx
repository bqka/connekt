"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SunIcon, MoonIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useUser } from "@/context/UserContext";
import NavLinks from "./NavLinks";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="border-border bg-background text-foreground sticky top-0 z-50 w-full border-b-2">
      <div className="mx-auto flex max-w-[92vw] items-center justify-between px-4 py-3 md:py-4">
        <div className="flex flex-row items-center gap-2">
          <div className="size-4">
            <svg
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <Link
            href="/"
            className="hover:text-primary text-lg font-semibold transition-colors"
          >
            Connekt
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden flex-row items-center gap-2 md:flex">
          <ThemeToggle />
          <NavLinks />
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="text-foreground hover:text-primary transition-colors md:hidden"
          aria-label="Toggle menu"
        >
          {open ? (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="border-border bg-background border-t md:hidden">
          <div className="flex flex-col space-y-2 px-4 py-3">
            <NavLinks />
            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  );
}

function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    const enabled = savedTheme === "dark" || (!savedTheme && prefersDark);
    document.documentElement.classList.toggle("dark", enabled);
    setIsDark(enabled);
  }, []);

  const handleToggle = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle("dark", newIsDark);
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
  };

  return (
    <a
      onClick={handleToggle}
      className="text-foreground hover:text-primary flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors hover:cursor-pointer"
    >
      {isDark ? (
        <SunIcon className="h-4 w-4" />
      ) : (
        <MoonIcon className="h-4 w-4" />
      )}
    </a>
  );
}
