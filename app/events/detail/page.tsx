"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import EventFormData from "@/app/interface/eventFormData";

const EventDetail = () => {
  const [event, setEvent]: any = useState();

  useEffect(() => {
    // Retrieve the array from localStorage
    const savedArray = localStorage.getItem("event");
    if (savedArray) {
      const eventData = JSON.parse(savedArray);
      if (eventData.date) {
        eventData.date = new Date(eventData.date).toDateString();
      }
      setEvent(eventData); // Set the state with the processed data
    }
  }, []);

  return (
    <div className={styles.container}>
      {event ? (
        <>
          <div>{event.name}</div>
          {event.imageUrl && (
            <img
              className={styles.cardImg}
              src={event.imageUrl}
              alt={event.name}
            />
          )}
          <div>{event.description}</div>
          <div>{event.location}</div>
          <div>{event.date}</div>
        </>
      ) : (
        <div className={styles.loading}>Loading...</div> // Loading text with blinking effect
      )}
    </div>
  );
};

export default EventDetail;
