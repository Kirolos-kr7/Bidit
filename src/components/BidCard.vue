<script setup>
import { useStore } from '../store'
import { getType, getStatus } from '../functions'
import BaseType from './Base/BaseType.vue'

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
defineEmits(['editItem', 'deleteItem'])
</script>

<template>
  <div
    class="bg-bi-700 relative flex cursor-pointer flex-col overflow-hidden rounded-md bg-white shadow-sm sm:flex-row"
  >
    <img
      src="/images/monalisa-art.jpg"
      class="h-[260px] object-cover sm:h-auto sm:w-1/3"
    />
    <div class="p-3">
      <BaseType :to="`/${state.lang}/bids/${bid.item.type}`">
        {{ getType(bid.item.type) }}
      </BaseType>
      <h2
        class="overflow-hidden break-all text-lg font-semibold capitalize text-black"
        style="
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        "
      >
        {{ bid.item.name }}
      </h2>

      <div class="mt-3 grid grid-cols-[auto,1fr] gap-x-3 capitalize text-black">
        <span class="font-medium text-neutral-600">{{ $t(text.status) }}</span>
        <span class="font-medium">{{ getStatus(bid.status) }}</span>
        <span class="font-medium text-neutral-600">{{ $t(text.from) }}</span>
        <span class="font-medium">{{ bid.startDate }}</span>
        <span class="font-medium text-neutral-600">{{ $t(text.to) }}</span>
        <span class="font-medium">{{ bid.endDate }}</span>
      </div>
    </div>
  </div>
</template>
