import { connectDB } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = await connectDB();

    const products = await db
      .collection("products")
      .find({})
      .sort({ created_at: -1 })
      .toArray();
    console.log(products);

    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Unable to fetch products",
      },
      { status: 500 },
    );
  }
}
