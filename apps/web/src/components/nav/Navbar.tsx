"use client";
import { useState } from "react";
import NonMobileNavbar from "./mobile/NonMobile";
import MobileNavigationBar from "./mobile/Mobile";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const [mobileNavbar, setMobileNavbar] = useState(false);

  const session = useSession();

  return (
    <>
      <header
        className={`fixed left-0 top-0 h-16 w-full px-12 sm:p-0  ${mobileNavbar ? "z-50 bg-black/90 bg-opacity-5 shadow-md backdrop-blur-lg backdrop-filter" : "z-50 bg-transparent bg-opacity-5 shadow-md backdrop-blur-lg backdrop-filter"}`}
      >
        <NonMobileNavbar pfp={""} user={session.data?.user} />
        <MobileNavigationBar
          user={session.data?.user}
          toggleMobileNavbar={setMobileNavbar}
          mobileNavbar={mobileNavbar}
        />
      </header>
    </>
  );
};

export default Navbar;
