<script setup>
import BaseTitle from '../components/Base/BaseTitle.vue'
import BaseButton from '../components/Base/BaseButton.vue'
import BaseDialog from '../components/Base/BaseDialog.vue'
import Item from '../components/Item.vue'
import BaseInput from '../components/Base/BaseInput.vue'
import BaseTextArea from '../components/Base/BaseTextArea.vue'

let itemsDialog = $ref(false)

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

  <BaseDialog v-if="itemsDialog" @click="itemsDialog = false">
    <div
      class="fixed top-1/2 left-1/2 z-30 min-w-prose max-w-prose -translate-x-1/2 -translate-y-1/2 rounded-md bg-bi-900 p-5"
    >
      <BaseTitle>New Item</BaseTitle>
      <div class="mt-5 grid gap-5">
        <BaseInput type="text" class="!w-full" placeholder="Name" />
        <BaseInput type="text" class="!w-full" placeholder="Type" />
        <BaseTextArea
          type="text"
          class="col-span-2 !w-full"
          placeholder="Description"
        />
        <BaseButton>Add</BaseButton>
      </div>
    </div>
  </BaseDialog>
</template>
