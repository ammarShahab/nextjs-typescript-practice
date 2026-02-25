"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <div>
      <button className="font-bold" onClick={() => signOut()}>
        SignOut
      </button>
    </div>
  );
}
