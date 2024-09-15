"use client";
import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";
import Navbar from "./navbar/navbar";
import { createContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation"; // Import usePathname
import isAuthenticated from "./components/isAuthenticated";

// Local fonts configuration
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const GlobalContext = createContext<{
  globalVar: boolean;
  setGlobalVar: (value: boolean) => void;
}>({
  globalVar: false,
  setGlobalVar: () => {},
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [globalVar, setGlobalVar] = useState(false);
  const pathname = usePathname(); // Get the current pathname

  // Run the function on every route change
  useEffect(() => {
    const checkAuth = async () => {
      console.log("Function executed on route change");
      const isAuth = await isAuthenticated();
      setGlobalVar(isAuth);
    };

    checkAuth();
  }, [pathname]); // Trigger this effect when pathname changes

  return (
    <html lang="en">
      <head>
        {/* Include Bootstrap CSS in the head */}
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-indigo-300`}
      >
        <GlobalContext.Provider value={{ globalVar, setGlobalVar }}>
          <div>
            <Navbar />
            {/* Render children content */}
            <div className="bodyRest">{children}</div>
          </div>
        </GlobalContext.Provider>

        {/* jQuery Script */}
        <Script
          src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
          integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
          crossOrigin="anonymous"
        />
        {/* Popper.js Script */}
        <Script
          src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/js/popper.min.js"
          integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
          crossOrigin="anonymous"
        />
        {/* Bootstrap JS Script */}
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js"
          integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}
