import { NextResponse } from "next/server";
import Watchlist from "../../models/watchlist";
import { getSession } from "next-auth/react";
import clientPromise from "../../lib/mongodb"; // MongoDB connection

// GET request to fetch the user's watchlist
export async function GET(req: Request) {
  const session: any = await getSession(); // Get the logged-in user session
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const userId = session.user.id;

  try {
    const watchlist = await Watchlist.find({ userId }).populate("eventId"); // Populate event details

    return NextResponse.json(watchlist);
  } catch (error) {
    return new NextResponse("Failed to fetch watchlist", { status: 500 });
  }
}

// POST request to add an event to the watchlist
export async function POST(req: Request) {
  const session: any = await getSession();
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { eventId } = await req.json();
  const userId = session.user.id;

  if (!eventId) {
    return new NextResponse("Event ID is required", { status: 400 });
  }

  try {
    // Check if the event is already in the watchlist
    const existingEntry = await Watchlist.findOne({ userId, eventId });
    if (existingEntry) {
      return new NextResponse("Event already in watchlist", { status: 400 });
    }

    // Add the event to the watchlist
    const newWatchlistEntry = new Watchlist({ userId, eventId });
    await newWatchlistEntry.save();

    return NextResponse.json({ message: "Event added to watchlist" });
  } catch (error) {
    return new NextResponse("Failed to add event to watchlist", {
      status: 500,
    });
  }
}

// DELETE request to remove an event from the watchlist
export async function DELETE(req: Request) {
  const session: any = await getSession();
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const userId = session.user.id;
  const { eventId } = await req.json();

  if (!eventId) {
    return new NextResponse("Event ID is required", { status: 400 });
  }

  try {
    // Remove the event from the watchlist
    await Watchlist.findOneAndDelete({ userId, eventId });

    return NextResponse.json({ message: "Event removed from watchlist" });
  } catch (error) {
    return new NextResponse("Failed to remove event from watchlist", {
      status: 500,
    });
  }
}
