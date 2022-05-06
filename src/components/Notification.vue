<script setup>
import dayjs from 'dayjs'
import 'dayjs/locale/ar'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { useStore } from '../store'
import { computed } from '@vue/reactivity'
import { useAxios } from '../functions'
import { onMounted, onUnmounted } from 'vue'

dayjs.extend(localizedFormat)
let { $state: state } = useStore()
let props = defineProps(['notification'])
let emits = defineEmits(['notificationSeen'])
let ntBody = $ref()

const localDate = computed(() => {
  return dayjs(props.notification.createdAt)
    .locale(state.lang)
    .format('ddd, D MMMM, YYYY | h:mm A')
})

const isInViewPort = () => {
  if (ntBody) {
    const rect = ntBody.getBoundingClientRect()

    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }
}

let scrollObserver = async () => {
  if (isInViewPort()) {
    let { response } = await useAxios(
      'patch',
      `/auth/notifications/seen/${props.notification._id}`,
    )

    if (response.data.ok) {
      emits('notificationSeen', props.notification._id)
      window.removeEventListener('scroll', scrollObserver())
    }
  }
}

onMounted(() => {
  if (!props.notification.seen) {
    // scrollObserver()
    // window.addEventListener('scroll', () => {
    //   scrollObserver()
    // })
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', scrollObserver())
})
</script>

<template>
  <div ref="ntBody" class="rounded-md bg-white p-4 text-black shadow-sm">
    <div class="flex items-center justify-between gap-3">
      <h2 class="text-2xl font-bold capitalize">
        {{ notification.title[state.lang] }}
      </h2>
      <span class="h-5 w-5 shrink-0 rounded-full bg-bi-200">
        <Transition name="fade">
          <svg
            v-if="notification.seen"
            class="h-full w-full"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </Transition>
      </span>
    </div>
    <span class="font-medium text-neutral-500">
      {{ localDate }}
    </span>
    <p class="mt-2 overflow-hidden">
      {{ notification.message[state.lang] }}
    </p>
    <RouterLink
      :to="`/${state.lang}${notification.redirect}`"
      v-if="notification.redirect"
      class="text-bi-300 transition-colors hover:text-bi-400/50"
      >{{ state.lang === 'ar' ? 'اضغط هنا' : 'Click Here' }}</RouterLink
    >
  </div>
</template>
