import mongoose, { Schema, model, models } from "mongoose";

const uniEventSchema = new Schema({
  title: {
    type: String,
    required: [true, "Event title is required"],
  },
  description: {
    type: String,
    maxlength: [1500, "Description cannot be more than 1500 characters"],
  },
  date: {
    type: Date,
    required: [true, "Event date is required"],
  },
  location: {
    type: String,
    required: [true, "Event location is required"],
  },
  price: {
    type: Number,
    required: [true, "Event price is required"],
    min: 0, // Price cannot be negative
  },
  link: {
    type: String,
    default: null, // Optional field, can be null
  },
  category: {
    type: String,
    default: null, // Optional field, can be null
  },
  image: {
    type: String,
    default: null, // Optional field, can be null
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save middleware to update the `updatedAt` field on every save
uniEventSchema.pre("save", function (next) {
  this.updatedAt = new Date(); // Ensure updatedAt is a Date object
  next();
});

const UniEvent = models.UniEvent || model("UniEvent", uniEventSchema);

export default UniEvent;
