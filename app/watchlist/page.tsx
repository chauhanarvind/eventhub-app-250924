// Page.tsx
"use client";

import { useState, useEffect, useContext } from "react";
import styles from "./page.module.css";
import Card from "../components/card";
import GetFavs from "../components/getFavs";
import EventFormData from "../interface/eventFormData";
import { GlobalContext } from "../layout";

const Page = () => {
  const { globalVar, setGlobalVar } = useContext(GlobalContext);
  const [result, setResult] = useState<EventFormData[]>([]);
  const [favs, setFavs] = useState<EventFormData[]>([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchEvents() {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          return;
        }

        const response = await fetch(
          "https://ec2-34-229-185-121.compute-1.amazonaws.com/api/getfav",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const data = await response.json();

        setResult(data.events || []);
        setMessage(data.message || "");
      } catch (err: any) {
        setError(err.message || "An error occurred");
      }
    }

    async function fetchFavs() {
      try {
        const result = await GetFavs();
        setFavs(result);
      } catch (err: any) {
        console.log(err);
      }
    }

    fetchEvents();
    fetchFavs();
  }, []);

  return (
    <div>
      {!globalVar && <p>Please Login</p>}
      {globalVar && (
        <div className={styles.cardContainer}>
          {error && <p>{error}</p>}
          {result.length === 0 && !error && <p>No favorite events found.</p>}
          {result.map((item, resultIndex) => (
            <div className={styles.category} key={resultIndex}>
              <Card
                event={item}
                favs={favs}
                events={result}
                setEvents={setResult}
                parentComponent="watchList"
                index={resultIndex}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
