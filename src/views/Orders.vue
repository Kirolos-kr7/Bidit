<script setup>
import { onMounted } from 'vue'
import BaseTitle from '../components/Base/BaseTitle.vue'
import UserLayout from '../components/UserLayout.vue'
import { useAxios, getOrderStatus } from '../functions'
import { useStore } from '../store'
import dayjs from 'dayjs'
import 'dayjs/locale/ar'
import localizedFormat from 'dayjs/plugin/localizedFormat'

let orders = $ref([])
let { $state: state } = useStore()

onMounted(async () => {
  let { response } = await useAxios('get', '/order/user')

  if (response.data.ok) orders = response.data.data
})

const text = $ref({
  title: {
    ar: 'الطلبات',
    en: 'Orders',
  },
  orderId: {
    ar: 'رقم الطلب',
    en: 'Order id',
  },
  status: {
    ar: 'الحالة',
    en: 'Status',
  },
  pickupTime: {
    ar: 'موعد الالتقاط',
    en: 'Pickup Time',
  },
  pickupAddress: {
    ar: 'مكان الالتقاط',
    en: 'Pickup Address',
  },
  arrivalTime: {
    ar: 'موعد الوصول',
    en: 'Arrival Time',
  },
  arrivalAddress: {
    ar: 'مكان الوصول',
    en: 'Arrival Address',
  },
  totalPrice: {
    ar: 'السعر الكلي',
    en: 'Total Price',
  },
  paymentMethod: {
    ar: 'طريقة الدفع',
    en: 'Payment Method',
  },
  price: {
    ar: 'السعر',
    en: 'Price',
  },
})
</script>

<template>
  <UserLayout>
    <div class="px-5">
      <BaseTitle>{{ $t(text.title) }}</BaseTitle>
      <div class="mt-6 grid gap-3 md:grid-cols-2">
        <div
          v-for="order in orders"
          :key="order._id"
          class="relative grid gap-x-5 gap-y-0.5 overflow-hidden rounded-md bg-white p-3 capitalize shadow-md md:grid-cols-[auto,1fr]"
        >
          <div class="font-semibold">
            {{ $t(text.orderId) }}
          </div>
          <span>{{ order._id }}</span>
          <div class="font-semibold" v-if="order.auctioneer === state.user._id">
            {{ $t(text.pickupAddress) }}
          </div>
          <span v-if="order.auctioneer === state.user._id">{{
            order.pickupAddress || 'N/F'
          }}</span>
          <div class="font-semibold" v-if="order.bidder === state.user._id">
            {{ $t(text.arrivalAddress) }}
          </div>
          <span v-if="order.bidder === state.user._id">{{
            order.arrivalAddress || 'N/F'
          }}</span>
          <div class="font-semibold" v-if="order.auctioneer === state.user._id">
            {{ $t(text.pickupTime) }}
          </div>
          <span v-if="order.auctioneer === state.user._id">{{
            dayjs(order.pickupTime)
              .locale(state.lang)
              .format('ddd, D MMMM, YYYY') || 'N/F'
          }}</span>
          <div class="font-semibold" v-if="order.bidder === state.user._id">
            {{ $t(text.arrivalTime) }}
          </div>
          <span v-if="order.bidder === state.user._id">{{
            dayjs(order.arrivalTime)
              .locale(state.lang)
              .format('ddd, D MMMM, YYYY') || 'N/F'
          }}</span>
          <div class="font-semibold">
            {{ $t(text.status) }}
          </div>
          <span>{{ getOrderStatus(order.status) }}</span>
          <div class="font-semibold" v-if="order.bidder === state.user._id">
            {{ $t(text.totalPrice) }}
          </div>
          <span v-if="order.bidder === state.user._id">{{
            order.price + order.shipping || 'N/F'
          }}</span>
          <div class="font-semibold" v-if="order.bidder === state.user._id">
            {{ $t(text.paymentMethod) }}
          </div>
          <span v-if="order.bidder === state.user._id">{{
            order.paymentMethod || 'N/F'
          }}</span>
          <div class="font-semibold">
            {{ $t(text.price) }}
          </div>
          <span>{{ order.price || 'N/F' }}</span>
        </div>
      </div>
    </div>
  </UserLayout>
</template>
