<script setup>
import BaseTitle from '../components/Base/BaseTitle.vue'
import SalesItem from '../components/SalesItem.vue'
import moment from 'moment'
import BaseInfo from '../components/Base/BaseInfo.vue'

const text = $ref({
  title: {
    ar: 'المشتريات',
    en: 'Purchases',
  },
  info: {
    ar: 'المزادات الموجودة هنا انت شاركت فيها سواء كسبتها أو لم تكسبها.',
    en: 'Bids here are ones you joined whether you won or not.',
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
    <BaseTitle
      >{{ $t(text.title) }} <BaseInfo>{{ $t(text.info) }} </BaseInfo></BaseTitle
    >
    <div class="mt-6 grid grid-cols-1 items-start gap-5 md:grid-cols-2">
      <SalesItem v-for="(bid, index) in bids" :key="index" :bid="bid" />
    </div>
  </div>
</template>
