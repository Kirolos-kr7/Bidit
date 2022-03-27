<script>
export default {
  inheritAttrs: false,
}
</script>

<script setup>
defineProps(['placeholder'])
</script>

<template>
  <select
    ref="selectBox"
    class="w-full rounded-md border-2 border-neutral-200 bg-transparent px-3 py-0.5 font-medium text-black placeholder:text-transparent focus:outline-none"
    :="$attrs"
  >
    <slot />
  </select>
</template>
