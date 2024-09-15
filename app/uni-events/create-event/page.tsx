"use client";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import eventFormData from "@/app/interface/eventFormData";

const Page = () => {
  const [formData, setFormData] = useState<eventFormData>({
    name: "",
    description: "",
    location: "",
    time: "",
    source: "",
    imageUrl: null,
    category: null,
    link: null,
  });

  const [startDate, setStartDate] = useState(null);

  const [message, setMessage] = useState("");

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date: any) => {
    setStartDate(date);
    setFormData({ ...formData, time: date.toISOString() }); // Update formData with ISO formatted date
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // setFormData({ ...formData, source: "manual" });
    formData.source = "manual";

    console.log("formData==", formData);

    try {
      const response = await fetch("/api/uni-events", {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log("result==", result);

      if (response.ok) {
        setMessage("Event added successfully!");
        setFormData({
          name: "",
          description: "",
          location: "",
          time: "",
          source: "",
          category: null,
          imageUrl: null,
          link: null,
        });
      } else {
        console.log("inside error", result);
        setMessage("Error: " + result.message);
      }
    } catch (error) {
      setMessage("An error occured while submitting the event");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Event Name</label>
          <input
            name="name"
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter event name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Event Address</label>
          <input
            name="location"
            type="text"
            className="form-control"
            id="location"
            placeholder="Enter event address"
            value={formData.location}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            className="form-control"
            id="description"
            rows={3}
            value={formData.description}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              name="time"
              label="Select Date"
              value={startDate}
              onChange={handleDateChange}
            />
          </LocalizationProvider>
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
