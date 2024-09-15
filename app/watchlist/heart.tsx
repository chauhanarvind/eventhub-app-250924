import React from "react";
import styles from "./heart.module.css"; // Optional CSS module for styling

const Heart = ({ clicked, onClick }: any) => {
  return (
    <svg
      onClick={onClick}
      className={`${styles.heart} ${clicked ? styles.clicked : ""}`} // Optional class for additional styling
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="50"
      height="50"
      fill={clicked ? "red" : "none"}
      stroke="red"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 21C12 21 4 13.75 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12.91 4.03 13.5 5.35C14.09 4.03 15.76 3 17.5 3C20.58 3 23 5.42 23 8.5C23 13.75 15 21 12 21Z" />
    </svg>
  );
};

export default Heart;
