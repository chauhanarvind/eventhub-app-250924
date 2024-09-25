import { NextResponse } from "next/server";
import Watchlist from "../../models/watchlist";
import { ObjectId } from "mongodb";

// GET request to fetch a user's watchlist
export async function GET(req: Request) {
  try {
    const userId = req.headers.get("user-id"); // Assume the user ID is passed in headers
    if (!userId) {
      return new NextResponse("User ID is missing", { status: 400 });
    }

    const watchlist = await Watchlist.findOne({
      userId: new ObjectId(userId),
    }).populate("events.eventId");

    if (!watchlist) {
      return new NextResponse("No watchlist found", { status: 404 });
    }

    return NextResponse.json(watchlist.events);
  } catch (error) {
    return new NextResponse("Failed to fetch watchlist", { status: 500 });
  }
}

// POST request to add an event to the watchlist
export async function POST(req: Request) {
  try {
    const { userId, eventId } = await req.json();

    if (!userId || !eventId) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    let watchlist = await Watchlist.findOne({ userId: new ObjectId(userId) });

    if (!watchlist) {
      // If the user doesn't have a watchlist, create one
      watchlist = new Watchlist({ userId, events: [{ eventId }] });
    } else {
      // Add the event to the user's existing watchlist
      watchlist.events.push({ eventId });
    }

    await watchlist.save();

    return NextResponse.json(watchlist);
  } catch (error) {
    return new NextResponse("Failed to add event to watchlist", {
      status: 500,
    });
  }
}

// DELETE request to remove an event from the watchlist
export async function DELETE(req: Request) {
  try {
    const { userId, eventId } = await req.json();

    if (!userId || !eventId) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const watchlist = await Watchlist.findOneAndUpdate(
      { userId: new ObjectId(userId) },
      { $pull: { events: { eventId: new ObjectId(eventId) } } },
      { new: true }
    );

    if (!watchlist) {
      return new NextResponse("Watchlist not found", { status: 404 });
    }

    return NextResponse.json(watchlist);
  } catch (error) {
    return new NextResponse("Failed to remove event from watchlist", {
      status: 500,
    });
  }
}
