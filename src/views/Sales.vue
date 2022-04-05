<script setup>
import { useStore } from '../store'
import { onMounted } from 'vue'
import BaseTitle from '../components/Base/BaseTitle.vue'
import BaseButton from '../components/Base/BaseButton.vue'
import SalesItem from '../components/SalesItem.vue'
import BaseInfo from '../components/Base/BaseInfo.vue'
import { useAxios } from '../functions'
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
  info: {
    ar: 'المزادات الموجودة هنا انت قمت بإنشاءها.',
    en: 'Bids here are ones you created.',
  },
})

let isLoading = $ref(false)
let bids = $ref()

onMounted(async () => {
  isLoading = true
  bids = []

  let { response } = await useAxios('get', '/bid/sales', null)

  if (response.data.ok) {
    bids = response.data.data
  }
  isLoading = false
})
</script>

<template>
  <div class="px-4">
    <div class="flex flex-wrap items-start justify-between gap-x-10 gap-y-3">
      <BaseTitle
        >{{ $t(text.title) }}
        <BaseInfo>{{ $t(text.info) }} </BaseInfo></BaseTitle
      >
      <BaseButton @click="itemsDialog = true">
        <RouterLink :to="`/${state.lang}/account/inventory`">
          {{ $t(text.startBid) }}
        </RouterLink>
      </BaseButton>
    </div>
    <div
      class="mt-6 grid grid-cols-1 items-start gap-5 md:grid-cols-2"
      v-if="!isLoading"
    >
      <SalesItem v-for="(bid, index) in bids" :key="index" :bid="bid" />
    </div>
  </div>
</template>
