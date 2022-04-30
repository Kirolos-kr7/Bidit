<script setup>
import { useStore } from '../store'
import {
  getType,
  getPricePerLang,
  getNumPerLang,
  useAxios,
  $t,
} from '../functions'
import { onMounted, onUnmounted, watchEffect } from 'vue'
import BaseButton from '../components/Base/BaseButton.vue'
import BaseType from '../components/Base/BaseType.vue'
import { io } from 'socket.io-client'

import dayjs from 'dayjs'
import 'dayjs/locale/es'
import 'dayjs/locale/ar'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import UserLayout from '../components/UserLayout.vue'
import { useRoute, useRouter } from 'vue-router'
import BaseError from '../components/Base/BaseError.vue'
dayjs.extend(advancedFormat)
dayjs.extend(localizedFormat)

const { $state: state } = useStore()
const route = useRoute()
const router = useRouter()
const socket = io('https://9b65-156-204-20-156.eu.ngrok.io/')

let isLoading = $ref(false)
let error = $ref()
let bid = $ref()
let currBid = $ref(0)
let TOE = $ref('')
let status = $ref('')
let clock = $ref('')
let newPrice = $ref(0)

watchEffect(() => {
  if (bid) {
    bid?.bidsHistory.forEach((aBid) => {
      if (currBid < aBid.price) currBid = aBid.price
    })
  }
})

onMounted(async () => {
  isLoading = true
  let bidID = route.params.bidID
  if (!route.params.bidID) router.replace(`/${state.lang}/404`)

  socket.on('connect', () => {
    console.log(socket.id) // x8WIv7-mJelg7on_ALbx

    socket.emit('pageLoaded', bidID)

    socket.on('bidFound', (data) => {
      bid = data
      isLoading = false
      calcDiff()
      setInterval(calcDiff, 1000)
    })

    socket.on('bidNotFound', () => router.replace(`/${state.lang}/404`))
    socket.on('bidError', (err) => {
      error = err
    })
  })
})

onUnmounted(async () => {
  socket.close()
})

const joinBid = () => {
  let data = { newPrice, user: state.user._id, bidID: route.params.bidID }
  console.log(data)
  socket.emit('joinBid', data)
  newPrice = 0
}

// const getMinBiddingPrice = () => {

// }
const calcDiff = () => {
  let startDate = dayjs(bid?.startDate)
  let endDate = dayjs(bid?.endDate)
  let now = dayjs()
  let diff = ''
  let days
  let hours
  let mins
  let secs

  // FROM START

  days = startDate.diff(now, 'd', true)
  hours = (days % 1) * 24
  mins = (hours % 1) * 60
  secs = (mins % 1) * 60

  if (Math.floor(days) > 0)
    diff += Math.floor(days) + (state.lang === 'ar' ? 'ي ' : 'd ')
  if (Math.floor(hours) >= 0)
    diff += Math.floor(hours) + (state.lang === 'ar' ? 'س ' : 'h ')
  if (Math.floor(mins) >= 0)
    diff += Math.floor(mins) + (state.lang === 'ar' ? 'د ' : 'm ')
  if (Math.floor(secs) >= 0) {
    diff += Math.floor(secs) + (state.lang === 'ar' ? 'ث' : 's ')

    TOE = diff
    status = $t(text.soon)
    clock = $t(text.toLive)
    return
  }

  // TO END

  days = endDate.diff(now, 'd', true)
  hours = (days % 1) * 24
  mins = (hours % 1) * 60
  secs = (mins % 1) * 60

  diff = ''

  if (Math.floor(days) > 0)
    diff += Math.floor(days) + (state.lang === 'ar' ? 'ي ' : 'd ')
  if (Math.floor(hours) >= 0)
    diff += Math.floor(hours) + (state.lang === 'ar' ? 'س ' : 'h ')
  if (Math.floor(mins) >= 0)
    diff += Math.floor(mins) + (state.lang === 'ar' ? 'د ' : 'm ')
  if (Math.floor(secs) >= 0) {
    diff += Math.floor(secs) + (state.lang === 'ar' ? 'ث' : 's ')

    TOE = diff
    status = $t(text.live)
    clock = $t(text.left)
  } else {
    TOE = ''
    status = $t(text.expired)
    clock = ''
  }
}

