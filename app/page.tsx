"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /events
    router.push("/uni-events");
  }, [router]);

  return null;
}
