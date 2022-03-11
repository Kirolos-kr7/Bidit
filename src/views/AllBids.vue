<script setup>
import BaseTitle from '../components/Base/BaseTitle.vue'
import Bids from '../components/Bids.vue'

const text = $ref({
  allBids: {
    ar: 'كل المزادات',
    en: 'All Bids',
  },
})
</script>

<template>
  <BaseTitle>{{ $t(text.allBids) }}</BaseTitle>

  <Bids />
</template>
