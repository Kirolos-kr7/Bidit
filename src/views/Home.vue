<script setup>
import BaseMegaButton from '../components/Base/BaseMegaButton.vue'
import { useStore } from '../store'
import Navbar from '../components/Navbar.vue'
import { gsap } from 'gsap'
import { onMounted } from 'vue'

const { $state: state } = $(useStore())

onMounted(() => {
  let tl = gsap.timeline()
  let tlI = gsap.timeline()

  tl.from('#mainTitle', { opacity: 0, duration: 1 }).from('#cta', {
    opacity: 0,
    y: 50,
  })

  tlI
    .to('.img-wrapper span', { height: '100%', duration: 0.9, stagger: 0.1 })
    .to('.img-wrapper img', { opacity: 1, duration: 0 })
    .to('.img-wrapper span', {
      height: 0,
      top: 'unset',
      bottom: 0,
      duration: 0.9,
      stagger: 0.1,
    })
})

const text = $ref({
  mainTitle: {
    ar: `المنصة الرائدة للمزادات`,
    en: `Leading Bidding Platform in Egypt`,
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
})
</script>

<template>
  <header
    class="relative -mx-4 -mt-[5.5rem] grid justify-end gap-5 md:-mx-8 md:grid-cols-3 md:gap-0"
  >
    <div class="relative md:col-span-2">
      <Navbar class="absolute top-0 left-0" />

      <div class="flex flex-col gap-3 px-4 pt-24 md:px-8 md:pt-48">
        <h1
          id="mainTitle"
          class="mx-auto w-3/4 overflow-hidden py-2 text-center font-bioRhyme text-5xl font-bold text-black md:text-6xl"
        >
          {{ $t(text.mainTitle) }}
        </h1>

        <RouterLink :to="`/${state.lang}/bids`" id="cta" class="mx-auto mt-4">
          <BaseMegaButton tabindex="-1">{{ $t(text.cta) }}</BaseMegaButton>
        </RouterLink>
      </div>
    </div>
    <div
      class="flex h-[51vh] w-screen gap-2.5 overflow-hidden bg-black p-2.5 md:h-screen md:w-auto"
    >
      <div class="grid -translate-y-24 gap-2.5">
        <div class="img-wrapper relative">
          <span class="z-1 0 absolute top-0 left-0 w-full bg-white"></span>
          <img
            src="/images/home/1.png"
            class="h-[320px] w-[180px] min-w-[180px] object-cover opacity-0"
          />
        </div>
        <div class="img-wrapper relative">
          <span class="z-1 0 absolute top-0 left-0 w-full bg-white"></span>
          <img
            src="/images/home/4.png"
            class="h-[320px] w-[180px] min-w-[180px] object-cover opacity-0"
          />
        </div>
        <div class="img-wrapper relative">
          <span class="z-1 0 absolute top-0 left-0 w-full bg-white"></span>
          <img
            src="/images/home/7.png"
            class="h-[320px] w-[180px] min-w-[180px] object-cover opacity-0"
          />
        </div>
      </div>
      <div class="grid -translate-y-8 gap-2.5">
        <div class="img-wrapper relative">
          <span class="z-1 0 absolute top-0 left-0 w-full bg-white"></span>
          <img
            src="/images/home/2.png"
            class="h-[320px] w-[180px] min-w-[180px] object-cover opacity-0"
          />
        </div>
        <div class="img-wrapper relative">
          <span class="z-1 0 absolute top-0 left-0 w-full bg-white"></span>
          <img
            src="/images/home/5.png"
            class="h-[320px] w-[180px] min-w-[180px] object-cover opacity-0"
          />
        </div>
        <div class="img-wrapper relative">
          <span class="z-1 0 absolute top-0 left-0 w-full bg-white"></span>
          <img
            src="/images/home/8.png"
            class="h-[320px] w-[180px] min-w-[180px] object-cover opacity-0"
          />
        </div>
      </div>
      <div class="grid -translate-y-40 gap-2.5">
        <div class="img-wrapper relative">
          <span class="z-1 0 absolute top-0 left-0 w-full bg-white"></span>
          <img
            src="/images/home/3.png"
            class="h-[320px] w-[180px] min-w-[180px] object-cover opacity-0"
          />
        </div>
        <div class="img-wrapper relative">
          <span class="z-1 0 absolute top-0 left-0 w-full bg-white"></span>
          <img
            src="/images/home/6.png"
            class="h-[320px] w-[180px] min-w-[180px] object-cover opacity-0"
          />
        </div>
        <div class="img-wrapper relative">
          <span class="z-1 0 absolute top-0 left-0 w-full bg-white"></span>
          <img
            src="/images/home/9.png"
            class="h-[320px] w-[180px] min-w-[180px] object-cover opacity-0"
          />
        </div>
      </div>
    </div>
  </header>

  <section class="my-8 grid grid-cols-4 gap-5">
    <RouterLink :to="`/${state.lang}/bids/technology`">
      <img src="/images/home/Frame 5.png" class="cursor-pointer" />
    </RouterLink>
    <RouterLink :to="`/${state.lang}/bids/art`">
      <img src="/images/home/Frame 9.png" class="cursor-pointer" />
    </RouterLink>
    <RouterLink :to="`/${state.lang}/bids/antiques`">
      <img src="/images/home/Frame 10.png" class="cursor-pointer" />
    </RouterLink>
    <RouterLink :to="`/${state.lang}/bids/categories`">
      <img src="/images/home/Frame 7.png" class="cursor-pointer" />
    </RouterLink>
  </section>
</template>
