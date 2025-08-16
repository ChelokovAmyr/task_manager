<template>
  <form @submit.prevent="addTask">
    <input v-model="title" placeholder="Заголовок" required />
    <textarea v-model="description" placeholder="Описание"></textarea>
    <button type="submit">Добавить</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useTasks } from '@/composables/useTasks'

const title = ref('')
const description = ref('')
const { createTask } = useTasks()
const emit = defineEmits(['added'])

const addTask = async () => {
  await createTask({ title: title.value, description: description.value, status: 'active' })
  title.value = ''
  description.value = ''
  emit('added')
}
</script>
