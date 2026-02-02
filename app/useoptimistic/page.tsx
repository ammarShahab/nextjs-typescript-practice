import Link from "next/link";
import React from "react";

export default function UseOptimisticPage() {
  return (
    <div className="flex gap-3 mt-2.5">
      <Link
        href="/useoptimistic/name-change"
        className="bg-blue-500 rounded-xl text-white p-1"
      >
        Use Optimistic Name Change
      </Link>
      <Link
        href="/useoptimistic/posts-toggle-like"
        className="bg-blue-500 rounded-xl text-white p-1"
      >
        Use Optimistic Toggle Like
      </Link>
    </div>
  );
}
