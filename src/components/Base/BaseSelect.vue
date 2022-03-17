<script>
export default {
  inheritAttrs: false,
}
</script>

<script setup>
import { useStore } from '../../store'
const { $state: state } = useStore()

defineProps(['placeholder'])
</script>

<template>
  <select
    ref="selectBox"
    class="peer w-full rounded-sm border border-neutral-400 bg-white px-3 py-1 font-medium text-black focus:outline-none sm:w-full"
    :="$attrs"
  >
    <slot />
  </select>
</template>
