<script setup>
import axios from 'axios'
import { onMounted } from 'vue'
import BaseTitle from '../components/Base/BaseTitle.vue'
import UserLayout from '../components/UserLayout.vue'
import BaseButton from '../components/Base/BaseButton.vue'

let authToken = $ref('')
let orderToken = $ref('')
let orderID = $ref('')
let paymentToken = $ref('')
let paymentLink = $ref('')

onMounted(async () => {
  let response = await axios({
    method: 'post',
    url: 'https://accept.paymob.com/api/auth/tokens',
    data: {
      api_key:
        'ZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6VXhNaUo5LmV5SnVZVzFsSWpvaWFXNXBkR2xoYkNJc0luQnliMlpwYkdWZmNHc2lPakUzTXpreE55d2lZMnhoYzNNaU9pSk5aWEpqYUdGdWRDSjkuYUZZWnJWRVp2NnczdlRXSDN2LS1pSjlRSUdNenVEZ3drYlVReTh5enRzUDlqQmE1bzRRb240QkpLdFItNmJOdzJIZG1jUWRnaEFnbVZURFBsTDZBdEE=',
    },
  })

  console.log(response)
  authToken = response.data.token
})

const sendOrder = async () => {
  let body = {
    auth_token: authToken,
    delivery_needed: 'false',
    amount_cents: '500',
    currency: 'EGP',
    // merchant_order_id: 4,
    items: [
      {
        name: 'Australian COW',
        amount_cents: '500',
        description: '900k Australian COW',
        quantity: '1',
      },
    ],
  }

  let response = await axios({
    method: 'post',
    url: 'https://accept.paymob.com/api/ecommerce/orders',
    data: body,
  })

  console.log(response)
  orderToken = response.data.token
  orderID = response.data.id
}

const makePayment = async () => {
  let body = {
    auth_token: authToken,
    amount_cents: '500',
    expiration: 3600,
    order_id: orderID,
    billing_data: {
      email: 'claudette09@exa.com',
      first_name: 'Clifford',
      phone_number: '+86(8)9135210487',
      last_name: 'Nicolas',
      apartment: 'NA',
      floor: 'NA',
      street: 'NA',
      building: 'NA',
      shipping_method: 'NA',
      postal_code: 'NA',
      city: 'NA',
      country: 'NA',
      state: 'NA',
    },
    currency: 'EGP',
    integration_id: 2062140,
    lock_order_when_paid: 'true',
  }

  try {
    let response = await axios({
      method: 'post',
      url: `https://accept.paymob.com/api/acceptance/payment_keys`,
      data: body,
    })

    console.log(response)
    paymentToken = response.data.token
    paymentLink = `https://accept.paymobsolutions.com/api/acceptance/iframes/381359?payment_token=${paymentToken}`
  } catch (err) {
    console.log(err)
  }
}
</script>

<template>
  <UserLayout>
    <div class="px-5">
      <BaseTitle>Checkout</BaseTitle>
      <BaseButton @click="sendOrder">Send Order</BaseButton>
      <BaseButton @click="makePayment">Make Payment</BaseButton>
    </div>

    <div v-if="paymentLink">
      {{ paymentLink }}
    </div>
  </UserLayout>
</template>
