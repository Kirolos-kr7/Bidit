<script setup>
import BaseTitle from '../components/Base/BaseTitle.vue'
import BaseInfo from '../components/Base/BaseInfo.vue'
import BaseEmpty from '../components/Base/BaseEmpty.vue'
import { onMounted } from 'vue'
import { useAxios } from '../functions'
import UserLayout from '../Layouts/UserLayout.vue'
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

let isLoading = $ref(false)
let bids = $ref([])

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
      <div v-if="!isLoading">
        <BaseEmpty
          v-if="bids.length === 0"
          msg="You Don't have any bids yet!"
        />
        <Bids :bids="bids" v-else />
      </div>
    </div>
  </UserLayout>
</template>
