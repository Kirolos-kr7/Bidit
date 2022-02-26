<script setup>
import { useStore } from '../../store'
const { $state: state } = $(useStore())
</script>

<template>
  <button
    :="$attrs"
    class="group relative flex items-center gap-3 rounded-md border border-neutral-800/50 bg-neutral-800/50 px-8 py-4 text-xl font-bold backdrop-blur-sm"
  >
    <slot />
    <span
      v-if="state.lang === 'en'"
      class="font-black transition-all group-hover:translate-x-2"
      >&rarr;</span
    >
    <span
      v-if="state.lang === 'ar'"
      class="font-black transition-all group-hover:-translate-x-2"
      >&larr;</span
    >
  </button>
</template>
