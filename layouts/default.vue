<template>
  <div>
    <header>
      <NuxtLink to="/">Главная</NuxtLink> |
      <NuxtLink to="/login">Войти</NuxtLink> |
      <NuxtLink to="/admin">Админка</NuxtLink>
    </header>
    <main><slot /></main>
  </div>
</template>
