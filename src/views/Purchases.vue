<script setup>
import BaseTitle from '../components/Base/BaseTitle.vue'

const text = $ref({
  title: {
    ar: 'المشتريات',
    en: 'Purchases',
  },
})
</script>

<template>
  <BaseTitle> {{ $t(text.title) }} </BaseTitle>
</template>
