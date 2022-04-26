<script setup>
import BaseTable from '../../components/Base/BaseTable.vue'
import AdminLayout from '../../layouts/AdminLayout.vue'

let data = $ref([
  { name: 'Kirolos Rafaat', email: 'k@k.co', isAdmin: false },
  { name: 'Mario George', email: 'mario@gmail.com', isAdmin: true },
])
</script>

<template>
  <AdminLayout title="Users">
    <BaseTable
      :columns="['User', 'Email', 'Admin']"
      :values="['name', 'email', 'isAdmin']"
      layout="1fr 2fr 1fr"
      :data="data"
    />
  </AdminLayout>
</template>
