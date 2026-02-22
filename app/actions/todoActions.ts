"use server";

import { ObjectId } from "mongodb";
import { connectDB } from "../lib/db";

export async function addTodo(text: string) {
  const db = await connectDB();
  const todo = {
    text: text,
    completed: false,
    createdAt: new Date(),
  };
  const result = await db.collection("todos").insertOne(todo);
  console.log("Result", result);

  return {
    _id: result.insertedId.toString(),
    text,
    completed: false,
  };
}

export async function deleteTodo(id: string) {
  const db = await connectDB();

  const query = { _id: new ObjectId(id) };
  await db.collection("todos").deleteOne(query);
  return id;
}
