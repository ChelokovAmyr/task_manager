<template>
  <div>
    <h1>Вход</h1>
    <form @submit.prevent="handleLogin">
      <input v-model="username" placeholder="Логин" />
      <input v-model="password" placeholder="Пароль" type="password" />
      <button type="submit">Войти</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'

const username = ref('')
const password = ref('')
const { login } = useAuth()

const handleLogin = async () => {
  const res = await login(username.value, password.value)
  if (res.success) navigateTo('/')
  else alert('Неверные данные')
}
</script>
