"use client";

import createMoviesWithLikes from "../../actions/createMoviesWithLikes";
import { useActionState } from "react";

const initialState = {
  success: false,
  message: "",
};

export default function CreateMoviesWithLikes() {
  const [state, formAction, pending] = useActionState(
    createMoviesWithLikes,
    initialState,
  );

  return (
    <div className="max-w-5xl mx-auto border mt-4">
      <h3>Movies Likes</h3>
      {state.message && (
        <p className={state.success ? "text-green-600" : "text-red-600"}>
          {state.message}
        </p>
      )}
      <form action={formAction} className="p-3">
        <div className="flex flex-col gap-1.5 ">
          <label>Title</label>
          <input type="text" name="title" className="border p-1" />
        </div>
        <div className="flex flex-col gap-1.5 mb-2">
          <label>Genres</label>
          <input
            type="text"
            name="genres"
            className="border p-1"
            placeholder="Use Comma Separated Genres"
          />
        </div>
        <button
          type="submit"
          disabled={pending}
          className="bg-amber-300 rounded-xl p-2 disabled:opacity-50"
        >
          {pending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
