<script setup>
import { useRegisterSW } from 'virtual:pwa-register/vue'
import BaseButton from './Base/BaseButton.vue'

const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW()

const close = async () => {
  offlineReady.value = false
  needRefresh.value = false
}
</script>

<template>
  <div
    v-if="offlineReady || needRefresh"
    class="fixed bottom-3 left-1/2 z-50 w-full max-w-prose -translate-x-1/2 rounded-xl bg-bi-600 p-3 md:left-auto md:right-3 md:-translate-x-0"
    role="alert"
  >
    <div class="message">
      <span v-if="offlineReady"> App ready to work offline </span>
      <span v-else>
        New content available, click on reload button to update.
      </span>
    </div>
    <div class="flex justify-end gap-2">
      <BaseButton class="mt-2" @click="updateServiceWorker()" v-if="needRefresh"
        >Reload</BaseButton
      >
      <BaseButton class="mt-2" @click="close">Close</BaseButton>
    </div>
  </div>
</template>
