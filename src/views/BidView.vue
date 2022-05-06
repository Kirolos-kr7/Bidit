<script setup>
import { useStore } from '../store'
import {
  getType,
  getStatus,
  getPricePerLang,
  getNumPerLang,
  $t,
} from '../functions'
import { onMounted, onUnmounted, watchEffect } from 'vue'
import BaseButton from '../components/Base/BaseButton.vue'
import BaseType from '../components/Base/BaseType.vue'
import { io } from 'socket.io-client'
import dayjs from 'dayjs'
import UserLayout from '../components/UserLayout.vue'
import { useRoute, useRouter } from 'vue-router'
import BaseError from '../components/Base/BaseError.vue'
import ImgSelector from '../components/ImgSelector.vue'

const { $state: state } = useStore()
const route = useRoute()
const router = useRouter()
const socket = io(state.BASE_URL)

let isLoading = $ref(false)
let error = $ref()
let bid = $ref()
let currBid = $ref({ price: 0, user: null })
let newPrice = $ref(0)
let TOE = $ref('')
let status = $ref('')
let clock = $ref('')
let bidID = route.params.bidID

watchEffect(() => {
  if (bid) {
    if (bid?.bidsHistory.length === 0) {
      newPrice = bid.minPrice + 1
      currBid = { user: null, price: bid.minPrice }
    } else
      bid?.bidsHistory.forEach((aBid) => {
        if (currBid.price < aBid.price) {
          currBid = aBid
          newPrice = currBid.price + 1
        }
      })
  }
})

