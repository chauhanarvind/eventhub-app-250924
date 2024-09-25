import { NextResponse } from "next/server";
import UniEvent from "../../models/uniEvent";
import { verifyJwt } from "../../lib/auth/verifyJWT";

export async function GET(req: Request) {
  try {
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
    const { decodedToken, error, status } = await verifyJwt(req);

    if (error) {
      return new NextResponse(error, { status });
    }

    const {
      title,
      description,
      date,
      location,
      price,
      link = null,
      category = null,
      image = null,
    } = await req.json();

    if (!title || !description || !date || !location || price == null) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const newEvent = new UniEvent({
      title,
      description,
      date,
      location,
      price,
      link,
      category,
      image,
    });

    await newEvent.save();

    return NextResponse.json({
      message: "Event created successfully",
      event: newEvent,
    });
  } catch (error) {
    return new NextResponse("Failed to create event", { status: 500 });
  }
}
