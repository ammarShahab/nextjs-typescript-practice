import Link from "next/link";
import React from "react";

export default function RevalidatePage() {
  return (
    <div>
      <h3>Revalidate Page</h3>
      <div className="flex gap-4 justify-center items-center">
        <Link
          href="/revalidate/revalidateblogs"
          className="bg-blue-500 p-2 rounded-xl"
        >
          Time Based Revalidation Blogs
        </Link>
        <Link
          href="/revalidate/revalidateauthorsbypath"
          className="bg-blue-500 p-2 rounded-xl"
        >
          Revalidate Authors By Path
        </Link>
      </div>
    </div>
  );
}
