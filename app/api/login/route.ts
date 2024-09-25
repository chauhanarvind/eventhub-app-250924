import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../models/user";

// POST request for logging in a user
export async function POST(req: Request) {
  try {
    const { identifier, password } = await req.json(); // 'identifier' can be either username or email

    if (!identifier || !password) {
      return new NextResponse("Missing username/email or password", {
        status: 400,
      });
    }

    // Find the user by username or email
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) {
      return new NextResponse("Invalid username/email or password", {
        status: 400,
      });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return new NextResponse("Invalid username/email or password", {
        status: 400,
      });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "24h" }
    );

    return NextResponse.json({ token });
  } catch (error) {
    return new NextResponse("Failed to log in user", { status: 500 });
  }
}
