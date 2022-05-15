<script setup>
import BaseTable from '../../components/Base/BaseTable.vue'
import AdminLayout from '../../components/AdminLayout.vue'
import { onMounted } from 'vue'
import { computed } from '@vue/reactivity'
import { statuses } from '../../lang/orderstatus.json'
import BaseDialog from '../../components/Base/BaseDialog.vue'
import BaseSelect from '../../components/Base/BaseSelect.vue'
import BaseError from '../../components/Base/BaseError.vue'
import BaseButton from '../../components/Base/BaseButton.vue'
import BaseTitle from '../../components/Base/BaseTitle.vue'
import { useAxios } from '../../functions'

let data = $ref([])
let editDialog = $ref(false)
let selectedOrder = $ref({})
let error = $ref(null)

let constraint = $ref('_id')
let direction = $ref('asc')

const fetchOrders = async () => {
  let { response } = await useAxios(
    'get',
    `/admin/orders?sortBy=${constraint}&dir=${direction}`,
  )

  if (response.data.ok) data = response.data.data
}

let formatedData = computed(() => {
  return data.map((x) => {
    return {
      ...x,
      auctioneer: x.auctioneer.email,
      bidder: x.bidder.email,
      totalPrice: x.price + x.shipping,
    }
  })
})

onMounted(async () => fetchOrders())

const sortBy = (value, dir) => {
  constraint = value
  direction = dir

  fetchOrders()
}

const open = (value) => {
  console.log(value)
}

const edit = (value) => {
  editDialog = true
  selectedOrder = value
}

const saveEdit = async () => {
  let { response } = await useAxios(
    'patch',
    `/admin/edit/${selectedOrder._id}`,
    { status: selectedOrder.status },
  )
  if (!response.data.ok) error = response.data.message
  else {
    resetDialog()
    fetchOrders()
  }
}

const remove = (value) => {
  console.log(value)
}

const resetDialog = () => {
  editDialog = null
  selectedOrder = null
}
</script>

<template>
  <AdminLayout>
    <div class="flex items-start justify-between">
      <h1 class="mb-5 font-merriweather text-3xl font-extrabold">Orders</h1>
    </div>
    <BaseTable
      :columns="['Order', 'Auctioneer', 'Bidder', 'Status', 'Total Price']"
      :values="['_id', 'auctioneer', 'bidder', 'status', 'totalPrice']"
      :layout="['auto', 'auto', 'auto', 'auto', 'auto', 'auto']"
      :data="formatedData"
      :constraint="constraint"
      :direction="direction"
      :actions="{ open: true, edit: true, remove: true }"
      @sortBy="sortBy"
      @open="open"
      @edit="edit"
      @remove="remove"
    />
  </AdminLayout>

  <transition name="fade">
    <BaseDialog v-if="editDialog" @click="resetDialog()"> </BaseDialog>
  </transition>
  <transition name="zoom">
    <div
      class="border-bi-600 fixed top-1/2 left-1/2 z-30 max-h-[85vh] w-full max-w-prose origin-top-left -translate-x-1/2 -translate-y-1/2 scale-100 overflow-auto rounded-md border bg-white p-5 font-medium text-black md:min-w-prose"
      v-if="editDialog"
    >
      <BaseTitle> Edit Order </BaseTitle>
      <form @submit.prevent="saveEdit" class="mt-5 grid gap-5">
        <BaseSelect
          v-model="selectedOrder.status"
          class="!w-full capitalize"
          @updateInput="(val) => (selectedOrder.status = val)"
          placeholder="Status"
        >
          <option
            v-for="status in statuses"
            :key="status.en"
            :value="status.en"
          >
            {{ status.en }}
          </option>
        </BaseSelect>
        <BaseError v-if="error">{{ error }}</BaseError>
        <BaseButton>Save</BaseButton>
      </form>
    </div>
  </transition>
</template>
