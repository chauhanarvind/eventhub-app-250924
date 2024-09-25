import mongoose, { Schema, model, models } from "mongoose";

const eventSchema = new Schema({
  title: {
    type: String,
    required: [true, "Event title is required"],
  },
  description: {
    type: String,
    required: [true, "Event description is required"],
  },
  date: {
    type: Date,
    required: [true, "Event date is required"],
  },
  location: {
    type: String,
    required: [true, "Event location is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Event = models.Event || model("Event", eventSchema);

export default Event;
