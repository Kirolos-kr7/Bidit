<script>
export default {
  inheritAttrs: false,
}
</script>

<script setup>
defineProps(['src'])

let err = $ref(false)
</script>

<template>
  <img :src="src" :="$attrs" @error="err = true" :class="err && 'hidden'" />
  <div
    class="flex min-h-[160px] items-center justify-center bg-rose-800"
    v-if="err"
  >
    <span class="pointer-events-none select-none p-8 font-medium text-white"
      >Image Not Found.</span
    >
  </div>
</template>
