<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <HeaderBar />

    <div class="max-w-md mx-auto mt-6">
      <!-- Добавление новой задачи -->
      <div class="flex gap-2 mb-4">
        <input
          v-model="newTask"
          @keyup.enter="handleAdd"
          placeholder="Новая задача..."
          class="flex-1 border p-3 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          @click="handleAdd"
          class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded shadow"
        >
          Add
        </button>
      </div>

      <!-- Фильтры -->
      <div class="flex justify-between mb-4">
        <button @click="filter='all'" :class="btnClass('all')">All</button>
        <button @click="filter='active'" :class="btnClass('active')">Active</button>
        <button @click="filter='completed'" :class="btnClass('completed')">Completed</button>
      </div>

      <!-- Список задач -->
      <TaskItem
        v-for="task in filteredTasks"
        :key="task.id"
        :task="task"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderBar from '@/components/HeaderBar.vue'
import TaskItem from '@/components/TaskItem.vue'
import { ref, computed, onMounted } from 'vue'
import { useTasksStore } from '@/stores/tasks'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const newTask = ref('')
const filter = ref<'all' | 'active' | 'completed'>('all')

const tasksStore = useTasksStore()
const authStore = useAuthStore()
const router = useRouter()

onMounted(() => {
  if (process.client) authStore.checkAuth()
  if (!authStore.user) router.push('/login')
  tasksStore.loadTasks()
})

const handleAdd = () => {
  if (!newTask.value.trim()) return
  tasksStore.addTask(newTask.value.trim())
  newTask.value = ''
}

const filteredTasks = computed(() => {
  if (filter.value === 'active') return tasksStore.tasks.filter(t => !t.completed)
  if (filter.value === 'completed') return tasksStore.tasks.filter(t => t.completed)
  return tasksStore.tasks
})

const btnClass = (type: 'all' | 'active' | 'completed') =>
  `flex-1 py-2 rounded ${
    filter.value === type ? 'bg-blue-500 text-white shadow' : 'bg-white border text-gray-700'
  }`
</script>
