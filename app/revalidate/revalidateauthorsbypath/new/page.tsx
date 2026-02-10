"use client";

import authorsActions from "@/app/actions/authorsActions";
import { useActionState } from "react";

const initialState = {
  success: false,
  message: "",
};

export default function CreateAuthors() {
  const [state, formAction, pending] = useActionState(
    authorsActions,
    initialState,
  );
  return (
    <div>
      <h3>Create Authors</h3>
      <form
        action={formAction}
        className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="space-y-4">
          <label className="block">
            <span className="text-gray-700 font-semibold text-lg">
              Author Name *
            </span>
            <input
              type="text"
              name="author_Name"
              //   value={formData.author_Name}
              //   onChange={handleInputChange}
              placeholder="Enter author's full name"
              className={`mt-2 block w-full px-4 py-3 rounded-lg border-2  focus:ring-2 focus:ring-opacity-50 transition-all duration-200`}
              required
            />
          </label>
        </div>

        <div className="space-y-4">
          <label className="block">
            <span className="text-gray-700 font-semibold text-lg">
              Birth Year *
            </span>
            <input
              type="number"
              name="birth_year"
              //   value={formData.birth_year}
              //   onChange={handleInputChange}
              placeholder="e.g., 1985"
              min="1500"
              max={new Date().getFullYear()}
              className={`mt-2 block w-full px-4 py-3 rounded-lg border-2  focus:ring-2 focus:ring-opacity-50 transition-all duration-200`}
              required
            />

            <p className="mt-2 text-sm text-gray-500">
              Must be between 1500 and {new Date().getFullYear()}
            </p>
          </label>
        </div>

        <div className="space-y-4">
          <label className="block">
            <span className="text-gray-700 font-semibold text-lg">
              Categories *
            </span>
            <input
              type="text"
              name="categories"
              //   value={formData.birth_year}
              //   onChange={handleInputChange}
              placeholder="Sci-Fi"
              className={`mt-2 block w-full px-4 py-3 rounded-lg border-2  focus:ring-2 focus:ring-opacity-50 transition-all duration-200`}
              required
            />
          </label>
        </div>
        <div>
          <button
            className="bg-emerald-400 p-1.5 rounded-lg mt-3"
            type="submit"
            disabled={pending}
          >
            Add Authors
          </button>
          {state.success && state.message}
        </div>
      </form>
    </div>
  );
}
