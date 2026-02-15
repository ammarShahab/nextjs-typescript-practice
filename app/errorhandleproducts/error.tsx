"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-4 text-red-600">
        Something went wrong!
      </h2>
      <p className="text-gray-700 mb-6">
        {error.message || "An unexpected error occurred"}
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Try again
        </button>
        <Link
          href="/"
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Go to homepage
        </Link>
      </div>
    </div>
  );
}
