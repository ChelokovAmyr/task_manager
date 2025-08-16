let tasksDB = [
  { id: 1, title: 'Первая задача', description: 'Описание первой', status: 'active', createdAt: new Date() },
  { id: 2, title: 'Вторая задача', description: 'Описание второй', status: 'done', createdAt: new Date() }
]

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const index = tasksDB.findIndex(t => t.id === body.id)
  if (index !== -1) tasksDB[index] = { ...tasksDB[index], ...body }
  return tasksDB[index]
})
