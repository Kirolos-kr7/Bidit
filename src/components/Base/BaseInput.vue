<script>
export default {
  inheritAttrs: false,
}
</script>

<script setup>
import { useStore } from '../../store'
const props = defineProps(['placeholder', 'modelValue'])
const emits = defineEmits(['updateInput'])
const { $state: state } = $(useStore())
</script>

<template>
  <div class="relative">
    <input
      :="$attrs"
      class="peer w-full rounded-md bg-bi-600 px-3 pb-1.5 pt-3 placeholder:text-transparent focus:outline-none sm:w-[350px]"
      :id="placeholder"
      :placeholder="placeholder"
      :value="modelValue"
      readonly
      @focus="(e) => e.target.removeAttribute('readonly')"
      @change="(e) => emits('updateInput', e.target.value)"
      @keyup="(e) => emits('updateInput', e.target.value)"
    />
    <label
      class="pointer-events-none absolute -top-[9px] text-xs text-white transition-all peer-placeholder-shown:top-[9px] peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-white"
      :class="state.lang === 'ar' ? 'right-2.5' : 'left-2.5' "
      for="placeholder"
      >{{ placeholder }}</label
    >
  </div>
</template>
