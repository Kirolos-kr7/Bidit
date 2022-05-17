<script setup>
import { onMounted } from 'vue'
import BaseTitle from '../components/Base/BaseTitle.vue'
import UserLayout from '../components/UserLayout.vue'
import { useAxios } from '../functions'
import OrderCard from '../components/OrderCard.vue'
import { useStore } from '../store'
let { $state: state } = useStore()
let orders = $ref([])

onMounted(async () => {
  let { response } = await useAxios('get', '/order/user')

  if (response.data.ok) orders = response.data.data
})

const text = $ref({
  title: {
    ar: 'الطلبات',
    en: 'Orders',
  },
})
</script>

<template>
  <UserLayout>
    <div class="px-5">
      <BaseTitle>{{ $t(text.title) }}</BaseTitle>
      <div class="mt-6 grid gap-3 md:grid-cols-2">
        <template v-for="order in orders" :key="order._id">
          <router-link :to="`/${state.lang}/account/order/${order._id}`">
            <OrderCard :order="order" />
          </router-link>
        </template>
      </div>
    </div>
  </UserLayout>
</template>
