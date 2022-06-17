<script setup>
import { onMounted } from 'vue'
import { useAxios } from '../functions'
import Bids from '../components/Bids.vue'
import BaseTitle from './Base/BaseTitle.vue'
import { useRoute } from 'vue-router'

let route = useRoute()
let bids = $ref([])
let isLoading = $ref(false)

onMounted(async () => {
  if (route.params?.bidID?.length === 24) {
    isLoading = true
    let { response } = await useAxios(
      'get',
      `/bid/similar/${route.params?.bidID}`,
    )

    if (response.data.ok) {
      bids = response.data.data
    }

    isLoading = false
  }
})

const text = $ref({
  youRecentlyViewed: {
    ar: `مزادات مشابهة`,
    en: `Similar Bids`,
  },
})
</script>

<template>
  <section class="my-4 p-4 md:my-6" v-if="bids.length > 0">
    <BaseTitle>{{ $t(text.youRecentlyViewed) }}</BaseTitle>
    <Bids :bids="bids" :isLoading="isLoading" />
  </section>
</template>
