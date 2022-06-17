<script setup>
import { computed } from '@vue/reactivity'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import BaseTable from '../../components/Base/BaseTable.vue'
import { useAxios, useMeta } from '../../functions'
import { useStore } from '../../store'
import BaseTitle from '../../components/Base/BaseTitle.vue'
import BaseButton from '../../components/Base/BaseButton.vue'
import BaseDialog from '../../components/Base/BaseDialog.vue'

let data = $ref([])
let router = useRouter()
let { $state: state } = useStore()

let constraint = $ref('item')
let direction = $ref('asc')
let selectedBid = $ref(null)
let removeDialog = $ref(false)

const fetchBids = async () => {
  let { response } = await useAxios(
    'get',
    `/admin/bids?sortBy=${constraint}&dir=${direction}`,
  )

  if (response.data.ok) data = response.data.data
}

let formatedData = computed(() => {
  return data.map((x) => {
    return { ...x, user: x?.user?.email, item: x?.item?.name }
  })
})

onMounted(async () => fetchBids())

const sortBy = (value, dir) => {
  constraint = value
  direction = dir

  fetchBids()
}

const open = (val) => {
  let route = router.resolve({ path: `/${state.lang}/bid/${val._id}` })
  window.open(route.href, '_blank')
}

const remove = (val) => {
  selectedBid = val
  removeDialog = true
}

const approveRemove = async () => {
  let { response } = await useAxios('delete', `/admin/bid/${selectedBid._id}`)

  if (response.data.ok) {
    removeDialog = false
    selectedBid = null
    fetchBids()
  }
}

useMeta({ title: 'Bids', base: true })
</script>

<template>
  <div class="flex items-start justify-between">
    <h1 class="mb-5 font-merriweather text-3xl font-extrabold">Bids</h1>
  </div>
  <div class="w-full">
    <BaseTable
      :columns="['Bid', 'Auctioneer', 'Status', 'Start Price']"
      :values="['item', 'user', 'status', 'minPrice']"
      :layout="['auto', 'auto', 'auto', 'auto']"
      :data="formatedData"
      :constraint="constraint"
      :direction="direction"
      :actions="{ open: true, edit: false, remove: true }"
      @sortBy="sortBy"
      @open="open"
      @remove="remove"
    />
  </div>

  <transition name="fade">
    <BaseDialog v-if="removeDialog" @click="removeDialog = false"> </BaseDialog>
  </transition>

  <transition name="zoom">
    <div
      class="border-bi-600 fixed top-1/2 left-1/2 z-30 max-h-[85vh] w-full max-w-prose origin-top-left -translate-x-1/2 -translate-y-1/2 scale-100 overflow-auto rounded-md border bg-white p-5 font-medium text-black md:min-w-prose"
      v-if="removeDialog"
    >
      <BaseTitle>Remove Bid</BaseTitle>
      <p class="my-3">Are you sure you want to proceed?</p>
      <div class="flex justify-end gap-2">
        <BaseButton
          class="!bg-red-600 hover:!bg-red-700"
          @click="approveRemove()"
          >Yes</BaseButton
        >
        <BaseButton @click="removeDialog = false">No</BaseButton>
      </div>
    </div>
  </transition>
</template>
