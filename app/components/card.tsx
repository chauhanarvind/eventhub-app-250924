"use client";
import React, { useEffect, useState } from "react";
import styles from "./card.module.css";
import EventFormData from "../interface/eventFormData";
import Heart from "./heart";
import { useRouter } from "next/navigation";
import EventDetail from "../events/detail/page";

interface Props {
  event: EventFormData;
  favs: EventFormData[];
  events: EventFormData[];
  setEvents: (events: EventFormData[]) => void;
  parentComponent: string;
  index: number;
}

const Card = ({
  event,
  favs,
  events,
  setEvents,
  parentComponent,
  index,
}: Props) => {
  const [heartClicked, setHeartClicked] = useState(false);

  const router = useRouter();

  const maxname = 40;
  const maxdesc = 80;
  const maxlocation = 40;

  const name =
    event.name.length > maxname
      ? event.name.slice(0, maxname) + "..."
      : event.name;

  const description =
    event.description.length > maxdesc
      ? event.description.slice(0, maxdesc) + "..."
      : event.description;

  const location =
    event.location.length > maxlocation
      ? event.location.slice(0, maxlocation) + "..."
      : event.location;

  const handleCardClick = (e: any) => {
    e.preventDefault();

    localStorage.setItem("event", JSON.stringify(event));
    // Redirect to another page
    router.push("/events/detail");
  };

  useEffect(() => {
    if (favs.length !== 0) {
      const eventExists = (arr: EventFormData[], id: string) => {
        return arr.some((event) => event.eventID === id);
      };
      setHeartClicked(eventExists(favs, event.eventID));
    }
  }, [favs, event.eventID]);

  let time = new Date(event.time).toDateString();

  async function handleHeartClicked() {
    const newHeartState = !heartClicked;
    setHeartClicked(newHeartState);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No token found");
      }

      let response;
      if (newHeartState) {
        response = await fetch(
          `http://ec2-34-229-185-121.compute-1.amazonaws.com/addfav/${event.eventID}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        response = await fetch(
          `http://ec2-34-229-185-121.compute-1.amazonaws.com/delfav/${event.eventID}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (parentComponent === "watchList") {
          const updatedEvents = events.filter((_, idx) => idx !== index);
          setEvents(updatedEvents);
        }
      }

      if (!response.ok) {
        throw new Error("Failed to update favorites");
      }
    } catch (err: any) {
      console.log("Error updating favorites:", err.message);
      setHeartClicked(!newHeartState);
    }
  }

  return (
    <div className={styles.card}>
      {event.imageUrl && (
        <img
          className={styles.cardImg}
          src={event.imageUrl}
          alt={event.name}
          onClick={handleCardClick}
        />
      )}

      <div className={styles.cardBody}>
        <h5 className={styles.cardTitle}>{name}</h5>
        <p className={styles.cardText}>{description}</p>
        <p className={styles.cardText}>{time}</p>
        <p className={styles.cardText}>{location}</p>

        <div className={styles.heart}>
          <Heart
            clicked={heartClicked}
            onClick={handleHeartClicked}
            size={30}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
