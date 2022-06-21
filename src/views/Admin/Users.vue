<script setup>
import BaseTable from '../../components/Base/BaseTable.vue'
import { useAxios, useMeta } from '../../functions'
import { onMounted } from 'vue'
import BaseDialog from '../../components/Base/BaseDialog.vue'
import BaseTitle from '../../components/Base/BaseTitle.vue'
import BaseButton from '../../components/Base/BaseButton.vue'
import { computed } from '@vue/reactivity'
import Paginate from '../../components/Paginate.vue'
import BaseSearchBox from '../../components/Base/BaseSearchBox.vue'

let data = $ref([])
let limit = $ref(8)
let curr = $ref(0)
let max = $ref(0)
let isLoading = $ref(false)
let userDialog = $ref(false)
let removeDialog = $ref(false)
let adminDialog = $ref(false)
let selectedUser = $ref(null)
let constraint = $ref('name')
let direction = $ref('asc')
let searchValue = $ref('')

const getUsers = async (reset = false) => {
  if (reset) {
    data = []
    curr = 0
    max = 0
  }

  let url = `/admin/users?sortBy=${constraint}&dir=${direction}&limit=${limit}&skip=${curr}`

  if (searchValue.trim() !== '')
    url = `/admin/searchUsers/${searchValue}?sortBy=${constraint}&dir=${direction}&limit=${limit}&skip=${curr}`

  isLoading = true

  let { response } = await useAxios('get', url)

  if (response.data.ok) {
    response.data.data.users.forEach((user) => {
      data.push(user)
    })
    max = response.data.data.count
    curr = data.length
  }

  isLoading = false
}

onMounted(async () => getUsers())

let formatedData = computed(() => {
  return data.map((x) => {
    return {
      ...x,
      isAdmin: String(x?.isAdmin),
    }
  })
})

const sortBy = (value, dir) => {
  constraint = value
  direction = dir

  getUsers(true)
}

const resetDialog = () => {
  userDialog = false
  removeDialog = false
  adminDialog = false
  selectedUser = null
}

const open = (val) => {
  userDialog = true
  selectedUser = val
}

const edit = (val) => {
  adminDialog = true
  selectedUser = val
}

const changePrivlages = async () => {
  let { response } = await useAxios('patch', `/auth/user-role`, {
    email: selectedUser.email,
  })

  if (response.data.ok) {
    adminDialog = false
    getUsers(true)
  }
}

const remove = (val) => {
  removeDialog = true
  selectedUser = val
}

const approveRemove = async () => {
  let { response } = await useAxios(
    'delete',
    `/admin/user-account/${selectedUser._id}`,
  )

  if (response.data.ok) {
    removeDialog = false
    selectedUser = null
    getUsers(true)
  }
}

const search = async (val) => {
  searchValue = val

  getUsers(true)
}

useMeta({ title: 'Users', base: true })
</script>

<template>
  <div class="flex items-start justify-between gap-3">
    <h1 class="mb-5 font-merriweather text-3xl font-extrabold">Users</h1>

    <BaseSearchBox
      @search="(val) => search(val)"
      @clear="
        () => {
          searchValue = ''
          getUsers(true)
        }
      "
    />
  </div>
  <BaseTable
    :columns="['User', 'Email', 'Admin']"
    :values="['name', 'email', 'isAdmin']"
    :layout="['auto', 'auto', 'auto']"
    :data="formatedData"
    :constraint="constraint"
    :direction="direction"
    :actions="{ open: true, edit: true, remove: true }"
    @sortBy="sortBy"
    @open="open"
    @edit="edit"
    @remove="remove"
  />

  <Paginate
    v-if="data.length != 0"
    :curr="curr"
    :max="max"
    :isLoading="isLoading"
    @more="getUsers"
  />

  <transition name="fade">
    <BaseDialog
      v-if="userDialog || removeDialog || adminDialog"
      @click="resetDialog()"
    >
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
        <span class="text-gray-500">{{ selectedUser?.name || 'N/F' }}</span>
        <div class="font-semibold">Email</div>
        <span class="text-gray-500">{{ selectedUser?.email || 'N/F' }}</span>
        <div class="font-semibold">isAdmin</div>
        <span class="text-gray-500">{{ selectedUser?.isAdmin || 'N/F' }}</span>
        <div class="font-semibold">Gender</div>
        <span class="text-gray-500">{{ selectedUser?.gender || 'N/F' }}</span>
        <div class="font-semibold">Phone</div>
        <span class="text-gray-500">{{ selectedUser?.phone || 'N/F' }}</span>
        <div class="font-semibold">Address</div>
        <span class="text-gray-500">{{ selectedUser?.address || 'N/F' }}</span>
        <div class="font-semibold">JoinedAt</div>
        <span class="text-gray-500">{{
          selectedUser?.createdAt || 'N/F'
        }}</span>
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

  <transition name="zoom">
    <div
      class="border-bi-600 fixed top-1/2 left-1/2 z-30 max-h-[85vh] w-full max-w-prose origin-top-left -translate-x-1/2 -translate-y-1/2 scale-100 overflow-auto rounded-md border bg-white p-5 font-medium text-black md:min-w-prose"
      v-if="adminDialog"
    >
      <BaseTitle>Change User Role</BaseTitle>
      <p class="my-3">
        Current user is {{ !selectedUser?.isAdmin ? 'NOT' : '' }} an admin.
        <br />
        Are you sure you want to
        {{ selectedUser?.isAdmin ? 'remove' : 'give' }} admin privlages to this
        user?
      </p>
      <div class="flex justify-end gap-2">
        <BaseButton
          class="!bg-red-600 hover:!bg-red-700"
          @click="changePrivlages()"
          >Yes</BaseButton
        >
        <BaseButton @click="adminDialog = false">No</BaseButton>
      </div>
    </div>
  </transition>
</template>
