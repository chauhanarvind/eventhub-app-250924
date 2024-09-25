import { NextResponse } from "next/server";
import User from "../../../models/user";
import jwt from "jsonwebtoken";
import transporter from "../../../lib/nodemailer"; // Import Nodemailer with Amazon SES

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    // Generate a reset token
    const resetToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    // Create a password reset URL
    const resetURL = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password/${resetToken}`;

    // Send the email using Amazon SES
    await transporter.sendMail({
      from: process.env.SES_FROM_EMAIL, // Your verified SES email
      to: email, // The recipient's email
      subject: "Password Reset Request",
      text: `You requested a password reset. Please use the following link: ${resetURL}`,
      html: `<p>You requested a password reset. Please click <a href="${resetURL}">here</a> to reset your password.</p>`,
    });

    return NextResponse.json({ message: "Reset link sent to email" });
  } catch (error) {
    console.error(error);
    return new NextResponse("Failed to generate reset token", { status: 500 });
  }
}
