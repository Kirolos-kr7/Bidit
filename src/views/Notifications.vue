<script setup>
import { onMounted } from 'vue'
import BaseTitle from '../components/Base/BaseTitle.vue'
import Notification from '../components/Notification.vue'
import { useAxios } from '../functions'
import UserLayout from '../components/UserLayout.vue'

let nts = $ref([])
onMounted(async () => {
  let { response } = await useAxios('get', '/auth/notifications')

  if (response.data.ok) nts = response.data.data
})

const text = $ref({
  title: {
    ar: 'الاشعارات',
    en: 'Notifications',
  },
})

const notificationSeen = (_id) => {
  nts.forEach((nt) => {
    if (nt._id === _id) nt.seen = true
  })
}
</script>

<template>
  <UserLayout>
    <div class="px-4">
      <BaseTitle>{{ $t(text.title) }}</BaseTitle>
      <div class="my-5 flex flex-col gap-5">
        <Notification
          v-for="(nt, index) in nts"
          :key="index"
          :notification="nt"
          @notificationSeen="notificationSeen"
        />
      </div>
    </div>
  </UserLayout>
</template>
