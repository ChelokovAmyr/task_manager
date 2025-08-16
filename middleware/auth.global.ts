import { defineNuxtRouteMiddleware, navigateTo, useRouter } from '#app'

export default defineNuxtRouteMiddleware((to) => {
  if (process.client) {
    const authStore = useAuthStore()
    authStore.checkAuth()
    if (!authStore.user && to.path !== '/login' && to.path !== '/register') {
      return navigateTo('/login')
    }
  }
})
