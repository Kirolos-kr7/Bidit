<script setup>
import BaseTitle from '../components/Base/BaseTitle.vue'
import { onMounted } from 'vue'
import { useAxios } from '../functions'
import { useRouter } from 'vue-router'
import { useStore } from '../store'
import BaseLoader from '../components/Base/BaseLoader.vue'
import OrderCard from '../components/OrderCard.vue'
import BaseButton from '../components/Base/BaseButton.vue'
import BaseDialog from '../components/Base/BaseDialog.vue'
import CheckoutDialog from '../components/CheckoutDialog.vue'

let order = $ref(null)
let isLoading = $ref(false)
let router = useRouter()
let checkoutDialog = $ref(false)
let { $state: state } = useStore()

onMounted(async () => {
  isLoading = true
  let orderID = router.currentRoute.value.params.id
  if (orderID.length !== 24) router.replace(`/${state.lang}/404`)

  let { response } = await useAxios('get', `/order/${orderID}`)
  if (response.data.ok) order = response.data.data
  else router.replace(`/${state.lang}/404`)
  isLoading = false
})

const text = $ref({
  title: {
    ar: 'طلب',
    en: 'Order',
  },
  completeOrder: {
    ar: 'اكمل الطلب',
    en: 'Complete Order',
  },
})
</script>

<template>
  <div class="px-5">
    <BaseTitle
      >{{ $t(text.title) }}
      <span class="text-base font-medium">
        {{ order?._id ? '#' + order?._id : null }}</span
      >
    </BaseTitle>

    <div class="mt-6">
      <BaseLoader v-if="isLoading" />

      <OrderCard :order="order" v-if="order && !isLoading" />
      <div
        class="col-span-2 mt-2 flex justify-end"
        v-if="state?.user?._id === order?.bidder"
      >
        <BaseButton
          v-if="order?.status === 'pending'"
          class="w-auto shadow-md"
          @click="checkoutDialog = true"
          >{{ $t(text.completeOrder) }}</BaseButton
        >
      </div>
    </div>
  </div>

  <transition name="fade">
    <BaseDialog v-if="checkoutDialog" @click="checkoutDialog = false">
    </BaseDialog>
  </transition>

  <transition name="zoom">
    <CheckoutDialog v-if="checkoutDialog" :order="order" />
  </transition>
</template>
