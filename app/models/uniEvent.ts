import mongoose, { Schema, model, models } from "mongoose";

const uniEventSchema = new Schema({
  title: {
    type: String,
    required: [true, "University Event title is required"],
  },
  description: {
    type: String,
    required: [true, "University Event description is required"],
  },
  date: {
    type: Date,
    required: [true, "University Event date is required"],
  },
  location: {
    type: String,
    required: [true, "University Event location is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create an index on the title and date fields for efficient querying
uniEventSchema.index({ title: 1, date: 1 });

const UniEvent = models.UniEvent || model("UniEvent", uniEventSchema);

export default UniEvent;
