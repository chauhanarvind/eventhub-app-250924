import mongoose, { Schema, model, models } from "mongoose";

const watchlistSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to User model
    required: true,
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event", // Reference to Event model
    required: true,
  },
});

const Watchlist = models.Watchlist || model("Watchlist", watchlistSchema);

export default Watchlist;
