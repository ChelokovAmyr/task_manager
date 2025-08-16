import { defineStore } from 'pinia'

interface User {
  email: string
  password: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as null | User,
    token: '' as string,
  }),
  actions: {
    register(email: string, password: string) {
      const user: User = { email, password }
      localStorage.setItem('user', JSON.stringify(user))
      this.user = user
      this.token = btoa(email + ':' + password)
      localStorage.setItem('token', this.token)
    },
    login(email: string, password: string) {
      const saved = localStorage.getItem('user')
      if (!saved) throw new Error('Пользователь не найден')
      const user: User = JSON.parse(saved)
      if (user.email === email && user.password === password) {
        this.user = user
        this.token = btoa(email + ':' + password)
        localStorage.setItem('token', this.token)
      } else {
        throw new Error('Неверный логин или пароль')
      }
    },
    logout() {
      this.user = null
      this.token = ''
      localStorage.removeItem('token')
    },
    checkAuth() {
    if (process.client) { // только на клиенте
        const token = localStorage.getItem('token')
        if (token) {
        const email = atob(token).split(':')[0]
        this.user = { email }
        this.token = token
        }
    }
    }
  }
})
