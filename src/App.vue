<script setup>
import PWAPrompt from './components/PWAPrompt.vue'
import AppLoader from './components/AppLoader.vue'

import { watchEffect } from 'vue'
import { useRouter } from 'vue-router'
// import { useCookies } from 'vue3-cookies'
// const { cookies } = useCookies()

let isLoading = $ref(true)
let router = useRouter()

watchEffect(() => {
  if (isLoading) document.body && (document.body.style.overflow = 'hidden')
  else document.body && (document.body.style.overflow = 'auto')
})

router.isReady().then(() => {
  isLoading = false
})

// onMounted(() => {
// let isLoggedIn = cookies.get('isLoggedIn')
// if (!isLoggedIn) {
//   google.accounts.id.initialize({
//     client_id:
//       '93523739734-gm8s6ba175gn6ad2h7ioapcvrnbq7k6p.apps.googleusercontent.com',
//     callback: (res) => {
//       console.log(res)
//     },
//   })
//   google.accounts.id.prompt()
// }
// })
</script>

<template>
  <AppLoader v-if="isLoading" />
  <main><RouterView></RouterView></main>

  <PWAPrompt />
</template>
