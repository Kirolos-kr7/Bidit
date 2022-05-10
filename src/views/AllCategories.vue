<script setup>
import BaseTitle from '../components/Base/BaseTitle.vue'
import UserLayout from '../components/UserLayout.vue'
import { useStore } from '../store'

const { $state: state } = useStore()

const text = $ref({
  allCategories: {
    ar: 'كل الاقسام',
    en: 'All Categories',
  },
})
</script>

<template>
  <UserLayout>
    <div class="px-4">
      <BaseTitle>{{ $t(text.allCategories) }}</BaseTitle>
      <div
        class="my-4 grid grid-cols-2 gap-2 bg-white p-3 shadow-sm md:my-6 md:grid-cols-4 md:gap-5 md:rounded-md md:p-6"
      >
        <RouterLink
          :to="`/${state.lang}/bids/furniture`"
          class="transition-all hover:brightness-90"
        >
          <img
            :src="`/images/home/${state.lang}/furniture.png`"
            class="cursor-pointer"
          />
        </RouterLink>
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
          <img
            :src="`/images/home/${state.lang}/art.png`"
            class="cursor-pointer"
          />
        </RouterLink>
        <RouterLink
          :to="`/${state.lang}/bids/cars`"
          class="transition-all hover:brightness-90"
        >
          <img
            :src="`/images/home/${state.lang}/cars.png`"
            class="cursor-pointer"
          />
        </RouterLink>
        <RouterLink
          :to="`/${state.lang}/bids/clothes`"
          class="transition-all hover:brightness-90"
        >
          <img
            :src="`/images/home/${state.lang}/clothes.png`"
            class="cursor-pointer"
          />
        </RouterLink>
        <RouterLink
          :to="`/${state.lang}/bids/antiques`"
          class="transition-all hover:brightness-90"
        >
          <img
            :src="`/images/home/${state.lang}/antiques.png`"
            class="cursor-pointer"
          /> </RouterLink
        ><RouterLink
          :to="`/${state.lang}/bids/animals`"
          class="transition-all hover:brightness-90"
        >
          <img
            :src="`/images/home/${state.lang}/animals.png`"
            class="cursor-pointer"
          />
        </RouterLink>
        <RouterLink
          :to="`/${state.lang}/bids/others`"
          class="transition-all hover:brightness-90"
        >
          <img
            :src="`/images/home/${state.lang}/others.png`"
            class="cursor-pointer"
          />
        </RouterLink>
      </div>
    </div>
  </UserLayout>
</template>
