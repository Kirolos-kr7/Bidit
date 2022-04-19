<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import PWAPrompt from './components/PWAPrompt.vue'
import { useRouter } from 'vue-router'
import { useStore } from './store'
import { onMounted } from 'vue'

const { $state: state } = useStore()
const router = useRouter()

onMounted(() => {
  google.accounts.id.initialize({
    client_id:
      '93523739734-gm8s6ba175gn6ad2h7ioapcvrnbq7k6p.apps.googleusercontent.com',
    callback: (res) => {
      console.log(res)
    },
  })
  google.accounts.id.prompt()
})
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
