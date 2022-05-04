<script setup>
import { useStore } from '../../store'
defineProps(['placeholder', 'modelValue'])
const emits = defineEmits(['updateInput'])
const { $state: state } = $(useStore())
let inputFile = $ref()
let files = $ref([])

const fileChanged = async (e) => {
  if (e.target.files.length > 0) {
    files = []
    Array.from(e.target.files)
      .slice(0, 4)
      .forEach(async (img) => {
        let imgs = await toBase64(img)
        files.push(imgs)
      })
    emits('updateInput', files)
  }
}

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
</script>

<template>
  <div
    class="relative cursor-pointer rounded-md border-2 border-dashed border-neutral-200 p-5 text-center"
    @click="files.length === 0 && inputFile.click()"
  >
    <input
      type="file"
      ref="inputFile"
      class="hidden"
      multiple
      @change="fileChanged"
      accept="image/*"
    />
    <div v-if="files.length < 1" class="py-5">{{ placeholder }}</div>
    <div v-else>
      <div class="flex flex-wrap items-start gap-3">
        <img v-for="file in files" :src="file" class="h-28 w-32 object-cover" />
      </div>
    </div>
    <button
      v-if="files.length > 0"
      class="mt-2 inline-block rounded-md bg-red-200 px-2.5 py-1 font-medium hover:bg-red-300"
      @click="files = []"
    >
      Clear
    </button>
  </div>
</template>
