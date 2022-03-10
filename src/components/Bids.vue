<script setup>
import moment from 'moment'
import BidCard from './BidCard.vue'
let bids = $ref([
  {
    item: {
      name: 'Activ Sharks Patterned Zipped Backpack With outer Pocket - Steal Blue',
      type: 'colthes',
    },
    startDate: moment().subtract(3, 'days').calendar(),
    endDate: moment().add(3, 'days').calendar(),
    status: 'canceled',
  },
  {
    item: {
      name: 'Activ Sharks Patterned Zipped Backpack With outer Pocket - Steal Blue',
      type: 'antiques',
    },
    startDate: moment().subtract(3, 'days').calendar(),
    endDate: moment().add(3, 'days').calendar(),
    status: 'ended',
  },
  {
    item: {
      name: 'Activ Sharks Patterned Zipped Backpack With outer Pocket - Steal Blue',
      type: 'cars',
    },
    startDate: moment().subtract(3, 'days').calendar(),
    endDate: moment().add(3, 'days').calendar(),
    status: 'active',
  },
  {
    item: {
      name: 'Activ Sharks Patterned Zipped Backpack With outer Pocket - Steal Blue',
      type: 'art',
    },
    startDate: moment().subtract(3, 'days').calendar(),
    endDate: moment().add(3, 'days').calendar(),
    status: 'active',
  },
])
</script>

<template>
  <div class="mt-6 grid gap-3 md:grid-cols-2">
    <BidCard v-for="(bid, index) in bids" :key="index" :bid="bid" />
  </div>
</template>
