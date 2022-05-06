<script setup>
import BidCard from './BidCard.vue'
import BaseEmpty from './Base/BaseEmpty.vue'
import BaseLoader from './Base/BaseLoader.vue'

defineProps({
  bids: {
    type: Array,
    default: () => [],
  },
  isLoading: {
    type: Boolean,
    default: true,
    required: true,
  },
})
</script>

<template>
  <div v-if="!isLoading">
    <BaseEmpty
      v-if="bids.length === 0"
      :msg="{
        ar: 'للأسف, لا يوجد مزادات في الوقت الحالي.',
        en: 'Oops. No bids avalible now!',
      }"
    />
    <div class="mt-6 grid gap-3 md:grid-cols-2" v-else>
      <BidCard v-for="(bid, index) in bids" :key="index" :bid="bid" />
    </div>
  </div>
  <BaseLoader v-else />
</template>
