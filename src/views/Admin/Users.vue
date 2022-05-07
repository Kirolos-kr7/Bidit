<script setup>
import BaseTable from '../../components/Base/BaseTable.vue'
import AdminLayout from '../../components/AdminLayout.vue'
import { useAxios } from '../../functions'
import { onMounted } from 'vue'
import BaseDialog from '../../components/Base/BaseDialog.vue'
import BaseTitle from '../../components/Base/BaseTitle.vue'
import BaseButton from '../../components/Base/BaseButton.vue'

let data = $ref([])

let userDialog = $ref(false)
let removeDialog = $ref(false)
let selectedUser = $ref(null)
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

const resetDialog = () => {
  userDialog = false
  removeDialog = false
  selectedUser = null
}

const open = (val) => {
  userDialog = true
  selectedUser = val
}

const remove = (val) => {
  removeDialog = true
  selectedUser = val
}

const approveRemove = () => {
  console.log(selectedUser)
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
      @remove="remove"
    />
  </AdminLayout>

  <transition name="fade">
    <BaseDialog v-if="userDialog || removeDialog" @click="resetDialog()">
    </BaseDialog>
  </transition>

  <transition name="zoom">
    <div
      class="border-bi-600 fixed top-1/2 left-1/2 z-30 max-h-[85vh] w-full max-w-prose origin-top-left -translate-x-1/2 -translate-y-1/2 scale-100 overflow-auto rounded-md border bg-white p-5 font-medium text-black md:min-w-prose"
      v-if="userDialog"
    >
      <BaseTitle
        >User
        <span class="break-words text-lg font-normal"
          >#{{ selectedUser?._id }}</span
        ></BaseTitle
      >
      <div class="mt-4 grid grid-cols-[auto,1fr] gap-x-3 gap-y-1">
        <div class="font-semibold">Name</div>
        <span class="text-gray-500">{{ selectedUser?.name }}</span>
        <div class="font-semibold">Email</div>
        <span class="text-gray-500">{{ selectedUser?.email }}</span>
        <div class="font-semibold">isAdmin</div>
        <span class="text-gray-500">{{ selectedUser?.isAdmin }}</span>
        <div class="font-semibold">Gender</div>
        <span class="text-gray-500">{{ selectedUser?.gender }}</span>
        <div class="font-semibold">Phone</div>
        <span class="text-gray-500">{{ selectedUser?.phone }}</span>
        <div class="font-semibold">Address</div>
        <span class="text-gray-500">{{ selectedUser?.address }}</span>
        <div class="font-semibold">JoinedAt</div>
        <span class="text-gray-500">{{ selectedUser?.createdAt }}</span>
        <!-- <div>isPremium: </div> <span>{{ selectedUser.premium }}</span> -->
      </div>
    </div>
  </transition>

  <transition name="zoom">
    <div
      class="border-bi-600 fixed top-1/2 left-1/2 z-30 max-h-[85vh] w-full max-w-prose origin-top-left -translate-x-1/2 -translate-y-1/2 scale-100 overflow-auto rounded-md border bg-white p-5 font-medium text-black md:min-w-prose"
      v-if="removeDialog"
    >
      <BaseTitle>Remove User</BaseTitle>
      <p class="my-3">Are you sure you want to proceed?</p>
      <div class="flex justify-end gap-2">
        <BaseButton
          class="!bg-red-600 hover:!bg-red-700"
          @click="approveRemove()"
          >Yes</BaseButton
        >
        <BaseButton @click="removeDialog = false">No</BaseButton>
      </div>
    </div>
  </transition>
</template>
