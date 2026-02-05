"use client";

import { addTodo } from "@/app/actions/todoActions";

import { ReactNode, startTransition, useOptimistic, useState } from "react";

export interface Todo {
  _id?: string;
  text: string;
  pending?: boolean;
  completed?: boolean;
}

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([
    { _id: "1", text: "Learn React" },
  ]);
  const [optimisticTodos, setOptimisticTodos] = useOptimistic(
    todos,
    (currentTodos, newTodo: Todo) => [
      ...currentTodos,
      {
        text: newTodo.text,
        pending: true,
      },
    ],
  );

  const handleTodo = async (text: string) => {
    const pending = true;

    const newTodo = {
      text: text,
      pending: pending,
      completed: false,
    };

    console.log(newTodo);

    startTransition(async () => {
      setOptimisticTodos(newTodo);
      const saveTodo = await addTodo(text);
      // console.log("saveTodo", saveTodo);

      setTodos((todos) => [...todos, saveTodo]);
    });
    // console.log("todos", todos);
  };
  return (
    <div>
      <h3>Todo Page</h3>
      <div>
        <button
          onClick={() => handleTodo("New Todo")}
          className="bg-cyan-400"
          type="button"
        >
          Add To Do
        </button>{" "}
        <ul>
          {optimisticTodos.map((todo, index) => (
            <li key={todo._id || index + 1}>
              {todo.text} {todo.pending && "Adding..."}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
