<script setup>
import AdminLayout from '../../layouts/AdminLayout.vue'
import BaseTable from '../../components/Base/BaseTable.vue'

let data = $ref([
  {
    _id: '6249d7078f3db98ae5267e6d',
    user: '6244a1a469e973dd888a0623',
    status: 'active',
    minPrice: 600,
  },
  {
    _id: '6249daaf3d755be5401b9db4',
    user: '6244a1a469e973dd888a0623',
    status: 'soon',
    minPrice: 400,
  },
  {
    _id: '6249d7078f3db98ae5267e6d',
    user: '6244a1a469e973dd888a0623',
    status: 'active',
    minPrice: 600,
  },
  {
    _id: '6249daaf3d755be5401b9db4',
    user: '6244a1a469e973dd888a0623',
    status: 'soon',
    minPrice: 400,
  },
  {
    _id: '6249d7078f3db98ae5267e6d',
    user: '6244a1a469e973dd888a0623',
    status: 'active',
    minPrice: 600,
  },
  {
    _id: '6249daaf3d755be5401b9db4',
    user: '6244a1a469e973dd888a0623',
    status: 'soon',
    minPrice: 400,
  },
])
</script>

<template>
  <AdminLayout title="Bids">
    <BaseTable
      :columns="['Bid', 'User', 'Status', 'Start Price']"
      :values="['_id', 'user', 'status', 'minPrice']"
      layout="1fr 1fr 0.5fr 0.5fr"
      :data="data"
    />
  </AdminLayout>
</template>
