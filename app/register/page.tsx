"use client";

import React, { useState } from "react";
import styles from "./page.module.css";

const Page = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    console.log("over here");
    e.preventDefault();
    console.log(formData);

    try {
      const response = await fetch(
        "https://ec2-34-229-185-121.compute-1.amazonaws.com/api/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      console.log("result=", result);

      if (response.ok) {
        setMessage("User created successfully");
        setFormData({
          username: "",
          password: "",
        });
      } else {
        console.log("error", result);
        setMessage("Error: " + result.message);
      }
    } catch (error: any) {
      console.log(error);
      setMessage("An error occured while creating the user");
    }
  };

  return (
    <div>
      <h3>Register</h3>
      <form onSubmit={handleSubmit} className={styles.box}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            onChange={handleInput}
            value={formData.username}
            className="form-control"
            id="username"
            aria-describedby="username"
            placeholder="Enter username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            onChange={handleInput}
            value={formData.password}
            className="form-control"
            id="password"
            placeholder="Password"
          />
        </div>
        <button
          type="submit"
          className={`btn btn-primary ${styles.buttoncontainer}`}
        >
          Submit
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Page;
