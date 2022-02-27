<script setup>
import { useStore } from '../store'
import { lists } from '../lang/navigation.json'

const { $state: state } = $(useStore())

const text = $ref({
  navDDLButton: {
    ar: 'الاقسام',
    en: 'Categories',
  },
  catDDLItems: [
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
  langDDLItems: [
    {
      lang: 'ع',
      flag: '/images/flags/eg.svg',
    },
    {
      lang: 'en',
      flag: '/images/flags/us.svg',
    },
  ],
  account: {
    ar: 'حسابي',
    en: 'My Account',
    to: 'account',
    requiresUNAuth: true,
  },
  login: {
    ar: 'تسجيل الدخول',
    en: 'Login',
    to: 'login',
    requiresAuth: true,
  },
})

const toggleDDL = (ddl = null) => {
  if (ddl === 'cat') {
    if (!catDDL) {
      catDDL = true
      langDDL = false
      addEventListener(
        'mousedown',
        (e) => {
          if (!e.target.dataset.catbutton) {
            langDDL = false
            catDDL = false
          }
        },
        {
          once: true,
        },
      )
    } else {
      catDDL = false
    }
  }

  if (ddl === 'lang') {
    if (!langDDL) {
      langDDL = true
      catDDL = false
      addEventListener(
        'mousedown',
        (e) => {
          if (!e.target.dataset.langbutton) {
            langDDL = false
            catDDL = false
          }
        },
        {
          once: true,
        },
      )
    } else {
      langDDL = false
    }
  }
}

const changeLang = (lang) => {
  let newLang = lang === 'ع' ? 'ar' : 'en'

  newLang === 'ar' ? (document.body.dir = 'rtl') : (document.body.dir = 'ltr')

  localStorage.setItem('lang', newLang)
  state.lang = newLang
  router.replace({ params: { lang: newLang } })
  langDDL = false
}
</script>

<template>
  <div class="fixed top-0 left-0 z-10 h-full w-3/4 bg-[#111111] transition-all">
    <ul class="mt-20 flex w-full flex-col items-start gap-5">
      <ul v-for="list in lists" class="w-full">
        <li class="mb-3 px-3 text-xl font-semibold text-gray-400">
          {{ $t(list.name) }}
        </li>
        <li v-for="item in list.items" class="h-full">
          <RouterLink
            :to="`/${state.lang}/${item.to}`"
            class="block py-2 px-3 text-lg font-semibold hover:bg-bi-800"
            >{{ $t(item) }}
          </RouterLink>
        </li>
      </ul>
    </ul>
  </div>
</template>
