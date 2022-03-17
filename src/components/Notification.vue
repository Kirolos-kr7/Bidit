<script setup>
defineProps(['notification'])
</script>

<template>
  <div class="rounded-md bg-white p-4 text-black shadow-sm">
    <div class="flex items-center justify-between gap-3">
      <h2 class="text-2xl font-bold capitalize">
        {{ notification.title }}
      </h2>
      <span class="h-4 w-4 rounded-full bg-bi-200" />
    </div>
    <span class="font-medium text-neutral-500">
      {{ notification.createdAt }}
    </span>
    <p class="mt-2 overflow-hidden">
      {{ notification.message }}
    </p>
  </div>
</template>
