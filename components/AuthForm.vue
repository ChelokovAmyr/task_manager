<template>
  <form @submit.prevent="submit" class="max-w-sm mx-auto p-4 border rounded">
    <h2 class="text-xl font-bold mb-4">{{ mode === 'login' ? 'Login' : 'Register' }}</h2>

    <input v-model="email" type="email" placeholder="Email" class="border p-2 w-full mb-2 rounded" />
    <input v-model="password" type="password" placeholder="Password" class="border p-2 w-full mb-4 rounded" />

    <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
      {{ mode === 'login' ? 'Login' : 'Register' }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const props = defineProps<{ mode: 'login' | 'register' }>()
const email = ref('')
const password = ref('')
const authStore = useAuthStore()
const router = useRouter()

const submit = () => {
  try {
    if (props.mode === 'login') authStore.login(email.value, password.value)
    else authStore.register(email.value, password.value)
    router.push('/')
  } catch (e: any) {
    alert(e.message)
  }
}
</script>
