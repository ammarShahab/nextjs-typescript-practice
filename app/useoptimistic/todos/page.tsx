"use client";

import { addTodo, deleteTodo } from "@/app/actions/todoActions";

import { startTransition, useOptimistic, useState } from "react";

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
    (
      currentTodos,
      action: { type: "add"; todo: Todo } | { type: "delete"; id: string },
    ) => {
      if (action.type === "add") {
        return [
          ...currentTodos,
          {
            text: action.todo.text,
            pending: true,
          },
        ];
      } else if (action.type === "delete") {
        return currentTodos.filter((todo) => todo._id !== action.id);
      }
      return currentTodos;
    },
  );

  const handleTodo = async (formData: FormData) => {
    const pending = true;
    const text = formData.get("todo") as string;

    const newTodo = {
      text: text,
      pending: pending,
      completed: false,
    };

    console.log(newTodo);

    startTransition(async () => {
      setOptimisticTodos({ type: "add", todo: newTodo });
      const saveTodo = await addTodo(text);
      // console.log("saveTodo", saveTodo);

      setTodos((todos) => [...todos, saveTodo]);
    });
    // console.log("todos", todos);
  };

  const handleDelete = async (id: string) => {
    startTransition(async () => {
      setOptimisticTodos({ type: "delete", id });
      await deleteTodo(id);
      setTodos((todos) => todos.filter((todo) => todo._id !== id));
    });
  };

  return (
    <div>
      <h3>Todo Page</h3>
      <form action={handleTodo}>
        <div className="flex flex-col gap-2">
          <label>Type Your Todo</label>
          <input type="text" name="todo" id="todo" className="border" />
        </div>
        <button type="submit" className="bg-cyan-400">
          Add To Do
        </button>
      </form>
      <div>
        <ul>
          {optimisticTodos.map((todo, index) => (
            <li key={todo._id || index + 1}>
              {todo.text} {todo.pending && "Adding..."}
              {todo._id && (
                <button
                  onClick={() => handleDelete(todo._id as string)}
                  type="button"
                  className="px-8 py-0.5 font-semibold rounded dark:bg-gray-800 dark:text-gray-100 border hover:bg-purple-400"
                >
                  Delete
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
