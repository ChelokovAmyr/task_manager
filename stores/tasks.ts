import { defineStore } from 'pinia'

interface Task {
  id: number
  title: string
  completed: boolean
}

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: [] as Task[],
  }),
  actions: {
    loadTasks() {
      const saved = localStorage.getItem('tasks')
      if (saved) this.tasks = JSON.parse(saved)
    },
    saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
    },
    addTask(title: string) {
      this.tasks.push({ id: Date.now(), title, completed: false })
      this.saveTasks()
    },
    toggleTask(id: number) {
      const task = this.tasks.find(t => t.id === id)
      if (task) {
        task.completed = !task.completed
        this.saveTasks()
      }
    },
    updateTask(id: number, title: string) {
      const task = this.tasks.find(t => t.id === id)
      if (task) {
        task.title = title
        this.saveTasks()
      }
    },
    removeTask(id: number) {
      this.tasks = this.tasks.filter(t => t.id !== id)
      this.saveTasks()
    }
  },
})
