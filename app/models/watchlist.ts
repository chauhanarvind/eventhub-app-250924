import mongoose, { Schema, model, models } from "mongoose";

const watchlistSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  events: [
    {
      eventId: {
        type: Schema.Types.ObjectId,
        ref: "Event",
        required: true,
      },
      addedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Watchlist = models.Watchlist || model("Watchlist", watchlistSchema);

export default Watchlist;
