"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Todo = {
  id: string
  text: string
  completed: boolean
  archived: boolean
}

type TodoContextType = {
  todos: Todo[]
  addTodo: (text: string) => void
  toggleTodo: (id: string) => void
  archiveTodo: (id: string) => void
  deleteTodo: (id: string) => void
}

const mockTodos: Todo[] = [
  { id: "1", text: "Complete project proposal", completed: false, archived: false },
  { id: "2", text: "Buy groceries for the week", completed: true, archived: false },
  { id: "3", text: "Schedule dentist appointment", completed: false, archived: false },
  { id: "4", text: "Finish reading 'The Alchemist'", completed: true, archived: true },
  { id: "5", text: "Prepare presentation for team meeting", completed: false, archived: false },
  { id: "6", text: "Pay electricity bill", completed: true, archived: false },
  { id: "7", text: "Call mom for her birthday", completed: true, archived: true },
  { id: "8", text: "Start learning Spanish", completed: false, archived: false },
  { id: "9", text: "Fix leaky faucet in kitchen", completed: false, archived: false },
  { id: "10", text: "Update resume", completed: true, archived: false },
  { id: "11", text: "Plan summer vacation", completed: false, archived: false },
  { id: "12", text: "Organize digital photos", completed: false, archived: true },
  { id: "13", text: "Renew gym membership", completed: true, archived: false },
  { id: "14", text: "Write thank you notes", completed: false, archived: false },
  { id: "15", text: "Research new laptop models", completed: true, archived: true },
  { id: "16", text: "Schedule car maintenance", completed: false, archived: false },
  { id: "17", text: "Clean out garage", completed: false, archived: false },
  { id: "18", text: "Donate old clothes", completed: true, archived: true },
  { id: "19", text: "Set up automatic bill payments", completed: true, archived: false },
  { id: "20", text: "Learn to make sushi", completed: false, archived: false },
  { id: "21", text: "Create budget for next month", completed: false, archived: false },
  { id: "22", text: "Backup computer files", completed: true, archived: true },
  { id: "23", text: "Plant herb garden", completed: false, archived: false },
  { id: "24", text: "Schedule annual health checkup", completed: true, archived: false },
  { id: "25", text: "Finish online course on web development", completed: false, archived: false },
  { id: "26", text: "Plan friend's surprise party", completed: true, archived: true },
  { id: "27", text: "Get quotes for home insurance", completed: false, archived: false },
  { id: "28", text: "Start meditation practice", completed: false, archived: false },
  { id: "29", text: "Organize bookshelf", completed: true, archived: false },
  { id: "30", text: "Write blog post about recent trip", completed: false, archived: true },
]

const TodoContext = createContext<TodoContextType | undefined>(undefined)

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(mockTodos)

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos")
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  const addTodo = (text: string) => {
    setTodos([...todos, { id: Date.now().toString(), text, completed: false, archived: false }])
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const archiveTodo = (id: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, archived: true } : todo)))
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  return (
    <TodoContext.Provider value={{ todos, addTodo, toggleTodo, archiveTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  )
}

export const useTodo = () => {
  const context = useContext(TodoContext)
  if (context === undefined) {
    throw new Error("useTodo must be used within a TodoProvider")
  }
  return context
}

