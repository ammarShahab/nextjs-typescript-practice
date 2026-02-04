"use client";

import { addTodo } from "@/app/actions/todoActions";
import React, { startTransition, useOptimistic, useState } from "react";

interface Todo {
  id?: string;
  text: string;
  sending: boolean;
  completed?: boolean;
}

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [optimisticTodos, setOptimisticTodos] = useOptimistic(
    todos,
    (currentTodos, newTodo: Todo) => [...currentTodos, newTodo],
  );

  const handleTodo = async (formData: FormData) => {
    const text = formData.get("text") as string;

    setOptimisticTodos({
      text,
      sending: true,
      completed: false,
    });

    startTransition(async () => {
      const newTodo = await addTodo(text);
      setTodos((todos) => [...todos, newTodo]);
    });
  };
  return (
    <div>
      <h3>Todo Page</h3>
      <div>
        <div>
          {optimisticTodos.map((todo) => {
            <p>{todo.text}</p>;
            <p>{todo.sending}</p>;
          })}
        </div>
      </div>
    </div>
  );
}
