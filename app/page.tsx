import dynamic from "next/dynamic"
import { TodoProvider } from "@/contexts/TodoContext"
import Navigation from "@/components/Navigation"

const DynamicTodoList = dynamic(() => import("@/components/TodoList"), { ssr: false })

export default function Home() {
  return (
    <TodoProvider>
      <main className="container mx-auto p-4">
        <Navigation />
        <h1 className="text-3xl font-bold mb-4">Todo List</h1>
        <DynamicTodoList />
      </main>
    </TodoProvider>
  )
}

