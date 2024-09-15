"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import Card from "../components/card";

const EventPage = () => {
  const [result, setResult] = useState([]);
  const [error, setError]: any = useState("");

  useEffect(() => {
    async function fetchEvents() {
      try {
        // Call the local Python API running on port 5000
        const response = await fetch(
          "http://ec2-34-229-185-121.compute-1.amazonaws.com/Items",
          { method: "Get" }
        );
        const data = await response.json();
        setResult(data);
        console.log(data);
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
          {/* <h3>{item.name}</h3> */}
          {/* <hr></hr> */}
          {/* <div className={styles.cardContainer}> */}
          <Card event={item} />
          {/* </div> */}
        </div>
      ))}
    </div>
  );
};

export default EventPage;
