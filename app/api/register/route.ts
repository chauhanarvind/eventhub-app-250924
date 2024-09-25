import { NextResponse } from "next/server";
import User from "../../models/user";
import bcrypt from "bcrypt";
import crypto from "crypto"; // For generating OTP
import transporter from "../../lib/nodemailer"; // Nodemailer setup
import clientPromise from "../../lib/mongodb"; // MongoDB connection

export async function POST(req: Request) {
  try {
    const {
      fullName,
      username,
      email,
      password,
      confirmPassword,
      phoneNumber,
      dateOfBirth,
      profilePicture,
      address,
      gender,
    } = await req.json();

    // Basic validation
    if (!fullName || !username || !email || !password || !confirmPassword) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    if (password !== confirmPassword) {
      return new NextResponse("Passwords do not match", { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new NextResponse("User already exists", { status: 400 });
    }

    // Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store the OTP and other user details temporarily
    const client = await clientPromise;
    const db = client.db();
    await db.collection("otp_verifications").insertOne({
      email,
      username,
      fullName,
      password: hashedPassword,
      phoneNumber,
      dateOfBirth,
      profilePicture,
      address,
      gender,
      otp,
      createdAt: new Date(),
    });

    // Send OTP to the user's email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Email Verification OTP",
      text: `Your OTP for email verification is: ${otp}`,
    });

    return NextResponse.json({
      message: "OTP sent to your email. Please verify.",
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Failed to send OTP", { status: 500 });
  }
}
