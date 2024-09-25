import { NextResponse } from "next/server";
import Feedback from "../../../../models/feedback";
import clientPromise from "../../../../lib/mongodb";
import { verifyJwt } from "../../../../lib/auth/verifyJWT"; // Import the JWT verifier

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Verify the JWT token
    const { decodedToken, error, status }: any = await verifyJwt(req);

    if (error) {
      return new NextResponse(error, { status });
    }

    const { rating, feedback } = await req.json();
    const userId = decodedToken?.userId; // Extract userId from the token

    if (!rating || rating < 1 || rating > 5) {
      return new NextResponse("Invalid rating", { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    // Save the feedback
    const newFeedback = new Feedback({
      eventId: params.id,
      userId, // User ID obtained from the verified JWT
      rating,
      feedback,
    });

    await newFeedback.save();

    return NextResponse.json({ message: "Feedback submitted successfully" });
  } catch (error) {
    console.error(error);
    return new NextResponse("Failed to submit feedback", { status: 500 });
  }
}

// GET request to fetch feedback and calculate the average rating for the event
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db();

    // Fetch feedback for the event
    const feedbacks = await Feedback.find({ eventId: params.id });

    // Calculate average rating
    const averageRating =
      feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) /
        feedbacks.length || 0;

    return NextResponse.json({
      feedbacks,
      averageRating: averageRating.toFixed(2), // Return average rating with 2 decimal places
    });
  } catch (error) {
    return new NextResponse("Failed to fetch feedback", { status: 500 });
  }
}
