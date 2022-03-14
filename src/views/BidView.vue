<script setup>
import moment from 'moment'
import BaseButton from '../components/Base/BaseButton.vue'
import BaseInput from '../components/Base/BaseInput.vue'
import { useStore } from '../store'
import { getType, getPricePerLang } from '../functions'

const { $state: state } = useStore()

const text = $ref({
  price: {
    ar: 'السعر المبدئي',
    en: 'Start Price',
  },
  startBid: {
    ar: 'بدء المزاد',
    en: 'Bid Now',
  },
  report: {
    ar: 'الابلاغ عن المزاد!',
    en: 'Report This Bid!',
  },
})

let bid = $ref({
  item: {
    name: 'Activ Sharks Patterned Zipped Backpack With outer Pocket - Steal Blue',
    type: 'colthes',
  },
  user: {
    fullName: 'Kirolos Rafaat',
    image: null,
    uid: '123dsfd',
  },
  startDate: moment().subtract(3, 'days').calendar(),
  endDate: moment().add(3, 'days').calendar(),
  status: 'canceled',
  minPrice: 1400,
})
</script>

<template>
  <div class="-mx-4 -mt-6 grid bg-bi-800 sm:-mx-8 sm:grid-cols-3">
    <div class="grid place-content-center bg-bi-600">
      <img
        src="/images/monalisa-art.jpg"
        class="mx-auto my-auto h-[230px] w-[240px] object-cover"
      />
    </div>

    <div class="bg-bi-800 sm:col-span-2 sm:mt-8">
      <div class="p-4 pt-6 sm:pt-8">
        <RouterLink
          :to="`/${state.lang}/bids/${bid.item.type}`"
          class="mb-2 inline-block rounded-2xl bg-indigo-600 px-3 font-medium capitalize"
        >
          {{ getType(bid.item.type) }}
        </RouterLink>

        <h2
          class="overflow-hidden break-all text-lg font-semibold capitalize md:text-[22px]"
        >
          {{ bid.item.name }}
        </h2>

        <div class="my-2 flex flex-wrap items-center gap-2">
          <div class="flex items-center gap-2">
            <img src="/images/avatar.png" class="w-7 cursor-pointer" />
            <div class="inline-block text-blue-600 underline">
              {{ bid.user.fullName }}
            </div>
          </div>
          <span
            class="relative mx-0.5 hidden h-1.5 w-1.5 rounded-full bg-gray-600 sm:inline-block"
          ></span>
          <p class="text-slate-500">Saturday 12 may 2021</p>
        </div>

        <h3 class="my-3 text-lg font-semibold">
          {{ $t(text.price) }} : {{ getPricePerLang(bid.minPrice) }}
        </h3>
        <p class="mb-2 text-neutral-400">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam hic
          corporis, doloribus debitis maxime harum placeat itaque fugit culpa
          nihil sit est rerum molestias asperiores quam alias! Odit,
          exercitationem eveniet?
        </p>

        <div
          class="my-3 flex flex-col overflow-hidden rounded-md border border-gray-800"
        >
          <div
            class="flex w-full items-center justify-between bg-gray-800 px-3 py-2"
          >
            <h4 class="text-lg font-semibold">
              Live
              <span
                class="relative mx-0.5 inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-red-700"
              />
            </h4>
            <div>
              <span>{{ new Date().getHours() + 'h' }}</span> :
              <span>{{ new Date().getMinutes() + 'm' }}</span> :
              <span>{{ new Date().getSeconds() + 's' }}</span
              >&nbsp;
              <span class="text-lg font-semibold">left</span>
            </div>
          </div>
          <div class="grid gap-x-5 md:grid-cols-2">
            <div class="flex items-center gap-2 p-4">
              <h5>
                <b class="text-xl">(12)</b> Bids Latest is
                <b class="text-xl">{{ getPricePerLang(1800) }}</b>
              </h5>
            </div>
            <div class="flex flex-col border border-gray-800">
              <input
                type="number"
                placeholder="Your Price"
                class="bg-transparent p-3 focus:outline-none"
              />
              <BaseButton
                class="!w-full rounded-none border-none bg-gray-800 hover:!bg-gray-800/40"
              >
                {{ $t(text.startBid) }}
              </BaseButton>
            </div>
          </div>
        </div>

        <a href="#" class="mt-8 flex justify-end text-blue-600 underline">{{
          $t(text.report)
        }}</a>
      </div>
    </div>
  </div>
</template>
