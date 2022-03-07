<script setup>
import { useRegisterSW } from 'virtual:pwa-register/vue'
import BaseButton from './Base/BaseButton.vue'
import { useStore } from '../store'
const { $state: state } = $(useStore())

const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW()

const close = async () => {
  offlineReady.value = false
  needRefresh.value = false
}

const text = $ref({
  offline: {
    ar: 'التطبيق جاهز للعمل بدون اتصال انترنت',
    en: 'App ready to work offline',
  },
  update: {
    ar: 'اضغط زر اعادة التحميل للتحديث.',
    en: 'Click on reload button to update.',
  },
  reload: {
    ar: 'اعادة التحميل',
    en: 'Reload',
  },
  close: {
    ar: 'اغلاق',
    en: 'Close',
  },
})
</script>

<template>
  <transition name="zoom">
    <div
      v-if="offlineReady || needRefresh"
      class="fixed bottom-3 left-1/2 z-50 w-full max-w-prose -translate-x-1/2 rounded-xl bg-bi-600 p-3 md:-translate-x-0"
      :class="
        state.lang === 'ar'
          ? 'md:left-auto md:right-3'
          : 'md:right-auto md:left-3'
      "
      role="alert"
    >
      <div class="message">
        <span v-if="offlineReady"> {{ $t(text.offline) }} </span>
        <span v-else>
          {{ $t(text.update) }}
        </span>
      </div>
      <div class="flex justify-end gap-2">
        <BaseButton
          class="mt-2"
          @click="updateServiceWorker()"
          v-if="needRefresh"
        >
          {{ $t(text.reload) }}</BaseButton
        >
        <BaseButton class="mt-2" @click="close">
          {{ $t(text.close) }}</BaseButton
        >
      </div>
    </div>
  </transition>
</template>
