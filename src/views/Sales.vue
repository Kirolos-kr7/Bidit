<script setup>
import BaseTitle from '../components/Base/BaseTitle.vue'

const text = $ref({
  title: {
    ar: 'المبيعات',
    en: 'Sales',
  },
})
</script>

<template>
  <BaseTitle> {{ $t(text.title) }} </BaseTitle>
</template>
