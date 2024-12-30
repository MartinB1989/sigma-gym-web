// Aquí definimos los tipos de nuestro store
export interface Todo {
  id: number
  title: string
  completed: boolean
}

export interface StoreState {
  todos: Todo[]
  loading: boolean
  error: string | null
  // Acciones
  addTodo: (title: string) => void
  toggleTodo: (id: number) => void
  removeTodo: (id: number) => void
} 