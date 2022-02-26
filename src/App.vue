<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <Navbar />
  <main class="min-h-[70vh] px-4 pt-32 md:px-8">
    <RouterView></RouterView>
  </main>
  <Footer />
</template>
