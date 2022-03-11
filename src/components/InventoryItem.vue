<script setup>
import { useStore } from '../store'
import { categories } from '../lang/categories.json'
import BaseButton from './Base/BaseButton.vue'
import { getType } from '../functions'

const { $state: state } = useStore()

const text = $ref({
  start: {
    ar: 'بدء المزاد',
    en: 'Start Bid',
  },
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
})

defineProps({
  item: {
    type: Object,
    required: true,
  },
})
const emits = defineEmits(['editItem', 'deleteItem', 'newBid'])
</script>

<template>
  <div class="relative flex flex-col overflow-hidden rounded-md bg-bi-700">
    <img src="/images/monalisa-art.jpg" class="h-[260px] object-cover" />
    <div class="p-3">
      <div class="my-2 flex max-w-full items-start justify-between gap-3">
        <h2
          class="overflow-hidden break-all text-lg font-semibold capitalize md:text-[22px]"
          style="
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          "
        >
          {{ item.name }}
        </h2>
        <RouterLink
          class="my-1 inline-block rounded-2xl bg-indigo-600 px-3 font-medium capitalize"
          :to="`/${state.lang}/bids/${item.type}`"
        >
          {{ getType(item.type) }}
        </RouterLink>
      </div>
      <p
        class="my-1 overflow-hidden text-neutral-400"
        style="
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        "
      >
        {{ item.decription }}
      </p>
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
        <button
          class="flex items-center justify-center rounded-full bg-indigo-900 p-2 hover:!bg-indigo-800"
          :title="$t(text.editTitle)"
          @click="emits('editItem', item)"
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
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            ></path>
          </svg>
        </button>
        <button
          class="flex items-center justify-center rounded-full bg-red-700 p-2 hover:!bg-red-600"
          :title="$t(text.deleteTitle)"
          @click="emits('deleteItem', item)"
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
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            ></path>
          </svg>
        </button>
      </div>
      <BaseButton class="mt-2 w-full" @click="emits('newBid')">{{
        $t(text.start)
      }}</BaseButton>
    </div>
  </div>
</template>
