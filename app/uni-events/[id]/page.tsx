"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function UniEventDetailPage() {
  const [event, setEvent] = useState<any>(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [rating, setRating] = useState(0); // User's star rating
  const [feedback, setFeedback] = useState(""); // User's feedback
  const [message, setMessage] = useState("");
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const res = await fetch(`/api/uni-events/${id}`);
        const eventData = await res.json();
        setEvent(eventData);

        const feedbackRes = await fetch(`/api/uni-events/${id}/feedback`);
        const feedbackData = await feedbackRes.json();
        setFeedbacks(feedbackData.feedbacks);
        setAverageRating(feedbackData.averageRating);
      } catch (error) {
        console.error(error);
      }
    };

    if (id) {
      fetchEventDetails();
    }
  }, [id]);

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/uni-events/${id}/feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating,
          feedback,
          userId: "currentUserId", // Replace with actual user ID (usually from session/auth token)
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit feedback");
      }

      setMessage("Feedback submitted successfully!");
      setRating(0);
      setFeedback("");

      // Refresh feedback list
      const feedbackRes = await fetch(`/api/uni-events/${id}/feedback`);
      const feedbackData = await feedbackRes.json();
      setFeedbacks(feedbackData.feedbacks);
      setAverageRating(feedbackData.averageRating);
    } catch (error: any) {
      setMessage("Error: " + error.message);
    }
  };

  if (!event) return <p>Loading...</p>;

  return (
    <div>
      <h1>{event.title}</h1>
      <p>
        <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
      </p>
      <p>
        <strong>Location:</strong> {event.location}
      </p>

      <h2>Description</h2>
      <p>
        <strong>Descrption:</strong>
        {event.description}
      </p>

      <h2>Feedback & Rating</h2>
      <p>
        <strong>Average Rating:</strong> {averageRating} / 5
      </p>

      {/* Display existing feedback */}
      <ul>
        {feedbacks.map((fb: any, index) => (
          <li key={index}>
            <p>
              <strong>Rating:</strong> {fb.rating} / 5
            </p>
            <p>
              <strong>Feedback:</strong> {fb.feedback || "No feedback provided"}
            </p>
            <p>
              <small>
                Submitted on: {new Date(fb.createdAt).toLocaleDateString()}
              </small>
            </p>
          </li>
        ))}
      </ul>

      <h3>Submit Your Feedback</h3>
      <form onSubmit={handleFeedbackSubmit}>
        <div>
          <label>Star Rating (1-5):</label>
          <input
            type="number"
            value={rating}
            min="1"
            max="5"
            onChange={(e) => setRating(Number(e.target.value))}
            required
          />
        </div>

        <div>
          <label>Feedback:</label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Optional feedback"
          ></textarea>
        </div>

        <button type="submit">Submit Feedback</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
