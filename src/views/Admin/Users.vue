<script setup>
import BaseTable from '../../components/Base/BaseTable.vue'
import AdminLayout from '../../layouts/AdminLayout.vue'

let data = $ref([
  { name: 'Kirolos Rafaat', email: 'k@k.co', isAdmin: false },
  { name: 'Mario George', email: 'mario@gmail.com', isAdmin: true },
])

let constraint = $ref('name')
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
  <AdminLayout title="Users">
    <BaseTable
      :columns="['User', 'Email', 'Admin']"
      :values="['name', 'email', 'isAdmin']"
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
