import { NextResponse } from "next/server";
import UniEvent from "../../models/uniEvent";

export async function GET(req: Request) {
  try {
    const events = await UniEvent.find({});
    const eventsWithBriefDescription = events.map((event) => ({
      ...event._doc,
      briefDescription:
        event.description.slice(0, 200) +
        (event.description.length > 200 ? "..." : ""),
    }));

    return NextResponse.json(eventsWithBriefDescription);
  } catch (error) {
    return new NextResponse("Failed to fetch events", { status: 500 });
  }
}

// POST a new university event
export async function POST(req: Request) {
  try {
    const { title, description, date, location } = await req.json();

    if (description.length > 200) {
      return new NextResponse(
        "Description cannot be more than 200 characters",
        { status: 400 }
      );
    }

    if (!title || !description || !date || !location) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const event = new UniEvent({
      title,
      description,
      date: new Date(date),
      location,
    });

    await event.save();

    return NextResponse.json(event);
  } catch (error) {
    return new NextResponse("Failed to create university event", {
      status: 500,
    });
  }
}
