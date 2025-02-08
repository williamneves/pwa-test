"use client"

import { useTodo } from "@/contexts/TodoContext"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

export default function TodoList() {
  const { todos, addTodo, toggleTodo, archiveTodo, deleteTodo } = useTodo()
  const [newTodo, setNewTodo] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTodo.trim()) {
      addTodo(newTodo.trim())
      setNewTodo("")
    }
  }

  const activeTodos = todos.filter((todo) => !todo.archived)

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <Input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          className="flex-grow"
        />
        <Button type="submit">Add</Button>
      </form>
      <ul className="space-y-2">
        {activeTodos.map((todo) => (
          <li key={todo.id} className="flex items-center gap-2">
            <Checkbox id={todo.id} checked={todo.completed} onCheckedChange={() => toggleTodo(todo.id)} />
            <label htmlFor={todo.id} className={`flex-grow ${todo.completed ? "line-through text-gray-500" : ""}`}>
              {todo.text}
            </label>
            <Button variant="outline" size="sm" onClick={() => archiveTodo(todo.id)}>
              Archive
            </Button>
            <Button variant="destructive" size="sm" onClick={() => deleteTodo(todo.id)}>
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}

