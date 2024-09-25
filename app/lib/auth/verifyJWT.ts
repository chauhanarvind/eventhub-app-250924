import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const SECRET_KEY = process.env.JWT_SECRET || "";

/**
 * Verifies a JWT token from the Authorization header.
 * @param {Request} req - The Next.js request object.
 * @returns {Object|null} Decoded token if valid, otherwise null.
 */
export async function verifyJwt(req: Request) {
  // Get the Authorization header
  const authHeader = req.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { error: "Unauthorized", status: 401 };
  }

  const token = authHeader.split(" ")[1]; // Extract the token part

  try {
    // Verify the JWT token
    const decodedToken = jwt.verify(token, SECRET_KEY);
    return { decodedToken }; // Return the decoded token if valid
  } catch (err) {
    console.error("JWT verification failed:", err);
    return { error: "Invalid or expired token", status: 401 };
  }
}
