"use client";

import React, { useState } from "react";

const Page = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    name: "",
    confirmpassword: "",
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
      const response = await fetch("/api/user/register", {
        method: "Post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      console.log("result=", result);

      if (response.ok) {
        setMessage("User created successfully");
        setFormData({
          name: "",
          username: "",
          email: "",
          password: "",
          confirmpassword: "",
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
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInput}
            className="form-control"
            id="email"
            aria-describedby="email"
            placeholder="Enter email"
          />
          <small id="email" className="form-text text-muted">
            We will never share your email with anyone else.
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            onChange={handleInput}
            value={formData.name}
            className="form-control"
            id="name"
            aria-describedby="name"
            placeholder="Enter Name"
          />
        </div>

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
        <div className="form-group">
          <label htmlFor="confirmpassword">Confirm Password</label>
          <input
            type="password"
            name="confirmpassword"
            onChange={handleInput}
            value={formData.confirmpassword}
            className="form-control"
            id="confirmpassword"
            placeholder="Confirm Password"
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
