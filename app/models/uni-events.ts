import EventFormData from "../interface/eventFormData";
import mongoose from "mongoose";
import { Document } from "mongoose";

interface EventDocument extends EventFormData, Document {}

const UniEventSchema = new mongoose.Schema<EventDocument>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  time: { type: String, required: true }, // Make sure time is a string in ISO format
  source: { type: String, required: true },
  imageUrl: { type: String, required: false },
  category: { type: String, required: false },
  link: { type: String, required: false },
});

const Event =
  mongoose.models.UniEvent ||
  mongoose.model("UniEvent", UniEventSchema, "unievents");

export default Event;
