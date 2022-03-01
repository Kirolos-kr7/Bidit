<script setup>
import { useRouter } from 'vue-router'
import { useStore } from '../store'
import BaseDDL from './Base/BaseDDL.vue'
import BaseDialog from './Base/BaseDialog.vue'
import SearchBar from './SearchBar.vue'
import DropDownNav from './DropDownNav.vue'

const { $state: state } = $(useStore())
const router = useRouter()
let catDDL = $ref(false)
let langDDL = $ref(false)
let searchDialog = $ref(false)
let hamburgerMenu = $ref(false)

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
  <nav
    class="fixed z-20 flex h-16 max-h-screen w-full items-stretch justify-between gap-5 border border-neutral-800 bg-neutral-800/75 backdrop-blur-sm sm:px-2 md:px-8"
    dir="ltr"
  >
    <div class="flex items-center gap-2">
      <button
        class="flex h-full cursor-pointer items-center justify-center px-3 font-semibold transition-colors hover:bg-neutral-700/75 md:hidden"
        @click="hamburgerMenu = !hamburgerMenu"
      >
        <svg
          class="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          data-v-d2eb525e=""
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2.8"
            d="M4 8h16M4 16h16"
            data-v-d2eb525e=""
          ></path>
        </svg>
      </button>
      <RouterLink
        :to="`/${state.lang}`"
        class="bg-gradient-to-br from-indigo-800 to-blue-300 bg-clip-text py-3 font-bioRhyme text-3xl font-extrabold text-transparent"
        >BID!T</RouterLink
      >
    </div>
    <ul class="flex h-full items-center font-semibold">
      <li
        class="relative h-full"
        v-if="text.account.requiresUNAuth && !state.user"
      >
        <button
          class="flex h-full cursor-pointer items-center justify-center px-3 font-semibold transition-colors hover:bg-neutral-700/75"
          @click="searchDialog = true"
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
              stroke-width="2.8"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </button>
      </li>
      <li class="relative hidden h-full md:block">
        <button
          class="py-auto block h-full cursor-pointer px-3 font-semibold transition-colors hover:bg-neutral-700/75"
          :data-catButton="true"
          @click="toggleDDL('cat')"
        >
          {{ $t(text.navDDLButton) }}
          <span class="pointer-events-none ml-1">&darr;</span>
        </button>
        <transition name="curtain">
          <BaseDDL class="absolute right-0" v-if="catDDL" dir="auto">
            <li
              v-for="(item, index) in text.catDDLItems"
              :key="index"
              class="border-b border-neutral-700/50 last-of-type:border-none"
            >
              <RouterLink
                class="flex w-full px-3 py-2 transition-colors hover:bg-neutral-700/50"
                :to="`/${state.lang}/${item.to}`"
              >
                {{ $t(item) }}
              </RouterLink>
            </li>
          </BaseDDL>
        </transition>
      </li>
      <li class="relative hidden h-full md:block">
        <button
          class="block h-full cursor-pointer px-3 font-semibold transition-colors hover:bg-neutral-700/75"
          :data-langButton="true"
          @click="toggleDDL('lang')"
        >
          <div class="pointer-events-none flex items-center">
            <img
              class="mr-2 w-6"
              :src="
                state.lang === 'ar'
                  ? `/images/flags/eg.svg`
                  : `/images/flags/us.svg`
              "
              :alt="state.lang"
            />
            <span class="uppercase" :class="{ '-mt-1': state.lang === 'ar' }">{{
              state.lang === 'ar' ? 'ع' : 'en'
            }}</span>
            <span class="ml-1">&darr;</span>
          </div>
        </button>
        <transition name="curtain">
          <BaseDDL class="absolute !w-full" v-if="langDDL">
            <li
              v-for="(item, index) in text.langDDLItems"
              :key="index"
              class="border-b border-neutral-700/50 last-of-type:border-none"
            >
              <button
                class="flex w-full items-center gap-2 px-3 py-2 text-left transition-colors hover:bg-neutral-700/50"
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
          </BaseDDL>
        </transition>
      </li>
      <li
        class="relative h-full"
        v-if="text.account.requiresAuth && state.user"
      >
        <RouterLink
          class="flex h-full cursor-pointer items-center justify-center px-3 font-semibold transition-colors hover:bg-neutral-700/75"
          :to="`/${state.lang}/${text.account.to}`"
        >
          {{ $t(text.account) }}
        </RouterLink>
      </li>
      <li
        class="relative h-full"
        v-if="text.account.requiresUNAuth && !state.user"
      >
        <RouterLink
          class="flex h-full cursor-pointer items-center justify-center bg-indigo-700/75 px-3 font-semibold transition-colors hover:bg-neutral-700/75"
          :to="`/${state.lang}/${text.login.to}`"
        >
          {{ $t(text.login) }}
        </RouterLink>
      </li>
    </ul>
  </nav>

  <transition :name="state.lang === 'ar' ? 'slideRight' : 'slideLeft'">
    <DropDownNav v-if="hamburgerMenu" @hideNav="hamburgerMenu = false" />
  </transition>

  <transition name="fade">
    <BaseDialog v-if="searchDialog" @click="searchDialog = false">
      <SearchBar />
    </BaseDialog>
  </transition>
</template>
