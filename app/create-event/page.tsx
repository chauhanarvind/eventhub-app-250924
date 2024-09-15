"use client";
import { useContext, useState } from "react";
import { GlobalContext } from "../layout";

const CreateEvent = () => {
  const { globalVar, setGlobalVar } = useContext(GlobalContext);
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleImageChange = (e: any) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!image) {
      setMessage("Please upload an image.");
      return;
    }

    // Create form data
    const formData = new FormData();
    formData.append("eventName", eventName);
    formData.append("eventDate", eventDate);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("image", image); // Append the image file

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Please login");
      }

      const response = await fetch(
        "http://ec2-34-229-185-121.compute-1.amazonaws.com/createEvent",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Event created successfully!");
      } else {
        setMessage("Error: " + data.message);
      }
    } catch (error: any) {
      setMessage("Error submitting the form: " + error.message);
    }
  };

  return (
    <div>
      {!globalVar && <p>Please Login</p>}
      {globalVar && (
        <div>
          <h1>Create Event</h1>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div>
              <label>Event Name:</label>
              <input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Event Date:</label>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Description:</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Location:</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Image:</label>
              <input type="file" onChange={handleImageChange} required />
            </div>
            <button type="submit">Create Event</button>
          </form>
          {message && <p>{message}</p>}
        </div>
      )}
    </div>
  );
};

export default CreateEvent;
