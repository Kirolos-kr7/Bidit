<script setup>
import BaseTable from '../../components/Base/BaseTable.vue'
import AdminLayout from '../../layouts/AdminLayout.vue'

let data = $ref([
  {
    _id: '6249d7078f3db98ae5267e6d',
    type: 'complaint',
    status: 'active',
  },
])

let constraint = $ref('_id')
let direction = $ref('asc')

const sortBy = (value, dir) => {
  constraint = value
  direction = dir
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
  <AdminLayout title="Reports">
    <BaseTable
      :columns="['Report', 'Type', 'Status']"
      :values="['_id', 'type', 'status']"
      :data="data"
      :constraint="constraint"
      :direction="direction"
      @sortBy="sortBy"
      @open="open"
      @edit="edit"
      @remove="remove"
    />
  </AdminLayout>
</template>
