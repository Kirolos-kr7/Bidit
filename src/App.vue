<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import PWAPrompt from './components/PWAPrompt.vue'
import { useRouter } from 'vue-router'
import { useStore } from './store'

const { $state: state } = useStore()
const router = useRouter()
</script>

<template>
  <!-- <transition name="fade">
    <div
      class="flex min-h-screen items-center justify-center"
      v-if="!state.isLoaded"
    >
      <img src="/images/Loader.gif" class="-mt-12 w-[300px]" alt="loader" />
    </div>
  </transition> -->

  <Navbar />
  <main class="mx-auto min-h-[70vh] pt-[5.5rem] lg:container">
    <RouterView></RouterView>
  </main>
  <Footer />

  <PWAPrompt />
</template>
