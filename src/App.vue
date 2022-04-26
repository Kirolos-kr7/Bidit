<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import PWAPrompt from './components/PWAPrompt.vue'
import { onMounted } from 'vue'
import { useCookies } from 'vue3-cookies'

const { cookies } = useCookies()

onMounted(() => {
  let isLoggedIn = cookies.get('isLoggedIn')

  if (!isLoggedIn) {
    google.accounts.id.initialize({
      client_id:
        '93523739734-gm8s6ba175gn6ad2h7ioapcvrnbq7k6p.apps.googleusercontent.com',
      callback: (res) => {
        console.log(res)
      },
    })
    google.accounts.id.prompt()
  }
})
</script>

<template>
  <main>
    <RouterView></RouterView>
  </main>

  <PWAPrompt />
</template>
