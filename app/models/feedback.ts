import mongoose, { Schema, model, models } from "mongoose";

const feedbackSchema = new Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UniEvent", // Reference to the UniEvent model
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5, // Star rating between 1 and 5
  },
  feedback: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Feedback = models.Feedback || model("Feedback", feedbackSchema);

export default Feedback;
