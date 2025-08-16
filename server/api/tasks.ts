import { defineEventHandler, readBody } from 'h3'

let tasks: Array<{ id: number; title: string; completed: boolean }> = []

export default defineEventHandler(async (event) => {
  const method = event.req.method
  if (method === 'GET') return tasks

  if (method === 'POST') {
    const body = await readBody(event)
    const task = { id: Date.now(), title: body.title, completed: false }
    tasks.push(task)
    return task
  }

  if (method === 'PUT') {
    const body = await readBody(event)
    const task = tasks.find(t => t.id === body.id)
    if (task) {
      task.title = body.title ?? task.title
      task.completed = body.completed ?? task.completed
    }
    return task
  }

  if (method === 'DELETE') {
    const { id } = await readBody(event)
    tasks = tasks.filter(t => t.id !== id)
    return { success: true }
  }
})
