<script setup>
import BaseTitle from '../components/Base/BaseTitle.vue'
import BaseButton from '../components/Base/BaseButton.vue'
import BaseDialog from '../components/Base/BaseDialog.vue'
import InventoryItem from '../components/InventoryItem.vue'
import BaseInput from '../components/Base/BaseInput.vue'
import BaseTextArea from '../components/Base/BaseTextArea.vue'
import BaseSelect from '../components/Base/BaseSelect.vue'
import { categories } from '../lang/categories.json'
import { onMounted } from 'vue'
import NewBid from '../components/NewBid.vue'
import { useAxios } from '../functions'

let itemsDialog = $ref(false),
  deleteDialog = $ref(false),
  bidDialog = $ref(false),
  isEditing = $ref(false),
  itemName = $ref(''),
  itemType = $ref(''),
  itemDesc = $ref('')

const text = $ref({
  title: {
    ar: 'المخزون',
    en: 'Inventory',
  },
  addItem: {
    ar: 'أضافه عنصر',
    en: 'Add item',
  },
  editItem: {
    ar: 'تعديل عنصر',
    en: 'Edit item',
  },
  newItem: {
    ar: 'عنصر جديد',
    en: 'New item',
  },
  namePlaceholder: {
    ar: 'الاسم',
    en: 'Name',
  },
  typePlaceholder: {
    ar: 'النوع',
    en: 'Type',
  },
  descriptionPlaceholder: {
    ar: 'الوصف',
    en: 'Description',
  },
  add: {
    ar: 'أًضافه',
    en: 'Add',
  },
  edit: {
    ar: 'تعديل',
    en: 'Edit',
  },
  deleteItem: {
    ar: 'حذف العنصر',
    en: 'Delete Item',
  },
  doneProcess: {
    ar: 'تاكيد العمليه؟',
    en: 'Are you sure you want to proceed?',
  },
  yes: {
    ar: 'نعم',
    en: 'Yes',
  },
  no: {
    ar: 'لا',
    en: 'No',
  },
})

let items = $ref([])
let isLoading = $ref(false)

const getAllItems = async () => {
  isLoading = true
  items = []
  let { isLoading: il, data, err } = await useAxios('get', '/item/all', null)
  items = data
  isLoading = il
}

onMounted(async () => {
  itemType = categories.items[0].en

  getAllItems()
})

const resetDialog = () => {
  itemsDialog = false
  isEditing = false
  deleteDialog = false
  bidDialog = false
  itemName = ''
  itemType = ''
  itemDesc = ''
}

const addItem = async () => {
  await useAxios('post', '/item/add', {
    name: itemName,
    type: itemType,
    description: itemDesc,
  })
    .then(() => {
      itemsDialog = false
      getAllItems()
    })
    .catch((err) => {
      console.log(err)
    })
}

const editItem = (item) => {
  itemsDialog = true
  isEditing = true
  console.log(item)
  itemName = item.name
  itemType = item.type
  itemDesc = item.description
}

let selectedItem = $ref({})

const showDeleteDialog = async (item) => {
  deleteDialog = true
  selectedItem = item
}

