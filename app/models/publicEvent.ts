import mongoose, { Schema, model, models } from "mongoose";

const publicEventSchema = new Schema({
  title: {
    type: String,
    required: [true, "Public Event title is required"],
  },
  description: {
    type: String,
    required: [true, "Public Event description is required"],
  },
  date: {
    type: Date,
    required: [true, "Public Event date is required"],
  },
  location: {
    type: String,
    required: [true, "Public Event location is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PublicEvent =
  models.PublicEvent || model("PublicEvent", publicEventSchema);

export default PublicEvent;
