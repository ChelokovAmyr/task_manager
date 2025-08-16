import jwt from 'jsonwebtoken'
const SECRET = 'supersecretkey'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { username, password } = body
  if ((username === 'admin' && password === '123') || (username && password)) {
    const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' })
    setCookie(event, 'auth_token', token, { httpOnly: true })
    return { success: true }
  }
  return { success: false, message: 'Неверные данные' }
})