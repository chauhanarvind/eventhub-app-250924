import { NextResponse } from "next/server";
import UniEvent from "../../models/uniEvent";

export async function GET(req: Request) {
  try {
    console.log("uni-events get request called");
    const events = await UniEvent.find({});
    const eventsWithBriefDescription = events.map((event) => ({
      ...event._doc,
      description:
        event.description.slice(0, 200) +
        (event.description.length > 200 ? "..." : ""),
    }));

    return NextResponse.json(eventsWithBriefDescription);
  } catch (error) {
    return new NextResponse("Failed to fetch events", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const {
      title,
      description,
      date,
      location,
      price,
      link = null, // Optional field, default to null if not provided
      category = null, // Optional field, default to null if not provided
      image = null, // Optional field, default to null if not provided
    } = await req.json();

    // Validate required fields
    if (!title || !description || !date || !location || price == null) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Create a new event object
    const newEvent = new UniEvent({
      title,
      description,
      date,
      location,
      price,
      link, // Optional link
      category, // Optional category
      image, // Optional image
    });

    // Save the event to the database
    await newEvent.save();

    return NextResponse.json({
      message: "Event created successfully",
      event: newEvent,
    });
  } catch (error) {
    console.error("Failed to create event:", error);
    return new NextResponse("Failed to create event", { status: 500 });
  }
}
