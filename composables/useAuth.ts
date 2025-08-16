import { ref } from 'vue'

const user = ref<{ username: string } | null>(null)

export function useAuth() {
  // вызываем useCookie внутри функции, а не глобально
  const authToken = useCookie<string | null>('auth_token')

  const login = async (username: string, password: string) => {
    const res = await $fetch('/api/auth', {
      method: 'POST',
      body: { username, password }
    })

    if (res.success) {
      user.value = { username }
      authToken.value = res.token // например, сохраняем токен
    }

    return res
  }

  const logout = () => {
    user.value = null
    authToken.value = null
  }

  const isAuthenticated = () => !!authToken.value

  return { user, login, logout, isAuthenticated, authToken }
}
