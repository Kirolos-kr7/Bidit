<script setup>
import BaseTitle from '../components/Base/BaseTitle.vue'
import Notification from '../components/Notification.vue'
import moment from 'moment'

let nts = $ref([
  {
    title: 'abc',
    message:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit soluta quasi architecto dicta alias, incidunt fugit impedit vitae! Provident in adipisci quaerat et asperiores quibusdam repellat perferendis, incidunt nisi doloremque.',
    createdAt: moment().format('LLLL'),
  },
  {
    title: 'abc',
    message:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit soluta quasi architecto dicta alias, incidunt fugit impedit vitae! Provident in adipisci quaerat et asperiores quibusdam repellat perferendis, incidunt nisi doloremque.',
    createdAt: moment().format('LLLL'),
  },
  {
    title: 'abc',
    message:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit soluta quasi architecto dicta alias, incidunt fugit impedit vitae! Provident in adipisci quaerat et asperiores quibusdam repellat perferendis, incidunt nisi doloremque.',
    createdAt: moment().format('LLLL'),
  },
  {
    title: 'abc',
    message:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit soluta quasi architecto dicta alias, incidunt fugit impedit vitae! Provident in adipisci quaerat et asperiores quibusdam repellat perferendis, incidunt nisi doloremque.',
    createdAt: moment().format('LLLL'),
  },
  {
    title: 'abc',
    message:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit soluta quasi architecto dicta alias, incidunt fugit impedit vitae! Provident in adipisci quaerat et asperiores quibusdam repellat perferendis, incidunt nisi doloremque.',
    createdAt: moment().format('LLLL'),
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
  <BaseTitle>{{ $t(text.title) }}</BaseTitle>
  <div class="my-5 flex flex-col gap-5">
    <Notification v-for="(nt, index) in nts" :key="index" :notification="nt" />
  </div>
</template>
