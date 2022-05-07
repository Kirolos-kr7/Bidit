<script setup>
import BaseTitle from '../components/Base/BaseTitle.vue'
import BaseInfo from '../components/Base/BaseInfo.vue'
import { onMounted } from 'vue'
import { useAxios } from '../functions'
import UserLayout from '../components/UserLayout.vue'
import Bids from '../components/Bids.vue'

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

let bids = $ref([])
let isLoading = $ref(false)

onMounted(async () => {
  isLoading = true

  let { response } = await useAxios('get', '/bid/purchases')

  if (response.data.ok) {
    bids = response.data.data
  }
  isLoading = false
})
</script>

<template>
  <UserLayout>
    <div class="px-4">
      <BaseTitle
        >{{ $t(text.title) }}
        <BaseInfo>{{ $t(text.info) }} </BaseInfo></BaseTitle
      >
      <Bids :bids="bids" :isLoading="isLoading" />
    </div>
  </UserLayout>
</template>
