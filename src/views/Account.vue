<script setup>
import BaseTitle from '../components/Base/BaseTitle.vue'

const text = $ref({
  myAccount: {
    ar: 'حسابي',
    en: 'My Account',
  },
})
</script>

<template>
  <BaseTitle>{{ $t(text.myAccount) }}</BaseTitle>
</template>
