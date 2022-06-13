<script setup>
import BaseTable from '../../components/Base/BaseTable.vue'
import { onMounted } from 'vue'
import { useAxios } from '../../functions'
import { reportStatuses } from '../../lang/reportstatus.json'
import BaseDialog from '../../components/Base/BaseDialog.vue'
import BaseTitle from '../../components/Base/BaseTitle.vue'
import BaseSelect from '../../components/Base/BaseSelect.vue'
import BaseError from '../../components/Base/BaseError.vue'
import BaseButton from '../../components/Base/BaseButton.vue'
import { computed } from '@vue/reactivity'

let data = $ref([])
let reportDialog = $ref(false)
let editDialog = $ref(false)
let selectedReport = $ref(false)
let error = $ref(null)
let constraint = $ref('_id')
let direction = $ref('asc')

const fetchReports = async () => {
  let { response } = await useAxios(
    'get',
    `/admin/reports?sortBy=${constraint}&dir=${direction}`,
  )

  if (response.data.ok) data = response.data.data
}

onMounted(async () => fetchReports())

let formatedData = computed(() => {
  return data.map((x) => {
    return {
      ...x,
      reporter: x?.reporter?.email || x?.recipient,
      recipient: x?.recipient?.email || x?.recipient,
    }
  })
})

const sortBy = (value, dir) => {
  constraint = value
  direction = dir

  fetchReports()
}
const open = (val) => {
  reportDialog = true
  selectedReport = val
}

const edit = (val) => {
  editDialog = true
  selectedReport = val
}

const saveEdit = async () => {
  let { response } = await useAxios(
    'patch',
    `/report/feedback/${selectedReport._id}`,
    { status: selectedReport.status },
  )
  if (!response.data.ok) error = response.data.message
  else {
    resetDialog()
    fetchReports()
  }
}

const resetDialog = () => {
  reportDialog = false
  editDialog = false
  selectedReport = null
}
</script>

<template>
  <div class="flex items-start justify-between">
    <h1 class="mb-5 font-merriweather text-3xl font-extrabold">Reports</h1>
  </div>
  <BaseTable
    :columns="['Report', 'Type', 'Status']"
    :values="['_id', 'type', 'status']"
    :layout="['auto', 'auto', 'auto']"
    :data="formatedData"
    :constraint="constraint"
    :direction="direction"
    :actions="{ open: true, edit: true }"
    @sortBy="sortBy"
    @open="open"
    @edit="edit"
  />

  <transition name="fade">
    <BaseDialog v-if="reportDialog || editDialog" @click="resetDialog()">
    </BaseDialog>
  </transition>

  <transition name="zoom">
    <div
      class="border-bi-600 fixed top-1/2 left-1/2 z-30 max-h-[85vh] w-full max-w-prose origin-top-left -translate-x-1/2 -translate-y-1/2 scale-100 overflow-auto rounded-md border bg-white p-3 font-medium text-black md:min-w-prose"
      v-if="reportDialog"
    >
      <div class="relative grid gap-x-5 gap-y-0.5 p-3 md:grid-cols-[auto,1fr]">
        <div class="font-semibold">Report Id</div>
        <span>{{ selectedReport._id }}</span>
        <div class="font-semibold">Reporter</div>
        <span>{{ selectedReport.reporter }}</span>
        <div class="font-semibold">Recipient</div>
        <span>{{ selectedReport.recipient }}</span>
        <div class="font-semibold">Type</div>
        <span>{{ selectedReport.type }}</span>
        <div class="font-semibold">Description</div>
        <span>{{ selectedReport.description }}</span>
        <div class="font-semibold">Status</div>
        <span>{{ selectedReport.status }}</span>
      </div>
    </div>
  </transition>

  <transition name="zoom">
    <div
      class="border-bi-600 fixed top-1/2 left-1/2 z-30 max-h-[85vh] w-full max-w-prose origin-top-left -translate-x-1/2 -translate-y-1/2 scale-100 overflow-auto rounded-md border bg-white p-5 font-medium text-black md:min-w-prose"
      v-if="editDialog"
    >
      <BaseTitle> Edit Report </BaseTitle>
      <form @submit.prevent="saveEdit" class="mt-5 grid gap-5">
        <BaseSelect
          v-model="selectedReport.status"
          class="!w-full capitalize"
          @updateInput="(val) => (selectedReport.status = val)"
          placeholder="Status"
        >
          <option
            v-for="status in reportStatuses"
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
