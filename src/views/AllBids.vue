<script setup>
import { onMounted } from 'vue'
import BaseTitle from '../components/Base/BaseTitle.vue'
import Bids from '../components/Bids.vue'
import { $t, useAxios, useMeta } from '../functions'

let bids = $ref([])
let isLoading = $ref(true)

onMounted(async () => {
  isLoading = true
  let { response } = await useAxios('get', '/bid/all')

  if (response.data.ok) bids = response.data.data

  isLoading = false
})

const text = $ref({
  allBids: {
    ar: 'كل المزادات',
    en: 'All Bids',
  },
})

useMeta({ title: $t(text.allBids), base: true })
</script>

<template>
  <div class="px-4">
    <BaseTitle>{{ $t(text.allBids) }}</BaseTitle>
    <Bids :bids="bids" :isLoading="isLoading" />
  </div>
</template>
