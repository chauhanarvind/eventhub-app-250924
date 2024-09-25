import { NextResponse } from "next/server";
import Watchlist from "../../models/watchlist";
import { verifyJwt } from "../../lib/auth/verifyJWT";

export async function GET(req: Request) {
  const { decodedToken, error, status }: any = await verifyJwt(req);

  if (error) {
    return new NextResponse(error, { status });
  }

  const userId = decodedToken.userId;

  try {
    const watchlist = await Watchlist.find({ userId }).populate("eventId");
    return NextResponse.json(watchlist);
  } catch (error) {
    return new NextResponse("Failed to fetch watchlist", { status: 500 });
  }
}

export async function POST(req: Request) {
  const { decodedToken, error, status }: any = await verifyJwt(req);

  if (error) {
    return new NextResponse(error, { status });
  }

  const { eventId }: any = await req.json();
  const userId = decodedToken.userId;

  if (!eventId) {
    return new NextResponse("Event ID is required", { status: 400 });
  }

  try {
    const existingEntry = await Watchlist.findOne({ userId, eventId });
    if (existingEntry) {
      return new NextResponse("Event already in watchlist", { status: 400 });
    }

    const newWatchlistEntry = new Watchlist({ userId, eventId });
    await newWatchlistEntry.save();

    return NextResponse.json({ message: "Event added to watchlist" });
  } catch (error) {
    return new NextResponse("Failed to add event to watchlist", {
      status: 500,
    });
  }
}

export async function DELETE(req: Request) {
  const { decodedToken, error, status }: any = await verifyJwt(req);

  if (error) {
    return new NextResponse(error, { status });
  }

  const userId = decodedToken.userId;
  const { eventId } = await req.json();

  if (!eventId) {
    return new NextResponse("Event ID is required", { status: 400 });
  }

  try {
    await Watchlist.findOneAndDelete({ userId, eventId });

    return NextResponse.json({ message: "Event removed from watchlist" });
  } catch (error) {
    return new NextResponse("Failed to remove event from watchlist", {
      status: 500,
    });
  }
}
