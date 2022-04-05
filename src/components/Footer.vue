<script setup>
import { useStore } from '../store'
import { list } from '../lang/navigation.json'
import { categories } from '../lang/categories.json'
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
    ar: 'اشترك',
    en: 'Subscribe',
  },
})
</script>

<template>
  <footer class="mt-6 bg-bi-200 p-5 pt-6">
    <div class="mx-auto flex flex-col gap-5 bg-bi-200 lg:container">
      <div class="grid gap-x-20 gap-y-10 md:grid-cols-[50%,1fr]">
        <div class="!w-full">
          <BaseTitle class="mb-3 !text-2xl">{{ $t(text.title) }}</BaseTitle>
          <p class="mb-3 font-medium text-black/80">{{ $t(text.subTitle) }}</p>
          <div class="grid gap-y-2 md:grid-cols-[1fr,min-content]">
            <input
              type="email"
              :placeholder="$t(text.emailplaceholder)"
              class="px-3 py-2 font-medium text-black focus:outline-none"
            />
            <BaseButton
              class="w-[max-content] justify-self-end rounded-none border-none px-3 py-2"
            >
              {{ $t(text.cta) }}
            </BaseButton>
          </div>
        </div>
        <div class="flex flex-wrap items-start gap-x-20 gap-y-5 capitalize">
          <ul>
            <li class="mb-2 text-lg font-extrabold text-bi-300">
              {{ $t(categories.name) }}
            </li>
            <li>
              <RouterLink
                :to="`/${state.lang}/bids`"
                class="font-medium text-black transition-colors hover:text-teal-600"
                >{{ $t({ ar: 'الكل', en: 'all' }) }}
              </RouterLink>
            </li>
            <li v-for="(item, index) in categories.items" :key="index">
              <RouterLink
                :to="`/${state.lang}/bids/${item.to}`"
                class="font-medium text-black transition-colors hover:text-teal-600"
                >{{ $t(item) }}
              </RouterLink>
            </li>
          </ul>
          <ul>
            <li class="mb-2 text-lg font-extrabold text-bi-300">
              {{ $t(list.name) }}
            </li>
            <li v-for="(item, index) in list.items" :key="index">
              <RouterLink
                :to="`/${state.lang}/${item.to}`"
                class="font-medium text-black transition-colors hover:text-teal-600"
                >{{ $t(item) }}
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
      <div class="relative">
        <h4
          class="mt-6 mb-2 inline-block bg-clip-text font-semibold text-black"
        >
          {{ $t(text.by) }}
          <span class="font-merriweather font-extrabold">{{
            text.by.logo
          }}</span>
        </h4>
      </div>
    </div>
  </footer>
</template>
