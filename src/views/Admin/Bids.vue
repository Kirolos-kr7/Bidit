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
  <AdminLayout title="Bids">
    <BaseTable
      :columns="['Bid', 'User', 'Status', 'Start Price']"
      :values="['_id', 'user', 'status', 'minPrice']"
      :layout="['auto', 'auto', 'auto', 'auto']"
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
