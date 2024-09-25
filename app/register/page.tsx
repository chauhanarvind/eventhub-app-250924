"use client";

import React, { useState } from "react";
import styles from "./page.module.css";

const Page = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [warnings, setWarnings] = useState({
    username: "",
    password: "",
  });

  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "username") {
      validateUsername(value);
    }

    if (name === "password") {
      validatePassword(value);
    }
  };

  const validateUsername = (username: string) => {
    console.log("hello here");
    setFormData({ ...formData, username: username.trim() });
    if (username.length < 4 || username.length > 16) {
      console.log("hello");
      setWarnings((prev) => ({
        ...prev,
        username: "Username must be between 4-16 characters long.",
      }));
    } else {
      setWarnings((prev) => ({ ...prev, username: "" }));
    }
  };

  const validatePassword = (password: string) => {
    // Password should be at least 8 characters and contain a special character
    const passwordPattern =
      /^(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8,16}$/;

    if (!passwordPattern.test(password)) {
      setWarnings((prev) => ({
        ...prev,
        password:
          "Password must be at least 8-16 alpa numeric characters long and contain at least one special character.",
      }));
    } else {
      setWarnings((prev) => ({ ...prev, password: "" }));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (formData.username.length == 0 || formData.password.length == 0) {
      setMessage("Please fill in all fields.");
      return;
    }

    // Ensure both username and password are valid before submitting
    if (warnings.username || warnings.password) {
      setMessage("Please correct the errors before submitting.");
      console.log("okayy");
      return;
    }

    console.log("mann");
    try {
      console.log(formData);
      const response = await fetch(
        "https://ec2-34-229-185-121.compute-1.amazonaws.com/api/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        setMessage("User created successfully");
        setFormData({
          username: "",
          password: "",
        });
      } else {
        setMessage("Error: " + result.message);
      }
    } catch (error: any) {
      console.log(error);
      setMessage("An error occurred while creating the user");
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
            aria-describedby="usernameHelp"
            placeholder="Enter username"
          />
          {warnings.username && (
            <p className="text-danger">{warnings.username}</p>
          )}
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
          {warnings.password && (
            <p className="text-danger">{warnings.password}</p>
          )}
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