onMounted(async () => {
  isLoading = true

  if (!route.params.bidID) router.replace(`/${state.lang}/404`)

  socket.on('connect', () => {
    console.log(socket.id)

    socket.emit('pageLoaded', bidID, state.user._id)

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
  if (!state.isLoggedIn || !state.user)
    return router.push({
      name: `login`,
      query: { ref: 'login_to_join' },
    })

  let data = { newPrice, userID: state.user._id, bidID: route.params.bidID }
  socket.emit('joinBid', data)
}

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
    status = 'soon'
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
    status = 'active'
    clock = $t(text.left)
  } else {
    TOE = ''
    status = 'expired'
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
  left: {
    ar: 'متبقي',
    en: 'Left',
  },
  toLive: {
    ar: 'على النشاط',
    en: 'To Live',
  },
  youAreTheHeighstBidder: {
    ar: 'حالياً انت اعلى مزايد.',
    en: 'Currently You Are the Heighst bidder.',
  },
  youWonTheBid: {
    ar: 'مبروك. لقد ربحت المزاد.',
    en: ' Congratulations. You Won This Bid.',
  },
})
</script>

<template>
  <UserLayout>
    <div
      class="grid overflow-hidden rounded-md bg-white shadow-sm sm:grid-cols-2"
      v-if="!isLoading"
    >
      <div>
        <ImgSelector
          v-if="bid?.item?.images"
          :imgs="bid?.item?.images"
          class="mx-auto block md:p-6"
        />
      </div>

      <div class="bg-bi-800">
        <div class="p-4 md:p-6">
          <BaseType
            :to="`/${state.lang}/bids/${bid?.item.type}`"
            class="mb-2 inline-block rounded-2xl bg-indigo-600 px-3 font-medium capitalize"
          >
            {{ getType(bid?.item.type) }}
          </BaseType>

          <h2
            class="overflow-hidden break-all text-xl font-semibold capitalize text-black md:text-[22px]"
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
                {{ bid?.user?.name || 'N/F' }}
              </Router-Link>
            </div>
          </div>

          <p class="mb-2 font-medium text-neutral-500">
            {{ bid?.item?.description || 'N/F' }}
          </p>

          <div
            class="grid gap-x-5 gap-y-2 break-words pt-3"
            :class="status !== 'soon' ? 'md:grid-cols-3' : ''"
          >
            <div
              class="overflow-hidden rounded-md border-2 p-3"
              v-if="status !== 'soon'"
            >
              <h4 class="text-sm text-gray-600">{{ $t(text.bidsMade) }}</h4>
              <div class="flex items-end gap-1">
                <h5 class="text-3xl font-bold">
                  {{ getNumPerLang(bid?.bidsHistory.length) }}
                </h5>
                <span class="mb-0.5 text-sm">{{
                  state.lang === 'ar' ? 'مزايدات' : 'Bids'
                }}</span>
              </div>
            </div>
            <div class="overflow-hidden rounded-md border-2 p-3">
              <h4 class="text-sm text-gray-600">{{ $t(text.price) }}</h4>
              <div class="flex items-end gap-1">
                <h5 class="text-3xl font-bold">
                  {{ getPricePerLang(bid?.minPrice) }}
                </h5>
                <span class="mb-0.5 text-sm">{{
                  state.lang === 'ar' ? 'جنيه' : 'LE'
                }}</span>
              </div>
            </div>
            <div
              class="overflow-hidden rounded-md border-2 p-3"
              v-if="status !== 'soon'"
            >
              <h4 class="text-sm text-gray-600">{{ $t(text.currBid) }}</h4>
              <div class="flex items-end gap-1">
                <h5 class="text-3xl font-bold">
                  {{
                    getPricePerLang(
                      bid?.bidsHistory.length > 0 ? currBid.price : 0,
                    )
                  }}
                </h5>
                <span class="mb-0.5 text-sm">{{
                  state.lang === 'ar' ? 'جنيه' : 'LE'
                }}</span>
              </div>
            </div>
          </div>

          <BaseError v-if="error" class="mt-4">{{ error }}</BaseError>

          <div
            class="my-3 flex w-full items-center justify-between rounded-md bg-gray-800 px-3 py-2 text-white"
          >
            <h4 class="text-lg font-semibold capitalize">
              {{ getStatus(status) }}
              <span
                class="relative mx-0.5 inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-red-700"
                v-if="status === 'active'"
              />
            </h4>
            <div>
              {{ TOE }}
              &nbsp;
              <span class="text-lg font-semibold">{{ clock }}</span>
            </div>
          </div>

          <div
            class="my-3 flex w-full items-center justify-between rounded-md bg-gray-800 px-3 py-2 text-white"
            v-if="status === 'expired' && state?.user?._id === currBid.user"
          >
            {{ $t(text.youWonTheBid) }}
          </div>

          <div
            class="my-3 flex w-full items-center justify-between rounded-md bg-gray-800 px-3 py-2 text-white"
            v-if="status === 'active' && state?.user?._id === currBid.user"
          >
            {{ $t(text.youAreTheHeighstBidder) }}
          </div>

          <form
            v-if="
              status === 'active' &&
              bid?.user?._id !== state?.user?._id && // Creator is logged user
              currBid.user !== state?.user?._id // Heighst Bidder is logged user
            "
            class="flex items-center justify-between"
            @submit.prevent="joinBid"
          >
            <div class="flex w-min items-center rounded-md bg-gray-200">
              <BaseButton
                class="h-[40px] px-2.5"
                @click.prevent="
                  newPrice < currBid.price
                    ? (newPrice = currBid.price + 1)
                    : (newPrice += 1)
                "
              >
                <svg
                  class="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  ></path>
                </svg>
              </BaseButton>
              <input
                v-model="newPrice"
                type="number"
                placeholder="Your Price"
                class="h-[40px] w-24 bg-transparent text-center font-semibold text-black focus:outline-none md:col-span-3"
                style="-moz-appearance: textfield; -webkit-appearance: none"
                :min="currBid.price + 1"
              />
              <BaseButton
                class="h-[40px] px-2.5"
                @click.prevent="
                  newPrice > currBid.price + 1
                    ? (newPrice -= 1)
                    : (newPrice = currBid.price + 1)
                "
              >
                <svg
                  class="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M20 12H4"
                  ></path>
                </svg>
              </BaseButton>
            </div>

            <BaseButton>
              {{ $t(text.joinBid) }}
            </BaseButton>
          </form>

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

<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
