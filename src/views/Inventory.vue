<script setup>
import BaseTitle from '../components/Base/BaseTitle.vue'
import BaseButton from '../components/Base/BaseButton.vue'
import BaseDialog from '../components/Base/BaseDialog.vue'
import Item from '../components/Item.vue'
import BaseInput from '../components/Base/BaseInput.vue'
import BaseTextArea from '../components/Base/BaseTextArea.vue'
import BaseSelect from '../components/Base/BaseSelect.vue'
import { categories } from '../lang/categories.json'
import { onMounted } from 'vue'

let itemsDialog = $ref(true),
  itemName = $ref(''),
  itemType = $ref(''),
  itemDesc = $ref('')

let items = $ref([
  {
    productName:
      'Activ Sharks Patterned Zipped Backpack With outer Pocket - Steal Blue',
    type: 'Art',
    decription:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis unde assumenda, voluptas minus omnis voluptates consectetur quidem! Similique at ipsum delectus eum. Nam nostrum similique ipsum quam doloremque veniam ratione.',
  },
  {
    productName: 'abcx',
    type: 'Art',
    decription:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis unde assumenda, voluptas minus omnis voluptates consectetur quidem! Similique at ipsum delectus eum. Nam nostrum similique ipsum quam doloremque veniam ratione.',
  },
  {
    productName: 'abcx',
    type: 'Art',
    decription:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis unde assumenda, voluptas minus omnis voluptates consectetur quidem! Similique at ipsum delectus eum. Nam nostrum similique ipsum quam doloremque veniam ratione.',
  },
  {
    productName: 'abcx',
    type: 'Art',
    decription:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis unde assumenda, voluptas minus omnis voluptates consectetur quidem! Similique at ipsum delectus eum. Nam nostrum similique ipsum quam doloremque veniam ratione.',
  },
  {
    productName: 'abcx',
    type: 'Art',
    decription:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis unde assumenda, voluptas minus omnis voluptates consectetur quidem! Similique at ipsum delectus eum. Nam nostrum similique ipsum quam doloremque veniam ratione.',
  },
])

onMounted(() => {
  itemType = categories[0].en
})

const addItem = () => {
  console.log({ itemName, itemType, itemDesc })
}
</script>

<template>
  <div class="flex items-start justify-between">
    <BaseTitle>Inventory</BaseTitle>
    <BaseButton @click="itemsDialog = true">Add item</BaseButton>
  </div>
  <div
    class="mt-6 grid items-start gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
  >
    <Item v-for="(item, index) in items" :key="index" :item="item" />
  </div>

  <transition name="fade">
    <BaseDialog v-if="itemsDialog" @click="itemsDialog = false"> </BaseDialog>
  </transition>
  <transition name="zoom">
    <div
      class="fixed top-1/2 left-1/2 z-30 min-w-prose max-w-prose origin-top-left -translate-x-1/2 -translate-y-1/2 scale-100 rounded-md bg-bi-900 p-5"
      v-if="itemsDialog"
    >
      <BaseTitle>New Item</BaseTitle>
      <div class="mt-5 grid gap-5">
        <BaseInput
          type="text"
          class="!w-full"
          placeholder="Name"
          v-model="itemName"
          @updateInput="(val) => (itemName = val)"
        />
        <BaseSelect
          class="!w-full capitalize"
          placeholder="Type"
          @change="(e) => (itemType = e.target.value)"
        >
          <option
            v-for="(category, index) in categories"
            :key="index"
            :value="category.en"
            :selected="index === 0"
          >
            {{ $t(category) }}
          </option>
        </BaseSelect>
        <BaseTextArea
          type="text"
          class="col-span-2 !w-full"
          placeholder="Description"
          v-model="itemDesc"
          @updateInput="(val) => (itemDesc = val)"
        />
        <BaseButton @click="addItem">Add</BaseButton>
      </div>
    </div>
  </transition>
</template>
