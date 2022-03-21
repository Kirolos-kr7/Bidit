<script setup>
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import { useStore } from '../store'
import BaseTitle from '../components/Base/BaseTitle.vue'
import Bids from '../components/Bids.vue'
import 'vue3-carousel/dist/carousel.css'

const { $state: state } = $(useStore())

const brp = $ref({
  900: {
    itemsToShow: 2.2,
  },

  600: {
    itemsToShow: 1.5,
  },

  0: {
    itemsToShow: 1.2,
  },
})

const text = $ref({
  forYou: {
    ar: `أفضل الاختيارات لك`,
    en: `Top Bids For You`,
  },
})
</script>

<template>
  <header
    class="relative -mx-4 -mt-[5.5rem] grid justify-end gap-5 pt-16 md:-mx-8 md:grid-cols-3 md:gap-0"
  >
    <Carousel
      :breakpoints="brp"
      class="w-[calc(100vw-1rem)] gap-3 py-3"
      :autoplay="4000"
      :wrap-around="true"
      dir="ltr"
    >
      <Slide class="p-2" key="1">
        <img :src="`/images/home/${state.lang}/shipping.png`" />
      </Slide>
      <Slide class="p-2" key="2">
        <img :src="`/images/home/${state.lang}/easyToUse.png`" />
      </Slide>
      <Slide class="p-2" key="3">
        <img :src="`/images/home/${state.lang}/participate.png`" />
      </Slide>
      <Slide class="p-2" key="4">
        <img :src="`/images/home/${state.lang}/shipping.png`" />
      </Slide>
      <Slide class="p-2" key="5">
        <img :src="`/images/home/${state.lang}/easyToUse.png`" />
      </Slide>
      <Slide class="p-2" key="6">
        <img :src="`/images/home/${state.lang}/participate.png`" />
      </Slide>

      <template #addons>
        <Pagination />
      </template>
    </Carousel>
  </header>

  <section class="my-12 grid grid-cols-2 gap-5 md:grid-cols-4">
    <RouterLink
      :to="`/${state.lang}/bids/technology`"
      class="transition-all hover:brightness-90"
    >
      <img
        :src="`/images/home/${state.lang}/technology.png`"
        class="cursor-pointer"
      />
    </RouterLink>
    <RouterLink
      :to="`/${state.lang}/bids/art`"
      class="transition-all hover:brightness-90"
    >
      <img :src="`/images/home/${state.lang}/art.png`" class="cursor-pointer" />
    </RouterLink>
    <RouterLink
      :to="`/${state.lang}/bids/antiques`"
      class="transition-all hover:brightness-90"
    >
      <img
        :src="`/images/home/${state.lang}/antiques.png`"
        class="cursor-pointer"
      />
    </RouterLink>
    <RouterLink
      :to="`/${state.lang}/bids/categories`"
      class="transition-all hover:brightness-90"
    >
      <img
        :src="`/images/home/${state.lang}/cats.png`"
        class="cursor-pointer"
      />
    </RouterLink>
  </section>

  <section>
    <BaseTitle>{{ $t(text.forYou) }}</BaseTitle>
    <Bids />
  </section>
</template>
