<script setup>
import BaseTable from '../../components/Base/BaseTable.vue'
import AdminLayout from '../../components/AdminLayout.vue'
import { useAxios } from '../../functions'
import { onMounted } from 'vue'

let data = $ref([])

let constraint = $ref('name')
let direction = $ref('asc')

const fetchUsers = async () => {
  let { response } = await useAxios(
    'get',
    `/admin/users?sortBy=${constraint}&dir=${direction}`,
  )

  if (response.data.ok) data = response.data.data
}

onMounted(async () => fetchUsers())

const sortBy = (value, dir) => {
  constraint = value
  direction = dir

  fetchUsers()
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
      :layout="['auto', 'auto', 'auto']"
      :data="data"
      :constraint="constraint"
      :direction="direction"
      :actions="{ open: true, edit: false, remove: true }"
      @sortBy="sortBy"
      @open="open"
      @edit="edit"
      @remove="remove"
    />
  </AdminLayout>
</template>
