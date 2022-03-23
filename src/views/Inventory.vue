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

let items = $ref([
  {
    name: 'Activ Sharks Patterned Zipped Backpack With outer Pocket - Steal Blue',
    type: 'Art',
    decription:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis unde assumenda, voluptas minus omnis voluptates consectetur quidem! Similique at ipsum delectus eum. Nam nostrum similique ipsum quam doloremque veniam ratione.',
  },
  {
    name: 'Activ Sharks Patterned Zipped Backpack With outer Pocket - Steal Blue',
    type: 'Art',
    decription:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis unde assumenda, voluptas minus omnis voluptates consectetur quidem! Similique at ipsum delectus eum. Nam nostrum similique ipsum quam doloremque veniam ratione.',
  },
  {
    name: 'Activ Sharks Patterned Zipped Backpack With outer Pocket - Steal Blue',
    type: 'Art',
    decription:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis unde assumenda, voluptas minus omnis voluptates consectetur quidem! Similique at ipsum delectus eum. Nam nostrum similique ipsum quam doloremque veniam ratione.',
  },
  {
    name: 'Activ Sharks Patterned Zipped Backpack With outer Pocket - Steal Blue',
    type: 'Art',
    decription:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis unde assumenda, voluptas minus omnis voluptates consectetur quidem! Similique at ipsum delectus eum. Nam nostrum similique ipsum quam doloremque veniam ratione.',
  },
  {
    name: 'Activ Sharks Patterned Zipped Backpack With outer Pocket - Steal Blue',
    type: 'Art',
    decription:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis unde assumenda, voluptas minus omnis voluptates consectetur quidem! Similique at ipsum delectus eum. Nam nostrum similique ipsum quam doloremque veniam ratione.',
  },
])

onMounted(() => {
  itemType = categories.items[0].en
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

const addItem = () => {
  console.log({ itemName, itemType, itemDesc })
}

const editItem = (val) => {
  itemsDialog = true
  isEditing = true
  itemName = val.name
  itemType = val.type
  itemDesc = val.decription
}

const deleteItem = () => {
  deleteDialog = false
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
    <div
      class="mt-6 grid items-start gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      <InventoryItem
        v-for="(item, index) in items"
        :key="index"
        :item="item"
        @editItem="editItem"
        @newBid="bidDialog = true"
        @deleteItem="deleteDialog = true"
      />
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
        <BaseButton @click="addItem" class="text-white"
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
        <BaseButton
          class="!bg-red-600 text-white hover:!bg-red-700"
          @click="deleteItem"
          >{{ $t(text.yes) }}</BaseButton
        >
        <BaseButton @click="resetDialog" class="text-white">{{
          $t(text.no)
        }}</BaseButton>
      </div>
    </div>
  </transition>

  <transition name="zoom">
    <NewBid v-if="bidDialog" @resetDialog="resetDialog" :item="items[0]" />
  </transition>
</template>
