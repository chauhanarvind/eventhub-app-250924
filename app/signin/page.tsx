"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Page = () => {
  const [formData, setFormData] = useState({ username: "", password: "" }); // can be username/email, will look for any in db

  const [message, setMessage] = useState("");

  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      console.log(formData);
      const response = await fetch(
        "https://ec2-34-229-185-121.compute-1.amazonaws.com/api/login",
        {
          method: "Get",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      console.log("result=", result);

      if (response.ok) {
        if (result.token) {
          setMessage("User signed in successfully");
          setFormData({ username: "", password: "" });
          localStorage.setItem("token", result.token);
          console.log("Token saved to local storage");
          setMessage("Error: " + result.message);
          router.push("/events");
        } else {
          console.log("Token not found in response");
        }
      } else {
        console.log("error", result);
        setMessage("Error: " + result.message);
      }
    } catch (error: any) {
      console.log(error);
      setMessage("Server error");
    }
  };

  return (
    <div>
      {/* <Header /> */}
      <h3>Sign in</h3>
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

        <Link href="/register">
          <button
            type="button"
            className={`btn btn-primary ${styles.buttoncontainer}`}
          >
            New User
          </button>
        </Link>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Page;
