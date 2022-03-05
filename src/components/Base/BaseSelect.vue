<script setup>
import { useStore } from '../../store'
const { $state: state } = useStore()

defineProps(['placeholder'])
</script>

<template>
  <div class="relative">
    <select
      ref="selectBox"
      class="peer w-full rounded-sm border border-bi-600 bg-bi-900 px-3 py-1 placeholder:text-transparent focus:outline-none sm:w-full"
    >
      <slot />
    </select>
    <label
      class="pointer-events-none absolute top-0 -translate-y-1/2 bg-inherit px-1.5 text-xs text-white transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:text-xs peer-focus:text-white"
      :class="state.lang === 'ar' ? 'right-1.5' : 'left-1.5'"
      >{{ placeholder }}</label
    >
  </div>
</template>
