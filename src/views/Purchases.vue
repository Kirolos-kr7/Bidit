<script setup>
import BaseTitle from '../components/Base/BaseTitle.vue'
import SalesItem from '../components/SalesItem.vue'
import moment from 'moment'

const text = $ref({
  title: {
    ar: 'المشتريات',
    en: 'Purchases',
  },
})

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
  <div class="px-4">
    <BaseTitle>{{ $t(text.title) }}</BaseTitle>

    <div class="mt-6 grid grid-cols-1 items-start gap-5 md:grid-cols-2">
      <SalesItem v-for="(bid, index) in bids" :key="index" :bid="bid" />
    </div>
  </div>
</template>
