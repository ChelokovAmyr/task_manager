<template>
  <div v-if="task" class="modal">
    <h3>Редактировать задачу</h3>
    <input v-model="title" placeholder="Заголовок" />
    <textarea v-model="description" placeholder="Описание"></textarea>
    <select v-model="status">
      <option value="active">Активная</option>
      <option value="done">Выполнено</option>
    </select>
    <button @click="save">Сохранить</button>
    <button @click="$emit('close')">Отмена</button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useTasks } from '@/composables/useTasks'

defineProps({ task: Object })
const { updateTask } = useTasks()

const title = ref('')
const description = ref('')
const status = ref('active')

watch(() => task, t => {
  if (t) {
    title.value = t.title
    description.value = t.description
    status.value = t.status
  }
})

const save = async () => {
  await updateTask({ ...task, title: title.value, description: description.value, status: status.value })
  $emit('close')
}
</script>
