"use client";

import { useFormStatus } from "react-dom";

export default function Submit() {
  const { pending } = useFormStatus();
  return (
    <div>
      <button className="bg-blue-400 text-amber-100" disabled={pending}>
        {pending ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
}
