"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signIn, signOut } from "next-auth/react";

// Define routes as constants
export const ROUTES = {
  HOME: "/",
  SEARCH: "/search",
  DISCOVER: "/discover",
};

// Props for CustomNavLink component
interface CustomNavLinkProps {
  to: string;
  children: React.ReactNode;
  hovering?: boolean;
  [key: string]: any; // To allow additional props like `onMouseEnter`, `onMouseLeave`
}

// Custom navigation link component
export const CustomNavLink: React.FC<CustomNavLinkProps> = ({
  to,
  children,
  hovering,
  ...props
}) => {
  const pathname = usePathname();
  const isActive = pathname === to;

  return (
    <Link
      href={to}
      className={`${
        isActive
          ? `${
              isActive && !hovering ? "underline-force highlight" : ""
            } relative flex h-full cursor-default items-center justify-center px-12 text-center uppercase text-white transition-colors duration-300 hover:text-pipeline-blue-200`
          : "underline-hover relative flex h-full items-center justify-center px-12 text-center uppercase text-white transition-colors duration-300 hover:text-pipeline-blue-200"
      }`}
      {...props}
    >
      {children}
      <span className="absolute bottom-0 left-0 h-1 w-0 bg-white transition-all duration-300 ease-in-out hover:w-full"></span>
    </Link>
  );
};

// Props for NonMobileNavbar component
interface NonMobileNavbarProps {
  user:
    | {
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
      }
    | undefined;
  pfp?: string;
}

// Main NonMobileNavbar component
const NonMobileNavbar: React.FC<NonMobileNavbarProps> = ({ user, pfp }) => {
  const [hovering, setHovering] = useState(false);
  const [hovering2, setHovering2] = useState(false);

  console.log("user: ", user);

  return (
    <div className="mx-12 hidden h-full flex-row items-center justify-center text-center md:flex">
      <Link href="/">
        <div className="flex flex-row items-center justify-center gap-4">
          <img
            src="/pipelines.png"
            className={`h-12 w-12 pr-2 transition-colors duration-300 ${
              hovering2 ? "animate-pulse text-pipeline-blue-200" : "text-white"
            }`}
          />
          <h1
            className="text-2xl font-bold text-white transition-colors duration-300 hover:text-pipeline-blue-200"
            onMouseEnter={() => setHovering2((prev) => !prev)}
            onMouseLeave={() => setHovering2((prev) => !prev)}
          >
            pipelines.lol
          </h1>
        </div>
      </Link>

      <CustomNavLink
        to={ROUTES.HOME}
        onMouseEnter={() => setHovering((prev) => !prev)}
        onMouseLeave={() => setHovering((prev) => !prev)}
        hovering={hovering}
      >
        About
      </CustomNavLink>
      <CustomNavLink
        to={ROUTES.SEARCH}
        onMouseEnter={() => setHovering((prev) => !prev)}
        onMouseLeave={() => setHovering((prev) => !prev)}
        hovering={hovering}
      >
        Search
      </CustomNavLink>
      <CustomNavLink
        to={ROUTES.DISCOVER}
        onMouseEnter={() => setHovering((prev) => !prev)}
        onMouseLeave={() => setHovering((prev) => !prev)}
        hovering={hovering}
      >
        Discover
      </CustomNavLink>

      <div className="ml-auto flex flex-row items-center justify-center gap-4">
        {!user && (
          <button
            onClick={(e) => {
              signIn("linkedin");
            }}
            className="relative flex h-full items-center justify-center rounded-lg px-8 py-2 font-medium uppercase text-white shadow-md transition-colors duration-300 hover:bg-white/10"
          >
            Login
            <span className="absolute bottom-0 left-0 h-1 w-0 bg-white transition-all duration-300 ease-in-out hover:w-full"></span>
          </button>
        )}

        {user && (
          <>
            <Link href={`/user/${user.email}`}>
              <img
                src={pfp || "/avatar.png"}
                className="h-12 w-12 rounded-full object-cover hover:animate-pulse"
                alt="user_pfp"
              />
            </Link>

            <Link
              href="/edit"
              className="relative flex h-full items-center justify-center rounded-lg px-8 py-2 font-normal uppercase text-white shadow-md transition-colors duration-300 hover:bg-white/10"
            >
              Edit Profile
              <span className="absolute bottom-0 left-0 h-1 w-0 bg-white transition-all duration-300 ease-in-out hover:w-full"></span>
            </Link>

            <button
              onClick={() => signOut()}
              className="relative flex h-full items-center justify-center rounded-lg px-8 py-2 font-normal uppercase text-white shadow-md transition-colors duration-300 hover:bg-white/10"
            >
              Logout
              <span className="absolute bottom-0 left-0 h-1 w-0 bg-white transition-all duration-300 ease-in-out hover:w-full"></span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default NonMobileNavbar;
