<script setup>
import { onMounted } from 'vue'
import BaseTitle from '../components/Base/BaseTitle.vue'
import Notification from '../components/Notification.vue'
import { useAxios } from '../functions'
import UserLayout from '../Layouts/UserLayout.vue'

let nts = $ref([])
onMounted(async () => {
  let { response } = await useAxios('get', '/auth/notifications')

  if (response.data.ok) nts = response.data.data
  console.log(response)
})

const text = $ref({
  title: {
    ar: 'الاشعارات',
    en: 'Notifications',
  },
})
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
        />
      </div>
    </div>
  </UserLayout>
</template>
