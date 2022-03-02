<script setup>
import { useStore } from '../store'
import { lists } from '../lang/navigation.json'
import BaseInput from './Base/BaseInput.vue';
import BaseTitle from './Base/BaseTitle.vue';

const { $state: state } = $(useStore())

const text = $ref({
  title: {
    ar: 'النشرة الإخبارية',
    en: 'News Letter',
  },
  subTitle: {
    ar: 'احصل علي المزادات الاسبوعيه',
    en: 'Get Notified With Weekly New Bids',
  },
  emailplaceholder: {
    ar: 'ادخل البريد الالكتروني',
    en: 'Leave Your Email',
  },
})
</script>

<template>
  <footer
    class="mt-6 flex flex-col gap-5 border border-neutral-800 bg-bi-700 p-5 backdrop-blur-sm"
  >
    <div class="flex items-start gap-16 ">
      <ul v-for="(list, index) in lists" :key="index">
        <li class="mb-2 text-lg font-semibold text-gray-400">
          {{ $t(list.name) }}
        </li>
        <li v-for="(item, index) in list.items" :key="index">
          <RouterLink :to="`/${state.lang}/${item.to}`"
            >{{ $t(item) }}
          </RouterLink>
        </li>
      </ul>
      <div class="!w-full">
        <BaseTitle class="!text-2xl mb-3">{{ $t(text.title) }}</BaseTitle>
        <p class="mb-3 text-gray-300">{{ $t(text.subTitle) }}</p>
        <BaseInput type="email" :placeholder="$t(text.emailplaceholder)" class="!w-full"/>
      </div>
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
