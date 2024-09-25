"use client";
import React, { useState, useEffect } from "react";
import styles from "./navbar.module.css";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    setIsSignedIn(!!token);
  }, []);

  const handleSignOut = () => {
    Cookies.remove("token");
    setIsSignedIn(false);
    router.push("/uni-events");
  };

  return (
    <div className="navbarcustom">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link
            className={`nav-link ${
              pathname === "/uni-events" ? "underline" : ""
            }`}
            href="/uni-events"
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

        {!isSignedIn ? (
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
        ) : (
          <li className="nav-item">
            <button className="nav-link" onClick={handleSignOut}>
              Sign out
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
