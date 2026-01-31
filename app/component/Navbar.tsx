import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav className="flex gap-4">
      <Link href="/">Home</Link>
      <Link href="/posts">Posts</Link>
    </nav>
  );
}
