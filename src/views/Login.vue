<script setup>
import BaseTitle from '../components/Base/BaseTitle.vue'

const text = $ref({
  myAccount: {
    ar: 'تسجيل الدخول',
    en: 'Login',
  },
})
</script>

<template>
  <BaseTitle>{{ $t(text.myAccount) }}</BaseTitle>
</template>
