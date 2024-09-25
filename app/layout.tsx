"use client";
import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";
import Navbar from "./navbar/navbar";
import { usePathname, useRouter } from "next/navigation";
import { GlobalProvider } from "./context/GlobalContext";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { useEffect } from "react";
import { useSession, signIn } from "next-auth/react"; // Import NextAuth.js hooks
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession(); // Use NextAuth's session
  const pathname = usePathname();
  const router = useRouter();

  // Check authentication status using NextAuth.js session
  useEffect(() => {
    const checkAuth = async () => {
      // If the user is not authenticated, redirect them to the login page
      if (
        status === "unauthenticated" &&
        (pathname === "/watchlist" ||
          pathname === "/create/uni-event" ||
          pathname === "/feedback")
      ) {
        router.push("/login");
      }
    };

    checkAuth();
  }, [status, pathname, router]);

  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
          crossOrigin="anonymous"
        />
        <link rel="icon" href="/icon.png" />
        <meta name="description" content="Nearby events" />
        <title>Eventhub app</title>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-indigo-300`}
      >
        <GlobalProvider>
          <div>
            <Navbar />
            <div className="bodyRest">{children}</div>
          </div>
        </GlobalProvider>

        {/* Load scripts asynchronously */}
        <Script
          src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
          strategy="afterInteractive"
          integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
          crossOrigin="anonymous"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js"
          strategy="afterInteractive"
          integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
          crossOrigin="anonymous"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js"
          strategy="afterInteractive"
          integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}
