import mongoose, { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  fullName: {
    type: String,
    required: [true, "Full Name is required"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  phoneNumber: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
  },
  profilePicture: {
    type: String, // URL or path to the uploaded profile picture
  },
  address: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = models.User || model("User", userSchema);

export default User;
