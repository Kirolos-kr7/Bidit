<script setup>
import { useStore } from '../store'
import { lists } from '../lang/navigation.json'
import BaseInput from './Base/BaseInput.vue'
import BaseTitle from './Base/BaseTitle.vue'
import BaseButton from './Base/BaseButton.vue'

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
  by: {
    ar: 'تصميم وبرمجة',
    en: 'Designed and Developed by',
    logo: 'Bid!T',
  },
  cta: {
    ar: 'ابقني على اطلاع',
    en: 'Keep Me Updated',
  },
})
</script>

<template>
  <footer
    class="mt-6 flex flex-col gap-5 border border-neutral-800 bg-bi-800 p-5 pt-6 backdrop-blur-sm"
  >
    <div class="grid gap-x-20 gap-y-10 md:grid-cols-[50%,1fr]">
      <div class="!w-full">
        <BaseTitle class="mb-3 !text-2xl">{{ $t(text.title) }}</BaseTitle>
        <p class="mb-3 text-gray-300">{{ $t(text.subTitle) }}</p>
        <div class="grid gap-y-2 md:grid-cols-[1fr,min-content]">
          <BaseInput
            type="email"
            :placeholder="$t(text.emailplaceholder)"
            class="!w-full"
          />
          <BaseButton
            class="w-[max-content] justify-self-end border border-neutral-700 bg-bi-600 px-3 py-2 hover:!bg-bi-800"
          >
            {{ $t(text.cta) }}
          </BaseButton>
        </div>
      </div>
      <div class="flex flex-wrap items-start gap-x-20 gap-y-5">
        <ul v-for="(list, index) in lists" :key="index">
          <li class="mb-2 text-lg font-semibold text-gray-400">
            {{ $t(list.name) }}
          </li>
          <li v-for="(item, index) in list.items" :key="index">
            <RouterLink
              :to="`/${state.lang}/${item.to}`"
              class="transition-colors hover:text-teal-600"
              >{{ $t(item) }}
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
    <div class="relative">
      <h4
        class="mt-6 mb-2 inline-block bg-gradient-to-r from-indigo-300 to-green-300 bg-clip-text font-semibold text-transparent"
      >
        {{ $t(text.by) }}
        <span class="font-bioRhyme font-extrabold">{{ text.by.logo }}</span>
      </h4>
    </div>
  </footer>
</template>
