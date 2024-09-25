import { NextResponse } from "next/server";
import UniEvent from "../../../models/uniEvent"; // Assuming the model is the same
import { ObjectId } from "mongodb"; // Use ObjectId for fetching specific events

// GET request for fetching a specific university event by ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Ensure valid ObjectId
    if (!ObjectId.isValid(id)) {
      return new NextResponse("Invalid event ID", { status: 400 });
    }

    // Find the university event by ID
    const event = await UniEvent.findById(id);
    if (!event) {
      return new NextResponse("Event not found", { status: 404 });
    }

    // Cap the description to 1500 characters if it exceeds that length
    const briefDescription =
      event.description.length > 1500
        ? event.description.slice(0, 1500) + "..."
        : event.description;

    return NextResponse.json({
      ...event._doc, // Spread other event details
      briefDescription,
    });
  } catch (error) {
    return new NextResponse("Failed to fetch event details", { status: 500 });
  }
}
