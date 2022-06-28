<script setup>
import { onMounted } from 'vue'
import { useAxios } from '../functions'
import Bids from '../components/Bids.vue'
import BaseTitle from './Base/BaseTitle.vue'
import { useRoute } from 'vue-router'
import { useStore } from '../store'

let { $state: state } = useStore()
let route = useRoute()
let bids = $ref([])
let isLoading = $ref(false)

onMounted(async () => {
  if (route.params?.bidID?.length === 24 && state.user) {
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
  peopleAlsoViewed: {
    ar: `مستخدمون اخرون شاهدوا`,
    en: `Pepole Also Viewed`,
  },
})
</script>

<template>
  <section class="my-4 p-4 md:my-6">
    <BaseTitle>{{ $t(text.peopleAlsoViewed) }}</BaseTitle>
    <Bids :bids="bids" :isLoading="isLoading" />
  </section>
</template>
