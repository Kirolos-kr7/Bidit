<script setup>
import { useStore } from '../store'
import { getType, getStatus } from '../functions'
import dayjs from 'dayjs'
import 'dayjs/locale/ar'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import BaseType from './Base/BaseType.vue'
import BaseImg from './Base/BaseImg.vue'

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
  price: {
    ar: 'السعر',
    en: 'Price',
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
  <Router-Link
    :to="`/${state.lang}/bid/${bid._id}`"
    class="relative flex flex-col overflow-hidden rounded-md bg-white shadow-md sm:flex-row"
  >
    <BaseImg
      src="https://media.btech.com/media/catalog/product/cache/22b1bed05f04d71c4a848d770186c3c4/0/0/0022549_apple-iphone-13-pro-max-256-gb-5g-sierra-blue_3umnabtijaqwmjdf.jpeg"
      class="h-[250px] object-cover sm:h-auto sm:w-1/3"
    />

    <div class="p-3">
      <BaseType
        :to="`/${state.lang}/bids/${bid.item.type}`"
        v-if="bid?.item?.type"
      >
        {{ getType(bid.item.type) }}
      </BaseType>
      <h2
        class="overflow-hidden break-all text-xl font-semibold capitalize text-black"
        style="
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        "
      >
        {{ bid?.item?.name || 'N/F' }}
      </h2>

      <div class="mt-3 grid grid-cols-[auto,1fr] gap-x-3 capitalize text-black">
        <span class="font-medium text-neutral-600">{{ $t(text.price) }}</span>
        <span class="font-medium">{{
          state.lang === 'ar' ? bid?.minPrice + ' جنيه' : bid?.minPrice + ' LE'
        }}</span
        ><span class="font-medium text-neutral-600">{{ $t(text.status) }}</span>
        <span class="font-medium">{{ getStatus(bid.status) }}</span>
        <span class="font-medium text-neutral-600">{{ $t(text.from) }}</span>
        <span class="font-medium">{{
          dayjs(bid.startDate)
            .locale(state.lang)
            .format('ddd, D MMMM, YYYY | h:mm A')
        }}</span>
        <span class="font-medium text-neutral-600">{{ $t(text.to) }}</span>
        <span class="font-medium">{{
          dayjs(bid.endDate)
            .locale(state.lang)
            .format('ddd, D MMMM, YYYY | h:mm A')
        }}</span>
      </div>
    </div>
  </Router-Link>
</template>
