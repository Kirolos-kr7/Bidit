<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import PWAPrompt from './components/PWAPrompt.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <Navbar v-if="router.currentRoute.value.name !== 'home'" />
  <main class="container mx-auto min-h-[70vh] pt-[5.5rem]">
    <RouterView></RouterView>
  </main>
  <Footer />

  <PWAPrompt />
</template>
