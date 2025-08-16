export const useTasks = () => {
  const tasks = useState('tasks', () => [] as Array<{ id: number; title: string; completed: boolean; id: number }>)

  const fetchTasks = async () => {
    tasks.value = await $fetch('/api/tasks')
  }

  const addTask = async (title: string) => {
    const newTask = await $fetch('/api/tasks', {
      method: 'POST',
      body: { title }
    })
    tasks.value.push(newTask)
  }

  const updateTask = async (id: number, data: { title?: string; completed?: boolean }) => {
    const updated = await $fetch('/api/tasks', {
      method: 'PUT',
      body: { id, ...data }
    })
    const index = tasks.value.findIndex(t => t.id === id)
    if (index !== -1) tasks.value[index] = updated
  }

  const removeTask = async (id: number) => {
    await $fetch('/api/tasks', { method: 'DELETE', body: { id } })
    tasks.value = tasks.value.filter(t => t.id !== id)
  }

  return { tasks, fetchTasks, addTask, updateTask, removeTask }
}
