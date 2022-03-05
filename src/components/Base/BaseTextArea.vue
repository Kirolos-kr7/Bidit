<script>
export default {
  inheritAttrs: false,
}
</script>

<script setup>
import { useStore } from '../../store'
defineProps(['placeholder', 'modelValue'])
const emits = defineEmits(['updateInput'])
const { $state: state } = $(useStore())
</script>

<template>
  <div class="relative">
    <textarea
      :="$attrs"
      class="peer w-full rounded-sm border border-bi-600 bg-transparent px-3 pb-1.5 pt-3 placeholder:text-transparent focus:outline-none sm:w-[350px]"
      :id="placeholder"
      :placeholder="placeholder"
      :value="modelValue"
      readonly
      @focus="(e) => e.target.removeAttribute('readonly')"
      @change="(e) => emits('updateInput', e.target.value)"
      @keyup="(e) => emits('updateInput', e.target.value)"
    ></textarea>
    <label
      class="pointer-events-none absolute top-0 -translate-y-1/2 bg-inherit px-1.5 text-xs text-white transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:text-xs peer-focus:text-white"
      :class="state.lang === 'ar' ? 'right-1.5' : 'left-1.5'"
      :for="placeholder"
      >{{ placeholder }}</label
    >
  </div>
</template>
