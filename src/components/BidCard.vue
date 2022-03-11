<script setup>
import { useStore } from '../store'
import BaseButton from './Base/BaseButton.vue'
import { getType, getStatus } from '../functions'

const { $state: state } = useStore()

const text = $ref({
  openTitle: {
    ar: 'عرض',
    en: 'Show',
  },
  editTitle: {
    ar: 'تعديل',
    en: 'Edit',
  },
  deleteTitle: {
    ar: 'حذف',
    en: 'Delete',
  },
  status: {
    ar: 'الحالة',
    en: 'Status',
  },
  to: {
    ar: 'من',
    en: 'To',
  },
  from: {
    ar: 'الى',
    en: 'From',
  },
})

defineProps({
  bid: {
    type: Object,
    required: true,
  },
})
const emits = defineEmits(['editItem', 'deleteItem'])
</script>

<template>
  <div
    class="relative flex flex-col overflow-hidden rounded-md bg-bi-700 sm:flex-row"
  >
    <img
      src="/images/monalisa-art.jpg"
      class="h-[260px] object-cover sm:h-auto sm:w-1/3"
    />
    <div class="p-3">
      <RouterLink
        :to="`/${state.lang}/bids/${bid.item.type}`"
        class="my-1 inline-block rounded-2xl bg-indigo-600 px-3 font-medium capitalize"
      >
        {{ getType(bid.item.type) }}
      </RouterLink>
      <h2
        class="overflow-hidden break-all text-lg font-semibold capitalize md:text-[22px]"
        style="
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        "
      >
        {{ bid.item.name }}
      </h2>

      <div class="mt-3 grid grid-cols-[auto,1fr] gap-x-3 capitalize">
        <span class="text-neutral-400">{{ $t(text.status) }}</span>
        <span class="font-medium">{{ getStatus(bid.status) }}</span>
        <span class="text-neutral-400">{{ $t(text.from) }}</span>
        <span class="font-medium">{{ bid.startDate }}</span>
        <span class="text-neutral-400">{{ $t(text.to) }}</span>
        <span class="font-medium">{{ bid.endDate }}</span>
      </div>

      <div
        class="absolute top-0 mt-3 flex flex-col gap-2"
        :class="state.lang === 'ar' ? 'right-3' : 'left-3'"
      >
        <button
          class="flex items-center justify-center rounded-full bg-neutral-900 p-2 hover:!bg-neutral-800"
          :title="$t(text.openTitle)"
        >
          <svg
            class="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
