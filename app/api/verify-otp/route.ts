import { NextResponse } from "next/server";
import User from "../../models/user";
import clientPromise from "../../lib/mongodb";

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    // Find the user by email and otp in the OTP collection
    const otpVerification = await db
      .collection("otp_verifications")
      .findOne({ email, otp });

    if (!otpVerification) {
      return new NextResponse("Invalid OTP or email", { status: 400 });
    }

    // Extract user details from the otp_verifications collection
    const {
      fullName,
      username,
      password,
      phoneNumber,
      dateOfBirth,
      profilePicture,
      address,
      gender,
    } = otpVerification;

    // Create new user with all details
    const newUser = new User({
      fullName,
      username,
      email,
      password, // Already hashed
      phoneNumber,
      dateOfBirth,
      profilePicture,
      address,
      gender,
    });

    await newUser.save();

    // Remove the OTP verification record
    await db.collection("otp_verifications").deleteOne({ email });

    return NextResponse.json({
      message: "Email verified and account created successfully",
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Failed to verify OTP", { status: 500 });
  }
}
