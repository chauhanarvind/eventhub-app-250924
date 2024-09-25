import { NextResponse } from "next/server";
import PublicEvent from "../../models/publicEvent";

// GET all public events
export async function GET() {
  try {
    const publicEvents = await PublicEvent.find({});
    return NextResponse.json(publicEvents);
  } catch (error) {
    return new NextResponse("Failed to load public events", { status: 500 });
  }
}

// POST a new public event
export async function POST(req: Request) {
  try {
    const { title, description, date, location } = await req.json();

    if (!title || !description || !date || !location) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const event = new PublicEvent({
      title,
      description,
      date: new Date(date),
      location,
    });

    await event.save();

    return NextResponse.json(event);
  } catch (error) {
    return new NextResponse("Failed to create public event", { status: 500 });
  }
}
