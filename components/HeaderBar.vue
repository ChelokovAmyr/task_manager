<template>
  <header class="flex justify-between items-center py-4 px-6 bg-white shadow-md sticky top-0 z-10">
    <h1 class="text-2xl font-bold text-blue-600">Task Manager</h1>
    <div>
      <button
        v-if="authStore.user"
        @click="logout"
        class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"
      >
        Logout
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>
