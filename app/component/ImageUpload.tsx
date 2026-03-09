// app/components/ImageUpload.tsx
"use client";

import { useState } from "react";

export default function ImageUpload() {
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Show preview before uploading
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create a local preview URL
    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);
    setError(null);
  }

  async function handleUpload(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const fileInput =
      form.querySelector<HTMLInputElement>('input[type="file"]');
    const file = fileInput?.files?.[0];

    if (!file) {
      setError("Please select a file");
      setLoading(false);
      return;
    }

    // Build FormData and send to API Route
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData, // ← No Content-Type header needed for FormData
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      setLoading(false);
      return;
    }

    setUploadedUrl(data.url);
    setLoading(false);
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Upload Image</h2>

      <form onSubmit={handleUpload} className="space-y-4">
        <input
          type="file"
          name="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileChange}
          className="w-full border p-2 rounded"
          placeholder="Upload"
        />

        {/* Local preview before upload */}
        {preview && (
          <div>
            <p className="text-sm text-gray-500 mb-1">Preview:</p>
            <img
              src={preview}
              alt="Preview"
              className="w-40 h-40 object-cover rounded"
            />
          </div>
        )}

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {/* Show uploaded image from Cloudinary */}
      {uploadedUrl && (
        <div className="mt-6">
          <p className="text-sm text-green-600 font-medium mb-2">
            ✅ Uploaded successfully!
          </p>
          <img
            src={uploadedUrl}
            alt="Uploaded"
            className="w-40 h-40 object-cover rounded"
          />
          <p className="text-xs text-gray-400 mt-1 break-all">{uploadedUrl}</p>
        </div>
      )}
    </div>
  );
}
