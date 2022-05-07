<script setup>
import { computed } from '@vue/reactivity'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AdminLayout from '../../components/AdminLayout.vue'
import BaseTable from '../../components/Base/BaseTable.vue'
import { useAxios } from '../../functions'
import { useStore } from '../../store'

let data = $ref([])
let router = useRouter()
let { $state: state } = useStore()

let constraint = $ref('item')
let direction = $ref('asc')

const fetchBids = async () => {
  let { response } = await useAxios(
    'get',
    `/admin/bids?sortBy=${constraint}&dir=${direction}`,
  )

  if (response.data.ok) data = response.data.data
}

let formatedData = computed(() => {
  return data.map((x) => {
    return { ...x, user: x.user.email, item: x.item.name }
  })
})

onMounted(async () => fetchBids())

const sortBy = (value, dir) => {
  constraint = value
  direction = dir

  fetchBids()
}

const open = (val) => {
  let route = router.resolve({ path: `/${state.lang}/bid/${val._id}` })
  window.open(route.href, '_blank')
}

const edit = (value) => {
  console.log(value)
}

const remove = (value) => {
  console.log(value)
}
</script>

<template>
  <AdminLayout title="Bids">
    <BaseTable
      :columns="['Bid', 'Auctioneer', 'Status', 'Start Price']"
      :values="['item', 'user', 'status', 'minPrice']"
      :layout="['auto', 'auto', 'auto', 'auto']"
      :data="formatedData"
      :constraint="constraint"
      :direction="direction"
      :actions="{ open: true, edit: true, remove: true }"
      @sortBy="sortBy"
      @open="open"
      @edit="edit"
      @remove="remove"
    />
  </AdminLayout>
</template>
