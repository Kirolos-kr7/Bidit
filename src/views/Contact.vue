<script setup>
import BaseTitle from '../components/Base/BaseTitle.vue'

const text = $ref({
  title: {
    ar: 'تواصل معنا',
    en: 'Contact Us',
  },
})
</script>

<template>
  <BaseTitle>{{ $t(text.title) }}</BaseTitle>
</template>
