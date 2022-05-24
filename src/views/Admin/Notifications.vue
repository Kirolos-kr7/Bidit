<script setup>
import BaseTable from '../../components/Base/BaseTable.vue'
import AdminLayout from '../../components/AdminLayout.vue'
import BaseTitle from '../../components/Base/BaseTitle.vue'
import BaseDialog from '../../components/Base/BaseDialog.vue'
import BaseTextArea from '../../components/Base/BaseTextArea.vue'
import BaseInput from '../../components/Base/BaseInput.vue'
import BaseButton from '../../components/Base/BaseButton.vue'
import { useAxios } from '../../functions'
import BaseError from '../../components/Base/BaseError.vue'
import { onMounted } from 'vue'
import { computed } from '@vue/reactivity'
import Notification from '../../components/Notification.vue'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(localizedFormat)

let data = $ref([])

onMounted(async () => {
  let { response } = await useAxios('get', '/admin/notifications')
  if (response.data.ok) {
    data = response.data.data
  }
})

let formatedData = computed(() => {
  return data.map((x) => {
    return {
      ...x,
      title: x.title.en,
      message: x.message.en,
      createdAt: dayjs(x.createdAt).format('ddd, D MMMM, YYYY | hh:mm'),
    }
  })
})

let constraint = $ref('title')
let direction = $ref('asc')
let selectedNt = $ref({})
let broadcastDialog = $ref(false)
let viewDialog = $ref(false)
let error = $ref('')
let titleAr = $ref('')
let titleEn = $ref('')
let messageAr = $ref('')
let messageEn = $ref('')
let redirect = $ref('')

const sortBy = (value, dir) => {
  constraint = value
  direction = dir
}

const open = (value) => {
  viewDialog = true
  data.forEach((x) => {
    if (x._id === value._id) selectedNt = x
  })
}

const resetDialog = () => {
  viewDialog = false
  broadcastDialog = false
}

const broadcast = async () => {
  let nt = {
    title: {
      ar: titleAr,
      en: titleEn,
    },
    message: {
      ar: messageAr,
      en: messageEn,
    },
    redirect,
  }

  let { response } = await useAxios('post', '/admin/broadcast', nt)
  if (response.data.ok) {
    broadcastDialog = false
    error = ''
    titleAr = ''
    titleEn = ''
    messageAr = ''
    messageEn = ''
    redirect = ''
  } else {
    error = response.data.message
  }
}
</script>

<template>
  <AdminLayout>
    <div class="flex items-start justify-between">
      <h1 class="mb-5 font-merriweather text-3xl font-extrabold">
        Notifications
      </h1>
      <BaseButton @click="broadcastDialog = true">Broadcast</BaseButton>
    </div>
    <BaseTable
      :columns="['Title', 'Date', 'Message']"
      :values="['title', 'createdAt', 'message']"
      :layout="['auto', 'auto', '60%']"
      :data="formatedData"
      :constraint="constraint"
      :direction="direction"
      :actions="{ open: true, edit: false, remove: false }"
      @sortBy="sortBy"
      @open="open"
    />
  </AdminLayout>

  <transition name="fade">
    <BaseDialog v-if="broadcastDialog || viewDialog" @click="resetDialog()">
    </BaseDialog>
  </transition>
  <transition name="zoom">
    <div
      class="border-bi-600 fixed top-1/2 left-1/2 z-30 max-h-[85vh] w-full max-w-prose origin-top-left -translate-x-1/2 -translate-y-1/2 scale-100 overflow-auto rounded-md border bg-white p-5 font-medium text-black md:min-w-prose"
      v-if="broadcastDialog"
    >
      <BaseTitle> Broadcast Notifications</BaseTitle>
      <form @submit.prevent="broadcast" class="mt-5 grid gap-5">
        <BaseInput
          type="text"
          class="!w-full"
          placeholder="Title En"
          v-model="titleEn"
          @updateInput="(val) => (titleEn = val)"
        />
        <BaseTextArea
          rows="8"
          type="text"
          class="col-span-2 !w-full"
          placeholder="Message EN"
          v-model="messageEn"
          @updateInput="(val) => (messageEn = val)"
        />
        <BaseInput
          type="text"
          class="!w-full"
          placeholder="Title Ar"
          v-model="titleAr"
          @updateInput="(val) => (titleAr = val)"
        /><BaseTextArea
          rows="8"
          type="text"
          class="col-span-2 !w-full"
          placeholder="Message Ar"
          v-model="messageAr"
          @updateInput="(val) => (messageAr = val)"
        />
        <BaseInput
          type="text"
          class="!w-full"
          placeholder="Redirect"
          v-model="redirect"
          @updateInput="(val) => (redirect = val)"
        />
        <BaseError v-if="error">{{ error }}</BaseError>
        <BaseButton>Send Message</BaseButton>
      </form>
    </div>
  </transition>

  <transition name="zoom">
    <div
      class="border-bi-600 fixed top-1/2 left-1/2 z-30 max-h-[85vh] w-full max-w-prose origin-top-left -translate-x-1/2 -translate-y-1/2 scale-100 overflow-auto rounded-md border bg-white font-medium text-black md:min-w-prose"
      v-if="viewDialog"
    >
      <Notification :notification="selectedNt"></Notification>
    </div>
  </transition>
</template>
