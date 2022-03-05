<script setup>
defineProps(['notification'])
</script>

<template>
  <div class="rounded-md bg-bi-700 p-4">
    <div class="flex items-center justify-between gap-3">
      <h2 class="text-2xl font-semibold capitalize">
        {{ notification.title }}
      </h2>
      <span class="h-4 w-4 rounded-full bg-black/50" />
    </div>
    <span class="text-neutral-400">
      {{ notification.createdAt }}
    </span>
    <p class="mt-2 overflow-hidden">
      {{ notification.message }}
    </p>
  </div>
</template>
