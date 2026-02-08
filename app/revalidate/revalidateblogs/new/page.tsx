"use client";

import { revalidateBlogByTime } from "@/app/actions/revalidateBlogByTime";
import { useActionState } from "react";

const initialState = {
  success: false,
  message: "",
};

export default function CreateBlogPage() {
  const [state, formAction, pending] = useActionState(
    revalidateBlogByTime,
    initialState,
  );
  return (
    <div>
      <h3>Create Blog Page</h3>
      <div className="max-w-3xl mx-auto border p-2">
        <form action={formAction}>
          <div className="flex flex-col gap-2">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" className="border" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              className="border"
            ></textarea>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              id="author"
              name="author"
              className="border"
            />{" "}
          </div>
          <button
            disabled={pending}
            type="submit"
            className="bg-amber-400 rounded-lg p-1.5 mt-2"
          >
            Submit
          </button>
          {state.success && state.message}
        </form>
      </div>
    </div>
  );
}
