<template>
  <div
    class="flex justify-between items-center p-4 mb-3 rounded-lg shadow hover:shadow-lg transition-shadow bg-white"
  >
    <!-- Левая часть: чекбокс + текст/инпут -->
    <div class="flex items-center space-x-3">
      <!-- Чекбокс выполнения -->
      <input
        type="checkbox"
        :checked="task.completed"
        @change="toggle"
        class="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
      />

      <!-- Режим редактирования -->
      <div v-if="editing">
        <input
          v-model="editedTitle"
          @keyup.enter="save"
          @blur="save"
          :key="task.id"  <!-- Пересоздаём input при смене задачи -->
          class="border-b border-blue-500 focus:outline-none"
        />
      </div>

      <!-- Обычный режим -->
      <span
        v-else
        @dblclick="editing = true"
        :class="task.completed ? 'line-through text-gray-400' : 'text-gray-800'"
        class="cursor-pointer"
      >
        {{ task.title }}
      </span>
    </div>

    <!-- Правая часть: кнопка удаления -->
    <button @click="remove" class="text-red-500 hover:text-red-600 font-bold text-xl">✖</button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { defineProps } from 'vue'
import { useTasksStore } from '@/stores/tasks'

const props = defineProps<{ task: { id: number; title: string; completed: boolean } }>()

const tasksStore = useTasksStore()

const editing = ref(false)
const editedTitle = ref(props.task.title)

// Обновляем editedTitle, если props.task.title меняется
watch(() => props.task.title, (newTitle) => {
  editedTitle.value = newTitle
})

const toggle = () => tasksStore.toggleTask(props.task.id)
const remove = () => tasksStore.removeTask(props.task.id)

const save = () => {
  if (editedTitle.value.trim()) {
    tasksStore.updateTask(props.task.id, editedTitle.value.trim())
  }
  editing.value = false
}
</script>
