"use client";

import useFormStatCreatePost from "@/app/actions/useFormStatActions";
import Submit from "@/app/component/Submit";
import React, { useActionState } from "react";

const initialState = {
  success: false,
  message: "",
};

export default function UseFormStatusPage() {
  const [state, actions, pending] = useActionState(
    useFormStatCreatePost,
    initialState,
  );
  return (
    <div>
      <h3>Use Form Status Page</h3>
      {state.message && (
        <p className={state.success ? "text-green-600" : "text-red-600"}>
          {state.message}
        </p>
      )}{" "}
      <form action={actions}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            className="w-full"
          />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea
            name="content"
            id="content"
            placeholder="Content"
            className="w-full"
          />
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input
            type="text"
            name="author"
            id="author"
            placeholder="Author"
            className="w-full"
          />{" "}
        </div>
        <Submit />
      </form>
    </div>
  );
}
