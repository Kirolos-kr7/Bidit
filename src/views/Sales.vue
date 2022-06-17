<script setup>
import { useStore } from '../store'
import { onMounted } from 'vue'
import BaseTitle from '../components/Base/BaseTitle.vue'
import BaseButton from '../components/Base/BaseButton.vue'
import BaseInfo from '../components/Base/BaseInfo.vue'
import { $t, useAxios, useMeta } from '../functions'
import Bids from '../components/Bids.vue'
import BaseDialog from '../components/Base/BaseDialog.vue'
const { $state: state } = $(useStore())

let bids = $ref([])
let isLoading = $ref(false)
let deleteDialog = $ref(false)
let selectedBid = $ref(null)

onMounted(async () => {
  getSlaes()
})

const getSlaes = async () => {
  isLoading = true

  let { response } = await useAxios('get', '/bid/sales')

  if (response.data.ok) {
    bids = response.data.data
  }
  isLoading = false
}

const deleteBid = (val) => {
  selectedBid = val
  deleteDialog = true
}

const approveDelete = async () => {
  let { response } = await useAxios('delete', `/bid/delete/${selectedBid._id}`)
  if (response.data.ok) {
    getSlaes()
    deleteDialog = false
  }
}

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
  deleteBid: {
    ar: 'حذف المزاد',
    en: 'Delete Bid',
  },
  cancelBid: {
    ar: 'الغاء المزاد',
    en: 'Cancel Bid',
  },
  doneProcess: {
    ar: 'تاكيد العمليه؟',
    en: 'Are you sure you want to proceed?',
  },
  yes: {
    ar: 'نعم',
    en: 'Yes',
  },
  no: {
    ar: 'لا',
    en: 'No',
  },
})

useMeta({ title: $t(text.title), base: true })
</script>

<template>
  <div class="px-4">
    <div class="flex flex-wrap items-start justify-between gap-x-10 gap-y-3">
      <BaseTitle
        >{{ $t(text.title) }}
        <BaseInfo>{{ $t(text.info) }} </BaseInfo></BaseTitle
      >
      <BaseButton>
        <RouterLink :to="`/${state.lang}/account/inventory`">
          {{ $t(text.startBid) }}
        </RouterLink>
      </BaseButton>
    </div>

    <Bids
      :bids="bids"
      :isLoading="isLoading"
      :actions="true"
      @deleteBid="deleteBid"
    />
  </div>

  <transition name="fade">
    <BaseDialog v-if="deleteDialog" @click="deleteDialog = false"> </BaseDialog>
  </transition>

  <transition name="zoom">
    <div
      class="border-bi-600 fixed top-1/2 left-1/2 z-30 max-h-[85vh] w-full max-w-prose origin-top-left -translate-x-1/2 -translate-y-1/2 scale-100 overflow-auto rounded-md border bg-white p-5 font-medium text-black md:min-w-prose"
      v-if="deleteDialog"
    >
      <BaseTitle>{{
        selectedBid.status === 'soon' ? $t(text.deleteBid) : $t(text.cancelBid)
      }}</BaseTitle>
      <p class="my-3">{{ $t(text.doneProcess) }}</p>
      <div class="flex justify-end gap-2">
        <BaseButton
          class="!bg-red-600 hover:!bg-red-700"
          @click="approveDelete()"
          >{{ $t(text.yes) }}</BaseButton
        >
        <BaseButton @click="deleteDialog = false">{{ $t(text.no) }}</BaseButton>
      </div>
    </div>
  </transition>
</template>
