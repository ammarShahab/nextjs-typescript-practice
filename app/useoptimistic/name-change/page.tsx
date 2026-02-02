"use client";
import editName from "@/app/actions/updateName";

import { startTransition, useOptimistic, useState } from "react";

export default function UseOptimisticName() {
  const [name, setName] = useState<string>("Alice");
  const [optimisticName, setOptimisticName] = useOptimistic<string>(name);

  const handleSubmit = async (formData: FormData) => {
    const newName = formData.get("name") as string;

    setOptimisticName(newName);
    const updatedName = await editName(newName);
    console.log("Updated Name: ", updatedName);

    startTransition(() => {
      setName(newName);
    });
  };

  return (
    <div>
      <h3>Use Optimistic To Update Name</h3>
      <div>
        <span>Your Name: </span>
        {optimisticName}
      </div>
      <div>
        <form action={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" disabled={name !== optimisticName} />
          </div>
        </form>
      </div>
    </div>
  );
}
