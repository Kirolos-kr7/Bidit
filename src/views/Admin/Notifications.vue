<script setup>
import BaseTable from '../../components/Base/BaseTable.vue'
import AdminLayout from '../../components/AdminLayout.vue'

let data = $ref([
  {
    title: 'Test 1',
    date: new Date().toDateString(),
    message: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa libero maiores hic tempore optio iure quos commodi rem? Nemo, explicabo?`,
  },
  {
    title: 'Test 2',
    date: new Date().toDateString(),
    message: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa libero maiores hic tempore optio iure quos commodi rem? Nemo, explicabo?`,
  },
])

let constraint = $ref('title')
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
  <AdminLayout title="Notifications">
    <BaseTable
      :columns="['Title', 'Date', 'Message']"
      :values="['title', 'date', 'message']"
      :layout="['auto', 'auto', '60%']"
      :data="data"
      :constraint="constraint"
      :direction="direction"
      :actions="{ open: true, edit: false, remove: false }"
      @sortBy="sortBy"
      @open="open"
      @edit="edit"
      @remove="remove"
    />
  </AdminLayout>
</template>
