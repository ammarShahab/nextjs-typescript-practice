"use client";

import ImageUpload from "@/app/component/ImageUpload";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function ImageUploadForm() {
  const { data: session } = useSession();
  console.log(session);

  if (!session) {
    redirect("/signin");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <ImageUpload />
      </div>
    </div>
  );
}
