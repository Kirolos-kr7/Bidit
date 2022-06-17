<script setup>
import BaseTitle from '../components/Base/BaseTitle.vue'

const text = $ref({
  title: {
    ar: 'عن Bidit',
    en: 'About Bidit',
  },
})
</script>

<template>
  <BaseTitle>{{ $t(text.title) }}</BaseTitle>
</template>
