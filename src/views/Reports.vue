<script setup>
import UserLayout from '../components/UserLayout.vue'
import BaseInfo from '../components/Base/BaseInfo.vue'
import BaseDialog from '../components/Base/BaseDialog.vue'
import BaseTitle from '../components/Base/BaseTitle.vue'
import BaseInput from '../components/Base/BaseInput.vue'
import BaseTextArea from '../components/Base/BaseTextArea.vue'
import BaseButton from '../components/Base/BaseButton.vue'

let reportsDialog = $ref(false),
  itemName = $ref(''),
  itemDesc = $ref('')

const text = $ref({
  title: {
    ar: 'البلاغات',
    en: 'Reports',
  },
  reportId: {
    ar: 'رقم الابلاغ : ',
    en: 'Report id :',
  },
  type: {
    ar: 'النوع : ',
    en: 'Type : ',
  },
  description: {
    ar: 'الوصف : ',
    en: 'Description : ',
  },
  // newReport: {
  //   ar: 'ابلاغ جديد',
  //   en: 'New Report',
  // },
  // typePlaceholder: {
  //   ar: 'النوع',
  //   en: 'Type',
  // },
  // descriptionPlaceholder: {
  //   ar: 'الوصف',
  //   en: 'Description',
  // },
  // addReport: {
  //   ar: 'أضافه ابلاغ',
  //   en: 'Add Report',
  // },
})

</script>

<template>
  <UserLayout>
    <div class="px-4">
      <div class="flex flex-wrap items-start justify-between gap-x-10 gap-y-3">
        <BaseTitle
          >{{ $t(text.title) }}
          <BaseInfo>{{ $t(text.info) }} </BaseInfo></BaseTitle
        >
      </div>
    </div>

    <div class="mt-6 grid gap-3 md:grid-cols-2">
        <div class="relative overflow-hidden rounded-md bg-white shadow-md">
            <p class="my-2 ml-2 text-lg font-semibold capitalize text-black">{{ $t(text.reportId) }}</p>
            <p class="my-2 ml-2 text-lg font-semibold capitalize text-black">{{ $t(text.type) }}</p>
            <p class="my-2 ml-2 text-lg font-semibold capitalize text-black">{{ $t(text.description) }}</p>
        </div>
    </div>

    <!-- <transition name="fade">
      <BaseDialog
        v-if="reportsDialog"
        @click="reportsDialog = false"
      >
      </BaseDialog>
    </transition>

     <transition name="zoom">
      <div
        class="border-bi-600 fixed top-1/2 left-1/2 z-30 max-h-[85vh] w-full max-w-prose origin-top-left -translate-x-1/2 -translate-y-1/2 scale-100 overflow-auto rounded-md border bg-white p-5 font-medium text-black md:min-w-prose"
        v-if="reportsDialog"
      >
      <BaseTitle>
          {{ $t(text.newReport) }}</BaseTitle
      > 
      <form @submit.prevent="" class="mt-5 grid gap-5">
        <BaseInput
          type="text"
          class="!w-full"
          :placeholder="$t(text.typePlaceholder)"
          v-model="itemName"
          @updateInput="(val) => (itemName = val)"
        />
        <BaseTextArea
          rows="8"
          type="text"
          class="col-span-2 !w-full"
          :placeholder="$t(text.descriptionPlaceholder)"
          v-model="itemDesc"
          @updateInput="(val) => (itemDesc = val)"
        />
        <BaseButton @click="reportsDialog = true"
          >{{ $t(text.addReport) }}
        </BaseButton>
         
      </form>
      </div>
    </transition> -->

    

  </UserLayout>
</template>