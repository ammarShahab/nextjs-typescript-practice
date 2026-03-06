// app/api/upload/route.ts

import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import cloudinary from "@/app/lib/claudinary";
import { connectDB } from "@/app/lib/db";

export async function POST(req: NextRequest) {
  try {
    // Only allow logged-in users to upload
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get file from FormData
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only JPEG, PNG, WebP allowed" },
        { status: 400 },
      );
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File too large. Max 5MB allowed" },
        { status: 400 },
      );
    }

    // Convert file to base64 for Cloudinary
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(base64, {
      folder: "nextjs-uploads", // organizes files in a folder
      resource_type: "auto",
    });

    console.log("Image upload result", uploadResult);

    if (uploadResult.secure_url) {
      const db = await connectDB();
      await db
        .collection("images")
        .insertOne({ image: uploadResult.secure_url });

      console.log("Image URL saved to DB");
      return NextResponse.json({
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
      });
    } else {
      console.error("Database upload failed", uploadResult);
      return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
