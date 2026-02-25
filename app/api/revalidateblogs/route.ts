import { connectDB } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = await connectDB();
    const blogs = await db
      .collection("blogs")
      .find({})
      .sort({ created_at: -1 })
      .toArray();
    // console.log(blogs);

    return NextResponse.json(blogs);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Unable to fetch blogs" },
      { status: 500 },
    );
  }
}
