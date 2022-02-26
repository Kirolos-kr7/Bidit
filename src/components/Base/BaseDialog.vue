<script>
export default {
  inheritAttrs: false,
}
</script>

<script setup></script>

<template>
  <div>
    <div
      class="fixed z-20 h-full w-full bg-black/20 backdrop-blur-sm !transition-all"
      :="$attrs"
    ></div>
    <slot />
  </div>
</template>
