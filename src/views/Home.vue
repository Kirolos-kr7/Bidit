<script setup>
import BaseMegaButton from '../components/Base/BaseMegaButton.vue'
import { useStore } from '../store'

const { $state: state } = $(useStore())

const text = $ref({
  mainTitle: {
    ar: `المنصة #1 للمزادات في مصر`,
    en: `#1 Auction platform in egypt`,
  },
  description: {
    ar: `نحن نقصي المسافة بين الراهن والمزائد من اجل توفير مزاد آلي وآمن من اي مكان وفي اي وقت.`,
    en: `We eliminate distance between bidder and auctioneer providing an
        automated and secure auction from any where at any time.`,
  },
  cta: {
    ar: `اكتشف المزادات`,
    en: `Discover Bids `,
  },
  stats: [
    {
      num: '1K+',
      ar: 'عملاء يثقون بنا',
      en: 'Clients trust us',
    },
    {
      num: '14K+',
      ar: 'مزاد على منصتنا',
      en: 'Bids on our platform',
    },
  ],
})
</script>

<template>
  <header
    class="relative mx-auto mt-3 mb-20 flex max-h-screen max-w-[1200px] flex-col items-center md:mt-12 md:flex-row md:justify-evenly"
  >
    <div class="relative z-[2] flex max-w-lg flex-col items-start gap-3">
      <h1
        class="inline-block bg-gradient-to-r from-indigo-800 via-blue-300 to-indigo-400 bg-clip-text py-5 font-bioRhyme text-5xl font-bold text-transparent md:text-6xl"
        :class="{ '-mt-5': state.lang === 'en' }"
      >
        {{ $t(text.mainTitle) }}
      </h1>
      <p class="text-neutral-300">
        {{ $t(text.description) }}
      </p>
      <RouterLink :to="`/${state.lang}/bids`" class="mt-4">
        <BaseMegaButton tabindex="-1">{{ $t(text.cta) }}</BaseMegaButton>
      </RouterLink>

      <div class="my-8 hidden flex-row gap-5 md:flex">
        <div v-for="(stat, index) in text.stats" :key="index">
          <div
            class="block bg-gradient-to-r from-green-300 to-blue-300 bg-clip-text text-2xl font-black text-transparent"
          >
            {{ stat.num }}
          </div>
          <span class="text-neutral-300">{{ $t(stat) }}</span>
        </div>
      </div>
    </div>
    <div class="relative" :class="{ '-scale-x-100': state.lang === 'en' }">
      <img
        src="/images/kisspng-vaporwave-aesthetics-youtube-marble-sculpture-art-aesthetic-5ad7a8eba95279.8260165215240829236936.png"
        class="mx-auto w-[350px] md:w-[400px]"
      />
      <img
        src="/images/blob-haikei.svg"
        class="absolute top-1/3 left-0 z-[-1] min-w-[110%] -translate-y-1/2"
      />
    </div>
  </header>
</template>
