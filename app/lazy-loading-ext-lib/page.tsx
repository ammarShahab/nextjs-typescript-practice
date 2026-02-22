"use client";
import { useState } from "react";

interface SearchResult {
  item: string;
  refIndex: number;
  score?: number;
}

export default function LazyLoadingWithExternalLibraries() {
  const [result, setResult] = useState<SearchResult[]>();
  const names = ["Tim", "Bob", "John", "Alice", "Sophia", "David", "Eva"];
  return (
    <div className="max-w-2xl mx-auto">
      <h3>Lazy Loading With External Libraries</h3>
      <div className="flex flex-col gap-2">
        <label>Search</label>
        <input
          type="text"
          className="border"
          onChange={async (e) => {
            const { value } = e.currentTarget;

            const Fuse = (await import("fuse.js")).default;
            const fuse = new Fuse(names);
            setResult(fuse.search(value));
          }}
        />
      </div>
      <pre>Result: {JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}
