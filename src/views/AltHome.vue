<script setup>
import { Carousel, Slide, Pagination } from 'vue3-carousel'
import { useStore } from '../store'
import BaseTitle from '../components/Base/BaseTitle.vue'
import Bids from '../components/Bids.vue'
import 'vue3-carousel/dist/carousel.css'
import { onMounted } from 'vue'
import gsap from 'gsap'

const { $state: state } = $(useStore())

onMounted(() => {
  gsap.from('[data-cat-animate]', {
    opacity: 0,
    duration: 0.4,
    stagger: 0.2,
  })
})

const brp = $ref({
  900: {
    itemsToShow: 1.5,
  },

  0: {
    itemsToShow: 1.04,
  },
})

const text = $ref({
  forYou: {
    ar: `أفضل الاختيارات لك`,
    en: `Top Bids For You`,
  },
  youRecentlyViewed: {
    ar: `شاهدت مؤخراً`,
    en: `You Recently Viewed`,
  },
})
</script>

<template>
  <header
    class="relative -mt-2 grid justify-end gap-5 overflow-hidden bg-white pt-2 md:grid-cols-3 md:gap-0"
  >
    <Carousel
      :breakpoints="brp"
      class="w-[calc(100vw-1rem)] gap-3 py-3"
      :autoplay="4000"
      :wrap-around="true"
      dir="ltr"
    >
      <Slide class="p-0.5 md:p-2" key="1">
        <img :src="`/images/home/${state.lang}/shipping.png`" />
      </Slide>
      <Slide class="p-0.5 md:p-2" key="2">
        <img :src="`/images/home/${state.lang}/easyToUse.png`" />
      </Slide>
      <Slide class="p-0.5 md:p-2" key="3">
        <img :src="`/images/home/${state.lang}/participate.png`" />
      </Slide>
      <Slide class="p-0.5 md:p-2" key="4">
        <img :src="`/images/home/${state.lang}/shipping.png`" />
      </Slide>
      <Slide class="p-0.5 md:p-2" key="5">
        <img :src="`/images/home/${state.lang}/easyToUse.png`" />
      </Slide>
      <Slide class="p-0.5 md:p-2" key="6">
        <img :src="`/images/home/${state.lang}/participate.png`" />
      </Slide>

      <template #addons>
        <Pagination />
      </template>
    </Carousel>
  </header>

  <section class="my-4 p-4 md:my-6">
    <BaseTitle>{{ $t(text.forYou) }}</BaseTitle>
    <Bids />
  </section>

  <section
    class="my-4 grid grid-cols-2 gap-2 bg-white p-3 md:my-6 md:grid-cols-4 md:gap-5 md:p-6"
  >
    <RouterLink
      :to="`/${state.lang}/bids/technology`"
      class="transition-all hover:brightness-90"
    >
      <img
        :src="`/images/home/${state.lang}/technology.png`"
        class="cursor-pointer"
        data-cat-animate
      />
    </RouterLink>
    <RouterLink
      :to="`/${state.lang}/bids/art`"
      class="transition-all hover:brightness-90"
    >
      <img :src="`/images/home/${state.lang}/art.png`" class="cursor-pointer" />
    </RouterLink>
    <RouterLink
      data-cat-animate
      :to="`/${state.lang}/bids/antiques`"
      class="transition-all hover:brightness-90"
    >
      <img
        :src="`/images/home/${state.lang}/antiques.png`"
        class="cursor-pointer"
        data-cat-animate
      />
    </RouterLink>
    <RouterLink
      :to="`/${state.lang}/bids/categories`"
      class="transition-all hover:brightness-90"
    >
      <img
        :src="`/images/home/${state.lang}/cats.png`"
        class="cursor-pointer"
        data-cat-animate
      />
    </RouterLink>
  </section>

  <section class="my-4 p-4 md:my-6">
    <BaseTitle>{{ $t(text.youRecentlyViewed) }}</BaseTitle>
    <Bids />
  </section>
</template>
