import { ref, computed } from 'vue'

const tasks = ref([])
const filter = ref<'all' | 'active' | 'done'>('all')

export function useTasks() {
  const loadTasks = async () => {
    tasks.value = await $fetch('/api/tasks')
  }

  const createTask = async (task: { title: string; description: string; status: string }) => {
    const newTask = await $fetch('/api/tasks', { method: 'POST', body: task })
    tasks.value.push(newTask)
  }

  const updateTask = async (task: { id: number; title: string; description: string; status: string }) => {
    const updated = await $fetch(`/api/tasks`, { method: 'PUT', body: task })
    const index = tasks.value.findIndex(t => t.id === task.id)
    if (index !== -1) tasks.value[index] = updated
  }

  const deleteTask = async (id: number) => {
    await $fetch(`/api/tasks?id=${id}`, { method: 'DELETE' })
    tasks.value = tasks.value.filter(t => t.id !== id)
  }

  const filteredTasks = computed(() => {
    if (filter.value === 'all') return tasks.value
    return tasks.value.filter(t => t.status === filter.value)
  })

  const setFilter = (f: 'all' | 'active' | 'done') => filter.value = f

  return { tasks, filteredTasks, loadTasks, createTask, updateTask, deleteTask, setFilter }
}
