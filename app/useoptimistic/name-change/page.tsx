"use client";
import editName from "@/app/actions/editName";

import { startTransition, useOptimistic, useState } from "react";

export default function UseOptimisticName() {
  const [name, setName] = useState<string>("Alice");
  const [optimisticName, setOptimisticName] = useOptimistic<string>(name);

  async function handleSubmit(formData: FormData) {
    const newName = formData.get("name") as string;

    setOptimisticName(newName);
    try {
      const updatedName = await editName(newName);
      console.log("Updated Name Client: ", updatedName);

      startTransition(() => {
        setName(updatedName);
      });
      setName(newName);
    } catch (error) {
      console.error("Failed to update name:", error);
    }
  }
  return (
    <div>
      <h3>Use Optimistic To Update Name</h3>
      <div>
        <p>
          Your Name: <span>{optimisticName}</span>
        </p>
        <form action={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" disabled={name !== optimisticName} />
          </div>
          <button
            type="submit"
            disabled={name !== optimisticName}
            className="bg-blue-500 rounded-2xl text-white p-2 mt-2"
          >
            Update Name
          </button>
        </form>
      </div>
    </div>
  );
}
