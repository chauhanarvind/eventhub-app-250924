import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../../models/user";

// POST request to reset the password
export async function POST(
  req: Request,
  { params }: { params: { token: string } }
) {
  try {
    const { password } = await req.json();
    const { token } = params;

    // Verify token
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    const userId = decoded.userId;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return new NextResponse("Invalid token or user not found", {
        status: 400,
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user's password
    user.password = hashedPassword;
    await user.save();

    return NextResponse.json({ message: "Password reset successfully" });
  } catch (error) {
    return new NextResponse("Failed to reset password", { status: 500 });
  }
}
