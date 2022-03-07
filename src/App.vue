<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import PWAPrompt from './components/PWAPrompt.vue'
</script>

<template>
  <Navbar />
  <main class="min-h-[70vh] px-4 pt-[5.5rem] md:px-8">
    <RouterView></RouterView>
  </main>
  <Footer />

  <PWAPrompt />
</template>
