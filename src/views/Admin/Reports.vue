<script setup>
import BaseTable from '../../components/Base/BaseTable.vue'
import AdminLayout from '../../components/AdminLayout.vue'
import { onMounted } from 'vue'
import { useAxios } from '../../functions'

let data = $ref([])

let constraint = $ref('_id')
let direction = $ref('asc')

const fetchReports = async () => {
  let { response } = await useAxios(
    'get',
    `/admin/reports?sortBy=${constraint}&dir=${direction}`,
  )

  if (response.data.ok) data = response.data.data
}

onMounted(async () => fetchReports())

const sortBy = (value, dir) => {
  constraint = value
  direction = dir

  fetchReports()
}
const open = (value) => {
  console.log(value)
}

const edit = (value) => {
  console.log(value)
}

const remove = (value) => {
  console.log(value)
}
</script>

<template>
  <AdminLayout>
    <div class="flex items-start justify-between">
      <h1 class="mb-5 font-merriweather text-3xl font-extrabold">Reports</h1>
    </div>
    <BaseTable
      :columns="['Report', 'Type', 'Status']"
      :values="['_id', 'type', 'status']"
      :layout="['auto', 'auto', 'auto']"
      :data="data"
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
