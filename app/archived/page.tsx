import dynamic from "next/dynamic"
import { TodoProvider } from "@/contexts/TodoContext"
import Navigation from "@/components/Navigation"

const DynamicArchivedTodoList = dynamic(() => import("@/components/ArchivedTodoList"), { ssr: false })

export default function ArchivedPage() {
  return (
    <TodoProvider>
      <main className="container mx-auto p-4">
        <Navigation />
        <h1 className="text-3xl font-bold mb-4">Archived Todos</h1>
        <DynamicArchivedTodoList />
      </main>
    </TodoProvider>
  )
}

