<template>
  <div>
    <button @click="set('all')">Все</button>
    <button @click="set('active')">Активные</button>
    <button @click="set('done')">Выполненные</button>
  </div>
</template>

<script setup>
import { useTasks } from '@/composables/useTasks'
const { setFilter } = useTasks()
const set = (f) => setFilter(f)
</script>
