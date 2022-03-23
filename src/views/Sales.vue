<script setup>
import BaseTitle from '../components/Base/BaseTitle.vue'
import BaseButton from '../components/Base/BaseButton.vue'
import SalesItem from '../components/SalesItem.vue'
import { useStore } from '../store'
import moment from 'moment'
const { $state: state } = $(useStore())

const text = $ref({
  title: {
    ar: 'المبيعات',
    en: 'Sales',
  },
  startBid: {
    ar: 'بدء مزاد جديد',
    en: 'Start New Bid',
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
    <div class="flex items-start justify-between gap-3">
      <BaseTitle>{{ $t(text.title) }}</BaseTitle>
      <BaseButton @click="itemsDialog = true">
        <RouterLink :to="`/${state.lang}/account/inventory`">
          {{ $t(text.startBid) }}
        </RouterLink>
      </BaseButton>
    </div>
    <div class="mt-6 grid grid-cols-1 items-start gap-5 md:grid-cols-2">
      <SalesItem v-for="(bid, index) in bids" :key="index" :bid="bid" />
    </div>
  </div>
</template>
