"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Card from "../components/card";
import EventFormData from "../interface/eventFormData";

const EventPage = () => {
  const [result, setResult] = useState<EventFormData[]>([]);
  const [error, setError]: any = useState(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch("/api/uni-events", { method: "GET" });
        const data = await response.json();
        console.log("data==", data);
        setResult(data);
      } catch (err) {
        setError(err);
      }
    }

    fetchEvents();
  }, []);

  return (
    <div className={styles.cardContainer}>
      {result.map((item: EventFormData, resultIndex: number) => (
        <Card event={item} key={resultIndex} />
      ))}
    </div>
  );
};

export default EventPage;
