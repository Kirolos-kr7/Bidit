<script setup>
import BidCard from './BidCard.vue'
let bids = $ref([
  {
    item: {
      name: 'Activ Sharks Patterned Zipped Backpack With outer Pocket - Steal Blue',
      type: 'colthes',
    },
    startDate: new Date(),
    endDate: new Date(),
    status: 'canceled',
  },
  {
    item: {
      name: 'Activ Sharks Patterned Zipped Backpack With outer Pocket - Steal Blue',
      type: 'antiques',
    },
    startDate: new Date(),
    endDate: new Date(),
    status: 'ended',
  },
  {
    item: {
      name: 'Activ Sharks Patterned Zipped Backpack With outer Pocket - Steal Blue',
      type: 'cars',
    },
    startDate: new Date(),
    endDate: new Date(),
    status: 'active',
  },
  {
    item: {
      name: 'Activ Sharks Patterned Zipped Backpack With outer Pocket - Steal Blue',
      type: 'art',
    },
    startDate: new Date(),
    endDate: new Date(),
    status: 'active',
  },
])
</script>

<template>
  <div class="mt-6 grid gap-3 md:grid-cols-2">
    <BidCard v-for="(bid, index) in bids" :key="index" :bid="bid" />
  </div>
</template>
