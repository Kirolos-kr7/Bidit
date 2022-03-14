<script setup>
import BaseTitle from './Base/BaseTitle.vue'
import BaseInput from './Base/BaseInput.vue'
import BaseButton from './Base/BaseButton.vue'
import { useStore } from '../store'
import { getType } from '../functions'

const { $state: state } = useStore()

defineEmits(['resetDialog'])
defineProps(['item'])

let startDate = $ref('')
let endDate = $ref('')
let minPrice = $ref(0)

const text = $ref({
  title: {
    ar: 'مزاد جديد',
    en: 'New Bid',
  },
  startDatePlaceholder: {
    ar: 'تاريخ البدء',
    en: 'Start Date',
  },
  endDatePlaceholder: {
    ar: 'تاريخ الانتهاء',
    en: 'End Date',
  },
  minPricePlaceholder: {
    ar: 'السعر المبدئي',
    en: 'Start Price',
  },
  startBid: {
    ar: 'بدء المزاد',
    en: 'Start Bid',
  },
})
</script>

<template>
  <div
    class="fixed top-1/2 left-1/2 z-30 max-h-[85vh] w-full max-w-prose origin-top-left -translate-x-1/2 -translate-y-1/2 scale-100 overflow-auto rounded-md border border-bi-600 bg-bi-900 p-5 md:min-w-prose"
  >
    <BaseTitle>{{ $t(text.title) }}</BaseTitle>
    <form @submit.prevent="" class="mt-5 grid gap-5">
      <div
        class="grid grid-cols-[4.5rem,1fr] overflow-hidden rounded-sm border border-bi-600"
      >
        <img src="/images/monalisa-art.jpg" class="h-full object-cover" />
        <div class="p-3">
          <h2
            class="overflow-hidden break-all font-semibold capitalize md:text-xl"
          >
            {{ item.name }}
          </h2>
        </div>
      </div>

      <BaseInput
        type="datetime-local"
        class="!w-full"
        :placeholder="$t(text.startDatePlaceholder)"
        v-model="startDate"
        @updateInput="(val) => (startDate = val)"
      />
      <BaseInput
        type="datetime-local"
        class="!w-full"
        :placeholder="$t(text.endDatePlaceholder)"
        v-model="endDate"
        @updateInput="(val) => (endDate = val)"
      />
      <BaseInput
        type="number"
        class="!w-full"
        :placeholder="$t(text.minPricePlaceholder)"
        v-model="minPrice"
        @updateInput="(val) => (minPrice = val)"
      />
      <BaseButton @click="$emit('resetDialog')">{{
        $t(text.startBid)
      }}</BaseButton>
    </form>
  </div>
</template>