const deleteItem = async () => {
  await useAxios('delete', '/item/delete', {
    id: selectedItem.id,
  })
    .then(() => {
      deleteDialog = false
      getAllItems()
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>

<template>
  <div class="px-4">
    <div class="flex items-start justify-between gap-3">
      <BaseTitle>{{ $t(text.title) }}</BaseTitle>
      <BaseButton @click="itemsDialog = true">{{
        $t(text.addItem)
      }}</BaseButton>
    </div>
    <div v-if="!isLoading">
      <div
        class="mx-auto mt-24 flex flex-col items-center gap-3"
        v-if="items.length === 0"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          xmlns:svgjs="http://svgjs.com/svgjs"
          version="1.1"
          width="150"
          height="150"
          x="0"
          y="0"
          viewBox="0 0 512 512"
          xml:space="preserve"
          class=""
          data-v-928b0044=""
        >
          <g data-v-928b0044="">
            <linearGradient
              xmlns="http://www.w3.org/2000/svg"
              id="SVGID_1_"
              gradientUnits="userSpaceOnUse"
              x1="256"
              x2="256"
              y1="406"
              y2="31"
              data-v-928b0044=""
            >
              <stop
                stop-opacity="1"
                stop-color="#1f1b5d"
                offset="0"
                data-v-928b0044=""
              ></stop>
              <stop
                stop-opacity="1"
                stop-color="#4f46e5"
                offset="1"
                data-v-928b0044=""
              ></stop>
            </linearGradient>
            <linearGradient
              xmlns="http://www.w3.org/2000/svg"
              id="SVGID_2_"
              gradientUnits="userSpaceOnUse"
              x1="256"
              x2="256"
              y1="481"
              y2="316"
              data-v-928b0044=""
            >
              <stop offset="0" stop-color="#c3ffe8" data-v-928b0044=""></stop>
              <stop
                offset=".9973"
                stop-color="#f0fff4"
                data-v-928b0044=""
              ></stop>
            </linearGradient>
            <g xmlns="http://www.w3.org/2000/svg" data-v-928b0044="">
              <g data-v-928b0044="">
                <g data-v-928b0044="">
                  <path
                    d="m511.7 312.7-60-270c-1.5-6.901-7.8-11.7-14.7-11.7h-362c-6.899 0-13.2 4.799-14.7 11.7l-60 270c-.3 1.2-.3 2.099-.3 3.3l166 90h180l166-90c0-1.201 0-2.1-.3-3.3z"
                    fill="url(#SVGID_1_)"
                    data-original="url(#SVGID_1_)"
                    data-v-928b0044=""
                  ></path>
                </g>
              </g>
              <g data-v-928b0044="">
                <g data-v-928b0044="">
                  <path
                    d="m394.6 316c-11.521 0-22.049 6.526-27.173 16.846l-17.292 34.825c-2.533 5.102-7.739 8.329-13.435 8.329h-161.401c-5.697 0-10.902-3.227-13.435-8.329l-17.292-34.825c-5.123-10.32-15.65-16.846-27.172-16.846h-117.4v150c0 8.284 6.716 15 15 15h482c8.284 0 15-6.716 15-15v-150z"
                    fill="#f0ffff"
                    data-v-928b0044=""
                  ></path>
                </g>
              </g>
            </g>
          </g>
        </svg>
        <span class="font-semibold">You Don't have any items yet!</span>
      </div>
      <div
        v-else
        class="mt-6 grid items-start gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        <InventoryItem
          v-for="(item, index) in items"
          :key="index"
          :item="item"
          @editItem="editItem"
          @newBid="bidDialog = true"
          @deleteItem="showDeleteDialog(item)"
        />
      </div>
    </div>
  </div>

  <transition name="fade">
    <BaseDialog
      v-if="itemsDialog || bidDialog || deleteDialog"
      @click="resetDialog"
    >
    </BaseDialog>
  </transition>
  <transition name="zoom">
    <div
      class="border-bi-600 fixed top-1/2 left-1/2 z-30 max-h-[85vh] w-full max-w-prose origin-top-left -translate-x-1/2 -translate-y-1/2 scale-100 overflow-auto rounded-md border bg-white p-5 font-medium text-black md:min-w-prose"
      v-if="itemsDialog"
    >
      <BaseTitle>
        {{ isEditing ? $t(text.editItem) : $t(text.newItem) }}</BaseTitle
      >
      <form @submit.prevent="" class="mt-5 grid gap-5">
        <BaseInput
          type="text"
          class="!w-full"
          :placeholder="$t(text.namePlaceholder)"
          v-model="itemName"
          @updateInput="(val) => (itemName = val)"
        />
        <div class="relative">
          <BaseSelect
            class="!w-full capitalize"
            :placeholder="$t(text.typePlaceholder)"
            @change="(e) => (itemType = e.target.value)"
          >
            <option
              v-for="(category, index) in categories.items"
              :key="index"
              :value="category.en"
              :selected="index === 0"
            >
              {{ $t(category) }}
            </option>
          </BaseSelect>
        </div>
        <BaseTextArea
          rows="8"
          type="text"
          class="col-span-2 !w-full"
          :placeholder="$t(text.descriptionPlaceholder)"
          v-model="itemDesc"
          @updateInput="(val) => (itemDesc = val)"
        />
        <BaseButton @click="addItem"
          >{{ isEditing ? $t(text.edit) : $t(text.newItem) }}
        </BaseButton>
      </form>
    </div>
  </transition>
  <transition name="zoom">
    <div
      class="border-bi-600 fixed top-1/2 left-1/2 z-30 max-h-[85vh] w-full max-w-prose origin-top-left -translate-x-1/2 -translate-y-1/2 scale-100 overflow-auto rounded-md border bg-white p-5 font-medium text-black md:min-w-prose"
      v-if="deleteDialog"
    >
      <BaseTitle>{{ $t(text.deleteItem) }}</BaseTitle>
      <p class="my-3">{{ $t(text.doneProcess) }}</p>
      <div class="flex justify-end gap-2">
        <BaseButton class="!bg-red-600 hover:!bg-red-700" @click="deleteItem">{{
          $t(text.yes)
        }}</BaseButton>
        <BaseButton @click="resetDialog">{{ $t(text.no) }}</BaseButton>
      </div>
    </div>
  </transition>

  <transition name="zoom">
    <NewBid v-if="bidDialog" @resetDialog="resetDialog" :item="items[0]" />
  </transition>
</template>
