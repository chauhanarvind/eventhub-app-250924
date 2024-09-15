import React, { useEffect, useState } from "react";
import styles from "./card.module.css";
import EventFormData from "../interface/eventFormData";
import Heart from "./heart";

interface Props {
  event: EventFormData; // Single event object
  favs: EventFormData[]; // Array of favorite events
  events: EventFormData[]; // Array of all events
  setEvents: (events: EventFormData[]) => void; // Function to update events
  parentComponent: string; // Name of the parent component or identifier
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

  const maxname = 40;
  const maxdesc = 80;
  const maxlocation = 40;

  event.name =
    event.name.length > maxname
      ? event.name.slice(0, maxname) + "..."
      : event.name;

  event.description =
    event.description.length > maxdesc
      ? event.description.slice(0, maxdesc) + "..."
      : event.description;

  event.location =
    event.location.length > maxlocation
      ? event.location.slice(0, maxlocation) + "..."
      : event.location;

  useEffect(() => {
    if (favs.length !== 0) {
      const eventExists = (arr: EventFormData[], id: string) => {
        return arr.some((event) => event.eventID === id);
      };
      setHeartClicked(eventExists(favs, event.eventID));
    }
  }, [favs, event.eventID]);

  event.time = new Date(event.time).toDateString();

  async function handleHeartClicked() {
    const newHeartState = !heartClicked;
    setHeartClicked(newHeartState); // Optimistically update the UI

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No token found");
      }

      let response;
      if (newHeartState) {
        // Add to favorites
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
        console.log(response);
      } else {
        // Remove from favorites
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

        console.log(response);
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
    <div
      className={`card ${styles.card}`}
      style={{
        width: "18rem",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {event.imageUrl && (
        <img className="card-img-top" src={event.imageUrl} alt={event.name} />
      )}

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{event.name || "Event Name"}</h5>
        <p className="card-text">
          {event.description || "No description provided"}
        </p>
        <p className="card-text">{event.time || "No time provided"}</p>
        <p className="card-text">{event.location || "No location provided"}</p>

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
