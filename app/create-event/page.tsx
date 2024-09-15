"use client";
import React, { useState } from "react";
import axios from "axios";

const CreateEventForm = () => {
  const [formData, setFormData] = useState({
    eventName: "",
    eventDate: "",
    description: "",
    location: "",
    image: null as File | null,
  });
  const [message, setMessage] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFormData({ ...formData, image: event.target.files[0] });
    }
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.image) {
      setMessage("Image file is required");
      return;
    }

    formData.eventDate = "2024-09-09T10:00:00";

    try {
      const token = localStorage.getItem("token");
      console.log(formData);
      const response = await axios.post(
        "https://ec2-34-229-185-121.compute-1.amazonaws.com/api/createEvent",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);
      setMessage(`Event created successfully: ${response.data.message}`);
      setFormData({
        eventName: "",
        eventDate: "",
        description: "",
        location: "",
        image: null as File | null,
      });
    } catch (error: any) {
      setMessage(`Error creating event: ${error.message}`);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <div className="w-50">
        <h1 className="text-center mb-4">Create Event</h1>
        <form
          onSubmit={handleSubmit}
          className="p-4 border rounded shadow-sm bg-white"
        >
          <div className="mb-3">
            <label htmlFor="eventName" className="form-label">
              Event Name
            </label>
            <input
              type="text"
              className="form-control"
              id="eventName"
              value={formData.eventName}
              onChange={handleChange}
              placeholder="Enter event name"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="eventDate" className="form-label">
              Event Date
            </label>
            <input
              type="date"
              className="form-control"
              id="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter event description"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="location" className="form-label">
              Location
            </label>
            <input
              type="text"
              className="form-control"
              id="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter event location"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="image" className="form-label">
              Image
            </label>
            <input
              type="file"
              className="form-control"
              id="image"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Create Event
          </button>
        </form>

        {message && (
          <div
            className={`alert mt-4 ${
              message.includes("Error") ? "alert-danger" : "alert-success"
            }`}
            role="alert"
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateEventForm;
