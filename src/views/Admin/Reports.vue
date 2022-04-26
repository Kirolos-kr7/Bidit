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
</script>

<template>
  <AdminLayout title="Reports">
    <BaseTable
      :columns="['Report', 'Type', 'Status']"
      :values="['_id', 'type', 'status']"
      layout="1fr 0.5fr 0.5fr"
      :data="data"
    />
  </AdminLayout>
</template>
