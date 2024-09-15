"use client";

import React, { useState } from "react";

const Page = () => {
  const [formData, setFormData] = useState({ username: "", password: "" }); // can be username/email, will look for any in db

  const [message, setMessage] = useState("");

  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      console.log(formData);
      const response = await fetch("/api/user/signin", {
        method: "Post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      console.log("result=", result);

      if (response.ok) {
        setMessage("User signed in successfully");
        setFormData({ username: "", password: "" });

        console.log(result.headers);
        // console.log(token);

        // setCookie("token", token, 1);
      } else {
        console.log("error", result);
        setMessage("Error: " + result.message);
      }
    } catch (error: any) {
      setMessage("Server error");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username or email address</label>
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

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Page;
