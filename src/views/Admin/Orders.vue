<script setup>
import BaseTable from '../../components/Base/BaseTable.vue'
import AdminLayout from '../../layouts/AdminLayout.vue'

let data = $ref([
  {
    _id: '6249d7078f3db98ae5267e6d',
    user: '6244a1a469e973dd888a0623',
    status: 'delivered',
    totalPrice: 600,
  },
  {
    _id: '6249d7078f3db98ae5267e6d',
    user: '6244a1a469e973dd888a0623',
    status: 'delivered',
    totalPrice: 600,
  },
  {
    _id: '6249d7078f3db98ae5267e6d',
    user: '6244a1a469e973dd888a0623',
    status: 'delivered',
    totalPrice: 600,
  },
])
</script>

<template>
  <AdminLayout title="Orders">
    <BaseTable
      :columns="['Order', 'User', 'Status', 'Total Price']"
      :values="['_id', 'user', 'status', 'totalPrice']"
      layout="1fr 1fr 0.5fr 0.5fr"
      :data="data"
    />
  </AdminLayout>
</template>
