"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
}

const WatchlistPage = () => {
  const [watchlist, setWatchlist] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const response = await fetch("/api/watchlist");
        if (!response.ok) {
          throw new Error("Failed to fetch watchlist");
        }
        const data = await response.json();
        setWatchlist(data);
      } catch (error) {
        console.error("Error fetching watchlist:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, []);

  const handleRemoveFromWatchlist = async (eventId: string) => {
    try {
      const response = await fetch(`/api/watchlist/${eventId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to remove event from watchlist");
      }
      setWatchlist(watchlist.filter((event) => event.id !== eventId));
    } catch (error) {
      console.error("Error removing event from watchlist:", error);
    }
  };

  if (loading) {
    return <div>Loading your watchlist...</div>;
  }

  if (watchlist.length === 0) {
    return <div>Your watchlist is currently empty.</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Your Watchlist</h1>
      <div className="list-group">
        {watchlist.map((event) => (
          <div
            key={event.id}
            className="list-group-item list-group-item-action flex-column align-items-start"
          >
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{event.title}</h5>
              <small>{new Date(event.date).toLocaleDateString()}</small>
            </div>
            <p className="mb-1">{event.description}</p>
            <small>Location: {event.location}</small>
            <button
              className="btn btn-danger btn-sm mt-2"
              onClick={() => handleRemoveFromWatchlist(event.id)}
            >
              Remove from Watchlist
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchlistPage;
