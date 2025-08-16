import { useAuth } from '@/composables/useAuth'

export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated } = useAuth()
  if (to.path === '/admin' && !isAuthenticated()) return navigateTo('/login')
})
