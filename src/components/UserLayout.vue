<script setup>
import Footer from '../components/Footer.vue'
import Navbar from '../components/Navbar.vue'
</script>

<template>
  <Navbar />
  <div class="mx-auto min-h-[70vh] pt-[5.5rem] lg:container">
    <slot />
  </div>
  <Footer />
</template>
