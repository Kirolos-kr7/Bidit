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
  <div class="px-4">
    <BaseTitle>{{ $t(text.allBids) }}</BaseTitle>

    <Bids />
  </div>
</template>
