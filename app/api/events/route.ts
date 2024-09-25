import { NextResponse } from "next/server";
import clientPromise from "../../lib/mongodb";
import Event from "../../models/event";

// GET all events
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    const events = await db.collection("events").find({}).toArray();
    return NextResponse.json(events);
  } catch (error) {
    return new NextResponse("Failed to load events", { status: 500 });
  }
}

// POST a new event
export async function POST(req: Request) {
  try {
    const { title, description, date, location } = await req.json();

    if (!title || !description || !date || !location) {
      return new NextResponse("Missing required fields", { status: 500 });
    }

    const event = new Event({
      title,
      description,
      date: new Date(date),
      location,
    });

    await event.save();

    return NextResponse.json(event);
  } catch (error) {
    return new NextResponse("Failed to create event", { status: 500 });
  }
}
