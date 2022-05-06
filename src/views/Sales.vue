<script setup>
import { useStore } from '../store'
import { onMounted } from 'vue'
import BaseTitle from '../components/Base/BaseTitle.vue'
import BaseButton from '../components/Base/BaseButton.vue'
import BaseInfo from '../components/Base/BaseInfo.vue'
import { useAxios } from '../functions'
import BaseEmpty from '../components/Base/BaseEmpty.vue'
import Bids from '../components/Bids.vue'
import UserLayout from '../components/UserLayout.vue'
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
let bids = $ref([])

onMounted(async () => {
  isLoading = true

  let { response } = await useAxios('get', '/bid/sales')

  if (response.data.ok) {
    bids = response.data.data
  }
  isLoading = false
})
</script>

<template>
  <UserLayout>
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

      <div v-if="!isLoading">
        <BaseEmpty
          v-if="bids.length === 0"
          :msg="{
            ar: 'لا يوجد لديك مزادات حتى الان!',
            en: `You Don't have any bids yet!`,
          }"
        />

        <Bids :bids="bids" v-else />
      </div>
    </div>
  </UserLayout>
</template>
