<script setup>
import { ref } from 'vue'
import { useStore } from '../store'

const { $state: state } = $(useStore())

const text = ref({
  listA: {
    name: { ar: 'الاقسام', en: 'Categories' },
    items: [
      {
        ar: 'الكل',
        en: 'All Bids',
        to: 'bids',
      },
      {
        ar: 'تحف',
        en: 'Antiques',
        to: 'bids/antiques',
      },
      {
        ar: 'فن',
        en: 'Art',
        to: 'bids/art',
      },
    ],
  },
})
</script>

<template>
  <footer
    class="pt- m-4 flex w-[calc(100%-2rem)] flex-col gap-5 rounded-md border border-neutral-800 bg-bi-700 p-4 backdrop-blur-sm"
  >
    <div class="flex items-start gap-10">
      <ul>
        <li class="mb-2 text-lg font-semibold text-gray-400">
          {{ $t(text.listA.name) }}
        </li>
        <li v-for="item in text.listA.items">
          <RouterLink :to="`/${state.lang}/${item.to}`"
            >{{ $t(item) }}
          </RouterLink>
        </li>
      </ul>
      <ul>
        <li class="mb-2 text-lg font-semibold text-gray-400">Company</li>
        <li>dkjfbsdk</li>
        <li>dkjfbsdk</li>
        <li>dkjfbsdk</li>
        <li>dkjfbsdk</li>
      </ul>
    </div>
    <div class="relative">
      <div class="mx-auto block w-fit bg-bi-700 px-3">
        <h4
          class="inline-block bg-gradient-to-r from-indigo-300 to-green-300 bg-clip-text font-semibold text-transparent"
        >
          Designed and Developed by SHA#1
        </h4>
      </div>
      <span class="absolute top-1/2 left-0 z-[-1] h-px w-full bg-bi-900"></span>
    </div>
  </footer>
</template>
