<script setup>
import { useStore } from '../store'
import { useRouter } from 'vue-router'
import { lists } from '../lang/navigation.json'

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
    <ul class="mt-20 flex w-full flex-col items-start gap-5">
      <ul v-for="list in lists" class="w-full">
        <li class="mb-3 px-3 text-xl font-semibold text-gray-400">
          {{ $t(list.name) }}
        </li>
        <li v-for="item in list.items" class="h-full" @click="hideNav">
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
        <li v-for="item in text.lang.languages" class="w-full">
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
    </ul>
  </div>
</template>
