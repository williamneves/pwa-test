"use client"

import { useTodo } from "@/contexts/TodoContext"
import { Button } from "@/components/ui/button"

export default function ArchivedTodoList() {
  const { todos, deleteTodo } = useTodo()

  const archivedTodos = todos.filter((todo) => todo.archived)

  return (
    <ul className="space-y-2">
      {archivedTodos.map((todo) => (
        <li key={todo.id} className="flex items-center gap-2">
          <span className={`flex-grow ${todo.completed ? "line-through text-gray-500" : ""}`}>{todo.text}</span>
          <Button variant="destructive" size="sm" onClick={() => deleteTodo(todo.id)}>
            Delete
          </Button>
        </li>
      ))}
    </ul>
  )
}

