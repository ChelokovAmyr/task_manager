export default defineEventHandler(() => [
  { id: 1, title: 'Первая задача', description: 'Описание первой', status: 'active', createdAt: new Date() },
  { id: 2, title: 'Вторая задача', description: 'Описание второй', status: 'done', createdAt: new Date() }
])