"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import Card from "../components/card";
import GetFavs from "../components/getFavs";
import EventFormData from "../interface/eventFormData";
import Link from "next/link";

const EventPage = () => {
  const [result, setResult] = useState<EventFormData[]>([]);
  const [favs, setFavs] = useState<EventFormData[]>([]);
  const [error, setError]: any = useState("");

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch(
          "http://ec2-34-229-185-121.compute-1.amazonaws.com/Items",
          { method: "GET" }
        );
        const data = await response.json();
        setResult(data);
        console.log(data);
      } catch (err) {
        setError(err);
      }
    }

    async function fetchfavs() {
      try {
        const result = await GetFavs();
        setFavs(result);
      } catch (err: any) {
        console.log(err);
      }
    }

    fetchEvents();
    fetchfavs();
  }, []);

  return (
    <div className={styles.cardContainer}>
      {result.map((item: any, resultIndex: any) => (
        <div className={styles.category} key={resultIndex}>
          {/* Pass the eventID as a query parameter */}
          <Link href={`/events/${item.eventID}`}>
            <Card
              event={item}
              favs={favs}
              events={result}
              setEvents={setResult}
              parentComponent="events"
              index={resultIndex}
            />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default EventPage;
