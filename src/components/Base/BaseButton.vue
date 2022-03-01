<script setup></script>

<template>
  <button
    :="$attrs"
    class="group relative rounded-md border border-bi-700 bg-bi-800 px-5 py-2 backdrop-blur-sm transition-colors hover:bg-bi-600"
  >
    <slot />
  </button>
</template>
