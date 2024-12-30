import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { StoreState } from './types'

const useTodoStore = create<StoreState>()(
  persist(
    (set) => ({
      // Estado inicial
      todos: [],
      loading: false,
      error: null,

      // Acciones
      addTodo: (title: string) => {
        set((state) => ({
          todos: [
            ...state.todos,
            {
              id: Date.now(),
              title,
              completed: false,
            },
          ],
        }))
      },

      toggleTodo: (id: number) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        }))
      },

      removeTodo: (id: number) => {
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        }))
      },
    }),
    {
      name: 'todo-storage',
    }
  )
)

export default useTodoStore