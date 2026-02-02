"use client";
import editName from "@/app/actions/updateName";

import { startTransition, useOptimistic, useState } from "react";

export default function UseOptimisticName() {
  const [name, setName] = useState<string>("Alice");
  const [optimisticName, setOptimisticName] = useOptimistic<string>(name);

  const handleSubmit = async (formData: FormData) => {
    const newName = formData.get("name");
    if (typeof newName !== "string" || !newName.trim()) {
      return;
    }
    setOptimisticName(newName);
    try {
      const updatedName = await editName(newName);
      // setName(updatedName);
      setName(newName);
    } catch (error) {
      console.error("Failed to update name:", error);
      // Optimistic state will revert to `name` on next render
    }
  };
  return (
    <div>
      <h3>Use Optimistic To Update Name</h3>
      <div>
        <span>Your Name: </span>
        <form action={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" disabled={name !== optimisticName} />
          </div>
          <button type="submit" disabled={name !== optimisticName}>
            Update Name
          </button>
        </form>            <input type="text" name="name" disabled={name !== optimisticName} />
          </div>
        </form>
      </div>
    </div>
  );
}
