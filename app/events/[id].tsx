import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import EventFormData from "../interface/eventFormData";

const EventDetail = () => {
  const router = useRouter();
  const { id } = router.query; // Get the event ID from the query
  const [event, setEvent]: any = useState();

  //   useEffect(() => {
  //     if (id) {
  //       async function fetchEvent() {
  //         try {
  //           const response = await fetch(
  //             `http://ec2-34-229-185-121.compute-1.amazonaws.com/Items/${id}`
  //           );
  //           const data = await response.json();
  //           setEvent(data);
  //         } catch (err) {
  //           console.error("Error fetching event data:", err);
  //         }
  //       }

  //       fetchEvent();
  //     }
  //   }, [id]);

  if (!event) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <h1>{event.eventName}</h1>
      <p>{event.description}</p>
      <p>{event.location}</p>
      <p>{event.eventDate}</p>
    </div>
  );
};

export default EventDetail;
