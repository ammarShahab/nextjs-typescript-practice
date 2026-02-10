import { connectDB } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = await connectDB();
    const authors = await db
      .collection("authors")
      .find({})
      .sort({ created_at: -1 })
      .toArray();

    return NextResponse.json(authors);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Unable to fetch authors",
      },
      { status: 500 },
    );
  }
}
