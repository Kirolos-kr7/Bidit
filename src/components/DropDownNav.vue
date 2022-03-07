<script setup>
import { useStore } from '../store'
import { useRouter } from 'vue-router'
import { list } from '../lang/navigation.json'
import { categories } from '../lang/categories.json'

const { $state: state } = $(useStore())
const emits = defineEmits(['hideNav'])
const router = useRouter()

const text = $ref({
  lang: {
    name: {
      ar: 'اللغة',
      en: 'Languages',
    },
    languages: [
      {
        lang: 'ع',
        flag: '/images/flags/eg.svg',
      },
      {
        lang: 'en',
        flag: '/images/flags/us.svg',
      },
    ],
  },
})

const hideNav = () => {
  emits('hideNav')
}

const changeLang = (lang) => {
  let newLang = lang === 'ع' ? 'ar' : 'en'

  newLang === 'ar' ? (document.body.dir = 'rtl') : (document.body.dir = 'ltr')

  localStorage.setItem('lang', newLang)
  state.lang = newLang
  router.replace({ params: { lang: newLang } })
  hideNav()
}
</script>

<template>
  <div
    class="fixed top-0 left-0 z-10 h-full w-full bg-[#111111] transition-all"
  >
    <div class="mt-20 flex w-full flex-col items-start gap-5">
      <ul class="w-full">
        <li class="mb-3 px-3 text-xl font-semibold text-gray-400">
          {{ $t(categories.name) }}
        </li>
        <li>
          <RouterLink
            class="block py-2 px-3 text-lg font-semibold hover:bg-bi-800"
            :to="`/${state.lang}/bids`"
          >
            {{ $t({ ar: 'الكل', en: 'all' }) }}
          </RouterLink>
        </li>
        <li
          v-for="(item, index) in categories.items"
          class="h-full"
          @click="hideNav"
          :key="index"
        >
          <RouterLink
            :to="`/${state.lang}/bids/${item.to}`"
            class="block py-2 px-3 text-lg font-semibold hover:bg-bi-800"
            >{{ $t(item) }}
          </RouterLink>
        </li>
      </ul>
      <ul class="w-full">
        <li class="mb-3 px-3 text-xl font-semibold text-gray-400">
          {{ $t(list.name) }}
        </li>
        <li
          v-for="(item, index) in list.items"
          class="h-full"
          @click="hideNav"
          :key="index"
        >
          <RouterLink
            :to="`/${state.lang}/${item.to}`"
            class="block py-2 px-3 text-lg font-semibold hover:bg-bi-800"
            >{{ $t(item) }}
          </RouterLink>
        </li>
      </ul>
      <ul class="w-full">
        <li class="mb-3 px-3 text-xl font-semibold text-gray-400">
          {{ $t(text.lang.name) }}
        </li>
        <li v-for="(item, index) in text.lang.languages" :key="index">
          <button
            class="flex w-full items-center gap-3 py-2 px-3 text-lg font-semibold hover:bg-bi-800"
            @click="changeLang(item.lang)"
          >
            <img :src="item.flag" :alt="item.lang" class="w-6" />
            <span
              class="font-semibold uppercase"
              :class="{ '-mt-2': item.lang === 'ar' }"
            >
              {{ item.lang }}</span
            >
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
