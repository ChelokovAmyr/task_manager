<template>
  <div>
    <h1>Task Manager</h1>
    <TaskForm :key="formKey" @added="refreshKey++" />
    <TaskFilter />
    <TaskItem v-for="t in filteredTasks" :key="t.id" :task="t">
      <button @click="editTask(t)">Редактировать</button>
      <button @click="deleteTask(t.id)">Удалить</button>
    </TaskItem>

    <TaskEditModal v-if="editingTask" :task="editingTask" @close="editingTask=null" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useTasks } from '@/composables/useTasks'
import TaskItem from '@/components/TaskItem.vue'
import TaskForm from '@/components/TaskForm.vue'
import TaskFilter from '@/components/TaskFilter.vue'
import TaskEditModal from '@/components/TaskEditModal.vue'

const { filteredTasks, loadTasks, deleteTask } = useTasks()
const editingTask = ref(null)
const formKey = ref(0)
const refreshKey = ref(0)

const editTask = (task) => { editingTask.value = task }

onMounted(() => loadTasks())
</script>
