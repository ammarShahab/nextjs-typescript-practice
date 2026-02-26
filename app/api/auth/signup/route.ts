import { connectDB } from "@/app/lib/db";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    console.log(name, email, password);

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Please fill all the fields" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const db = await connectDB();

    const existingUser = await db.collection("users").findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 },
      );
    }

    await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      created_At: new Date(),
    });

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error: "Internal server error", status: 500 });
  }
}
