<script setup>
import BidCard from './BidCard.vue'
import BaseEmpty from './Base/BaseEmpty.vue'

defineProps({
  bids: {
    type: Object,
    default: null,
  },
})
</script>

<template>
  <BaseEmpty v-if="bids.length === 0" msg="Oops. No bids avalible now!" />
  <div class="mt-6 grid gap-3 md:grid-cols-2" v-else>
    <BidCard v-for="(bid, index) in bids" :key="index" :bid="bid" />
  </div>
</template>
