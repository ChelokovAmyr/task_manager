let tasksDB = [
  { id: 1, title: 'Первая задача', description: 'Описание первой', status: 'active', createdAt: new Date() },
  { id: 2, title: 'Вторая задача', description: 'Описание второй', status: 'done', createdAt: new Date() }
]

export default defineEventHandler(async (event) => {
  const id = Number(getQuery(event).id)
  tasksDB = tasksDB.filter(t => t.id !== id)
  return { success: true }
})
