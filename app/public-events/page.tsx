"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import Card from "../components/card";
import EventFormData from "../interface/eventFormData";
import Link from "next/link";

const EventPage = () => {
  const [result, setResult] = useState<EventFormData[]>([]);
  const [favs, setFavs] = useState<EventFormData[]>([]);
  const [error, setError]: any = useState("");

  useEffect(() => {
    async function fetchEvents() {
      try {
        console.log("called");
        const response = await fetch(
          "https://ec2-34-229-185-121.compute-1.amazonaws.com/api/Items",
          { method: "GET" }
        );
        const data = await response.json();
        setResult(data);
        console.log(data.length);
      } catch (err) {
        setError(err);
      }
    }

    fetchEvents();
  }, []);

  return (
    <div className={styles.cardContainer}>
      {result.map((item: any, resultIndex: any) => (
        <div className={styles.category} key={resultIndex}>
          <div className={styles.cardContainer}>
            {result.map((item: any, resultIndex: any) => (
              <div className={styles.category} key={resultIndex}>
                <Card
                  event={item}
                  favs={favs}
                  events={result}
                  setEvents={setResult}
                  parentComponent="events"
                  index={resultIndex}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventPage;
