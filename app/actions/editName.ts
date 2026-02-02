"use server";

import { connectDB } from "../lib/db";

export default async function editName(newName: string) {
  console.log(newName);
  const filter = { name: newName };
  const updatedName = {
    $set: {
      name: newName,
      updated: new Date(),
    },
  };

  try {
    const db = await connectDB();
    const result = await db
      .collection("username")
      .updateOne(filter, updatedName, { upsert: true });

    if (result.upsertedCount === 1) {
      return {
        success: true,
        message: "Name Added successfully",
      };
    } else if (result.modifiedCount === 1) {
      return {
        success: true,
        message: "Name Updated successfully",
      };
    }
    return {
      success: false,
      message: "No changes made to the name",
    };
  } catch (error) {
    console.error("Failed to update name:", error);
    return {
      success: false,
      message: "An error occurred while updating the name",
    };
  }
}
