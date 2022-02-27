<script setup>
import { computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { $t } from '../functions'
import BaseTitle from '../components/Base/BaseTitle.vue'
import { useStore } from '../store'

const route = useRoute()
const router = useRouter()
let title = $ref()
const { $state: state } = useStore()

const cats = () => {
  if (route.name === 'bids categories') {
    const category = route.params.cat.toLowerCase()
    let isFound = false
    text.categories.forEach((cat) => {
      if (cat.en.toLowerCase() === category) {
        isFound = true
        title = cat
      }
    })

    if (!isFound) router.push(`/${state.lang}/404`)
  }
}

onMounted(cats)

watch(route, cats)

const text = $ref({
  categories: [
    {
      ar: 'تحف',
      en: 'Antiques',
    },
    {
      ar: 'فن',
      en: 'Art',
    },
  ],
})
</script>

<template>
  <BaseTitle class="capitalize" v-if="title">{{ $t(title) }}</BaseTitle>
</template>
