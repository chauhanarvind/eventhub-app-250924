"use client";
import React, { useContext } from "react";
import styles from "./navbar.module.css";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { GlobalContext } from "../context/GlobalContext";

const Navbar = () => {
  const pathname = usePathname();
  const { globalVar, setGlobalVar } = useContext(GlobalContext);
  const router = useRouter();

  const handleSignOut = () => {
    // Remove the token from localStorage
    localStorage.removeItem("token");
    console.log("Token removed from local storage");
    setGlobalVar(false);
    // Redirect to the events page
    router.push("/events");
  };

  return (
    <div className="navbarcustom">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link
            className={`nav-link ${
              pathname === "/uni-events" ? "underline" : ""
            }`}
            href="/events"
          >
            Uni Events
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link  ${pathname === "/about" ? "underline" : ""}`}
            href="/about"
          >
            About
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link ${
              pathname === "/watchlist" ? "underline" : ""
            }`}
            href="/watchlist"
          >
            Watchlist
          </Link>
        </li>

        {!globalVar && (
          <li className="nav-item">
            <Link
              className={`nav-link ${
                pathname === "/signin" ? "underline" : ""
              }`}
              href="/signin"
            >
              Sign in
            </Link>
          </li>
        )}

        {globalVar && (
          <li className="nav-item">
            <button className="nav-link" onClick={handleSignOut}>
              Sign out
            </button>
          </li>
        )}

        {}
      </ul>
    </div>
  );
};

export default Navbar;
