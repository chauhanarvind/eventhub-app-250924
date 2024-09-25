"use client";
import { useState } from "react";
import { useRouter } from "next/router";

export default function CreateUniEventPage() {
  const [formData, setFormData] = useState({
    title: "",
    briefDescription: "",
    description: "",
    date: "",
    location: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/uni-events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to create event");
      }

      const data = await res.json();
      setMessage("Event created successfully!");
      router.push("/uni-events"); // Redirect to the uni-events page after creation
    } catch (error: any) {
      setMessage("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Create University Event</h1>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div>
          <label>Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
        </div>

        {/* Brief Description (max 200 characters) */}
        <div>
          <label>Brief Description (Max 200 characters)</label>
          <textarea
            value={formData.briefDescription}
            onChange={(e) =>
              setFormData({ ...formData, briefDescription: e.target.value })
            }
            maxLength={200}
            required
          ></textarea>
        </div>

        {/* Full Description (max 1500 characters) */}
        <div>
          <label>Full Description (Max 1500 characters)</label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            maxLength={1500}
            required
          ></textarea>
        </div>

        {/* Date */}
        <div>
          <label>Date</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </div>

        {/* Location */}
        <div>
          <label>Location</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>

      {/* Feedback Message */}
      {message && <p>{message}</p>}
    </div>
  );
}
