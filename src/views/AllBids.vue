<script setup>
import { onMounted } from 'vue'
import BaseTitle from '../components/Base/BaseTitle.vue'
import Bids from '../components/Bids.vue'
import { useAxios } from '../functions'
import UserLayout from '../Layouts/UserLayout.vue'

let bids = $ref([])

onMounted(async () => {
  let { response } = await useAxios('get', '/bid/all')

  if (response.data.ok) {
    bids = response.data.data
  }
})

const text = $ref({
  allBids: {
    ar: 'كل المزادات',
    en: 'All Bids',
  },
})
</script>

<template>
  <UserLayout>
    <div class="px-4">
      <BaseTitle>{{ $t(text.allBids) }}</BaseTitle>
      <Bids :bids="bids" />
    </div>
  </UserLayout>
</template>
