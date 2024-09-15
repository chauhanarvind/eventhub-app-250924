"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /events
    router.push("/events");
  }, [router]); // Ensure to include router as a dependency

  return null; // You can return null or a loading indicator if needed
}
