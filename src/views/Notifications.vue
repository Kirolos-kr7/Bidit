<script setup>
import BaseTitle from '../components/Base/BaseTitle.vue'
import Notification from '../components/Notification.vue'
import UserLayout from '../Layouts/UserLayout.vue'

let nts = $ref([
  {
    title: 'abc',
    message:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit soluta quasi architecto dicta alias, incidunt fugit impedit vitae! Provident in adipisci quaerat et asperiores quibusdam repellat perferendis, incidunt nisi doloremque.',
    createdAt: new Date(),
  },
  {
    title: 'abc',
    message:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit soluta quasi architecto dicta alias, incidunt fugit impedit vitae! Provident in adipisci quaerat et asperiores quibusdam repellat perferendis, incidunt nisi doloremque.',
    createdAt: new Date(),
  },
  {
    title: 'abc',
    message:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit soluta quasi architecto dicta alias, incidunt fugit impedit vitae! Provident in adipisci quaerat et asperiores quibusdam repellat perferendis, incidunt nisi doloremque.',
    createdAt: new Date(),
  },
  {
    title: 'abc',
    message:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit soluta quasi architecto dicta alias, incidunt fugit impedit vitae! Provident in adipisci quaerat et asperiores quibusdam repellat perferendis, incidunt nisi doloremque.',
    createdAt: new Date(),
  },
  {
    title: 'abc',
    message:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit soluta quasi architecto dicta alias, incidunt fugit impedit vitae! Provident in adipisci quaerat et asperiores quibusdam repellat perferendis, incidunt nisi doloremque.',
    createdAt: new Date(),
  },
])

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
