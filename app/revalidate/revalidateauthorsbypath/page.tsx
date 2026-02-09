import Link from "next/link";
import React from "react";

export default function RevalidateAuthorsPage() {
  return (
    <div>
      <div>
        <button>
          <Link href="/revalidate/revalidateauthorsbypath/new">
            Create Authors
          </Link>
        </button>
      </div>
      <h3>Revalidate Authors Page</h3>
    </div>
  );
}
