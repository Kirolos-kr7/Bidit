<script setup>
import BaseInfo from '../components/Base/BaseInfo.vue'
import BaseTitle from '../components/Base/BaseTitle.vue'
import { onMounted } from 'vue'
import { useAxios, getReportType, getReportStatus } from '../functions'
import BaseEmpty from '../components/Base/BaseEmpty.vue'

let resports = $ref([])

onMounted(async () => {
  let { response } = await useAxios('get', '/report/user')
  console.log(response)

  if (response.data.ok) resports = response.data.data
})

const text = $ref({
  title: {
    ar: 'البلاغات',
    en: 'Reports',
  },
  reportId: {
    ar: 'رقم الابلاغ',
    en: 'Report id',
  },
  type: {
    ar: 'النوع',
    en: 'Type',
  },
  description: {
    ar: 'الوصف',
    en: 'Description',
  },
  status: {
    ar: 'الحالة',
    en: 'Status',
  },
  info: {
    ar: 'هذة بلاغات انت قدمتها.',
    en: "These are reports that you've made.",
  },
})
</script>

<template>
  <div class="px-4">
    <div class="flex flex-wrap items-start justify-between gap-x-10 gap-y-3">
      <BaseTitle
        >{{ $t(text.title) }}
        <BaseInfo>{{ $t(text.info) }} </BaseInfo>
      </BaseTitle>
    </div>
  </div>

  <div class="mt-6 grid gap-3 px-5 md:grid-cols-2" v-if="resports.length > 0">
    <div
      v-for="report in resports"
      :key="report._id"
      class="relative grid gap-x-5 gap-y-0.5 overflow-hidden rounded-md bg-white p-3 capitalize shadow-md md:grid-cols-[auto,1fr]"
    >
      <div class="font-semibold">
        {{ $t(text.reportId) }}
      </div>
      <span>{{ report._id }}</span>
      <div class="font-semibold">
        {{ $t(text.type) }}
      </div>
      <span>{{ getReportType(report.type) }}</span>
      <div class="font-semibold">
        {{ $t(text.description) }}
      </div>
      <span>{{ report.description }}</span>
      <div class="font-semibold">
        {{ $t(text.status) }}
      </div>
      <span>{{ getReportStatus(report.status) }}</span>
    </div>
  </div>
  <BaseEmpty
    v-else
    :msg="{
      ar: 'لا يوجد لديك بلاغات الان!',
      en: 'No reports available now!',
    }"
  />
</template>
