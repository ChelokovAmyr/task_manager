<template>
  <div class="task">
    <h3>{{ task.title }}</h3>
    <p>{{ task.description }}</p>
    <p><small>Создана: {{ $dayjs(task.createdAt).format('DD.MM.YYYY') }}</small></p>
    <slot />
  </div>
</template>

<script setup>
defineProps({ task: Object })
</script>