const text = $ref({
  price: {
    ar: 'السعر المبدئي',
    en: 'Start Price',
  },
  joinBid: {
    ar: 'انضم للمزاد',
    en: 'Join Bid',
  },
  bidsMade: {
    ar: 'عدد المزايدات',
    en: 'Bids Made',
  },
  currBid: {
    ar: 'السعر الحالي',
    en: 'Current Bid',
  },
  report: {
    ar: 'الابلاغ عن المزاد!',
    en: 'Report This Bid!',
  },
  live: {
    ar: 'نشط',
    en: 'Live',
  },
  expired: {
    ar: 'انتهى',
    en: 'Expired',
  },
  left: {
    ar: 'متبقي',
    en: 'Left',
  },
  toLive: {
    ar: 'على النشاط',
    en: 'To Live',
  },
  soon: {
    ar: 'انتظار',
    en: 'Soon',
  },
})
</script>

<template>
  <UserLayout>
    <div class="-mt-6 grid bg-white shadow-sm sm:grid-cols-3" v-if="!isLoading">
      <div class="grid place-content-center bg-bi-200">
        <img
          v-if="bid?.item.images !== null"
          src="/images/monalisa-art.jpg"
          class="mx-auto my-auto h-[230px] w-[240px] object-cover"
        />
      </div>

      <div class="bg-bi-800 sm:col-span-2 sm:mt-8">
        <div class="p-4 pt-6 sm:pt-8">
          <BaseType
            :to="`/${state.lang}/bids/${bid?.item.type}`"
            class="mb-2 inline-block rounded-2xl bg-indigo-600 px-3 font-medium capitalize"
          >
            {{ getType(bid?.item.type) }}
          </BaseType>

          <h2
            class="overflow-hidden break-all text-lg font-semibold capitalize text-black md:text-[22px]"
          >
            {{ bid?.item.name }}
          </h2>

          <div class="my-2 flex flex-wrap items-center gap-2">
            <div class="flex items-center gap-2">
              <img src="/images/avatar.png" class="w-7 cursor-pointer" />
              <Router-Link
                to="#"
                class="inline-block cursor-pointer font-semibold text-bi-300 underline hover:text-bi-400"
              >
                {{ bid?.user?.name || 'mario' }}
              </Router-Link>
            </div>
          </div>

          <p class="mb-2 font-medium text-neutral-500">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam hic
            corporis, doloribus debitis maxime harum placeat itaque fugit culpa
            nihil sit est rerum molestias asperiores quam alias! Odit,
            exercitationem eveniet?
          </p>

          <div class="grid gap-x-5 gap-y-2 pt-3 sm:grid-cols-3">
            <div class="overflow-hidden rounded-md border-2 p-3">
              <h4 class="text-sm">{{ $t(text.bidsMade) }}</h4>
              <span class="text-xl font-bold">{{
                bid?.bidsHistory.length > 0
                  ? getNumPerLang(bid?.bidsHistory.length)
                  : '--'
              }}</span>
            </div>
            <div class="overflow-hidden rounded-md border-2 p-3">
              <h4 class="text-sm">{{ $t(text.price) }}</h4>
              <span class="text-xl font-bold">{{
                getPricePerLang(bid?.minPrice)
              }}</span>
            </div>
            <div class="overflow-hidden rounded-md border-2 p-3">
              <h4 class="text-sm">{{ $t(text.currBid) }}</h4>
              <span class="text-xl font-bold">{{
                currBid !== 0 ? getPricePerLang(currBid) : '--'
              }}</span>
            </div>
          </div>

          <BaseError v-if="error" class="mt-4">{{ error }}</BaseError>

          <div
            class="my-3 flex flex-col overflow-hidden rounded-md border border-gray-800"
          >
            <div
              class="flex w-full items-center justify-between bg-gray-800 px-3 py-2 text-white"
            >
              <h4 class="text-lg font-semibold">
                {{ status }}
                <span
                  class="relative mx-0.5 inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-red-700"
                  v-if="status === 'Live' || status === 'نشط'"
                />
              </h4>
              <div>
                {{ TOE }}
                &nbsp;
                <span class="text-lg font-semibold">{{ clock }}</span>
              </div>
            </div>
            <form
              v-if="status === 'Live' || status === 'نشط'"
              @submit.prevent="joinBid"
              class="grid border border-gray-800 md:grid-cols-4"
            >
              <input
                v-model="newPrice"
                type="number"
                placeholder="Your Price"
                class="bg-transparent p-3 font-semibold text-black focus:outline-none md:col-span-3"
                :min="parseFloat(currBid) + 1"
              />
              <BaseButton class="!w-full rounded-none border-none">
                {{ $t(text.joinBid) }}
              </BaseButton>
            </form>
          </div>

          <a
            href="#"
            class="mt-8 flex justify-end font-semibold text-bi-300 underline hover:text-bi-400"
            >{{ $t(text.report) }}</a
          >
        </div>
      </div>
    </div>
  </UserLayout>
</template>
