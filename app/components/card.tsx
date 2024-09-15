import React from "react";
import styles from "./card.module.css";
import EventFormData from "../interface/eventFormData";

interface Props {
  event: EventFormData;
}

const Card = ({ event }: Props) => {
  console.log(event);
  return (
    <div
      className={`card ${styles.card}`}
      style={{
        width: "18rem",
        display: "flex",
        flexDirection: "column",
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

        <a href="#" className="btn btn-primary mt-auto">
          Go somewhere
        </a>
      </div>
    </div>
  );
};

export default Card;
