<script setup>
import AdminNavbar from '../components/AdminNavbar.vue'

defineProps(['title'])
</script>

<template>
  <div class="flex flex-1">
    <AdminNavbar />

    <div class="w-full p-5">
      <h1 class="mb-5 font-merriweather text-3xl font-extrabold">
        {{ title }}
      </h1>

      <slot />
    </div>
  </div>
</template>
