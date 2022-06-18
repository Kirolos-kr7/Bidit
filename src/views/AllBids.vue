<script setup>
import { onMounted } from 'vue'
import BaseTitle from '../components/Base/BaseTitle.vue'
import Bids from '../components/Bids.vue'
import Paginate from '../components/Paginate.vue'
import { $t, useAxios, useMeta } from '../functions'

let bids = $ref([])
let curr = $ref(0)
let max = $ref(66)
let isLoading = $ref(true)

onMounted(async () => {
  isLoading = true
  let { response } = await useAxios('get', '/bid/all')

  if (response.data.ok) {
    bids = response.data.data
    curr += response.data.data.length
  }

  isLoading = false
})

const getMore = () => {
  isLoading = true

  setTimeout(() => {
    isLoading = false
  }, 1000)
}

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

    <Paginate
      v-if="bids.length != 0"
      :curr="curr"
      :max="max"
      :isLoading="isLoading"
      @more="getMore"
    />
  </div>
</template>
