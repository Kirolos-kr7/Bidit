<script setup>
import AdminNavbar from '../components/AdminNavbar.vue'
</script>

<template>
  <div class="flex flex-1">
    <AdminNavbar />

    <div class="w-full p-5">
      <slot />
    </div>
  </div>
</template>
