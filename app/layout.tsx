"use client";
import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";
import Navbar from "./navbar/navbar";
import { createContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation"; // Import usePathname
import isAuthenticated from "./components/isAuthenticated";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./globals.css"; // Import your custom styles if any
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css"; // Import the CSS
config.autoAddCss = false;

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
        <link rel="icon" href="/icon.png" />

        <meta name="description" content="Nearby events" />
        <title>Eventhub app</title>
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
      </body>
    </html>
  );
}
