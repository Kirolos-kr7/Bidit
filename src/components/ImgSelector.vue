<script setup>
const props = defineProps({
  imgs: {
    type: Array,
  },
})

let front = $ref(1)
let index = $ref(0)
let imageToshow1 = $ref(props.imgs[0])
let imageToshow2 = $ref(null)

const changeSelectedImg = (i) => {
  if (front === 1) {
    if (imageToshow1 !== props.imgs[i]) {
      front = 2
      imageToshow1 = null
      imageToshow2 = props.imgs[i]
      index = i
    }
  } else {
    if (imageToshow2 !== props.imgs[i]) {
      front = 1
      imageToshow1 = props.imgs[i]
      imageToshow2 = null
      index = i
    }
  }
}
</script>

<template>
  <img
    :src="imageToshow1"
    key="1"
    alt=""
    class="mx-auto w-[300px] opacity-0 transition-opacity duration-500"
    :class="front === 1 && '!opacity-100'"
  />
  <img
    :src="imageToshow2"
    key="2"
    alt=""
    class="mx-auto w-[300px] opacity-0 transition-opacity duration-500"
    :class="front === 2 && '!opacity-100'"
  />
  <div class="mt-4 mb-2 flex items-center gap-2 overflow-scroll p-1">
    <img
      v-for="(img, i) in imgs"
      :src="img"
      :key="i"
      :class="
        (front === 1 && index === i && 'ring-4 ring-bi-300') ||
        (front === 2 && index === i && 'ring-4 ring-bi-300')
      "
      alt=""
      class="w-[60px] cursor-pointer"
      @click="changeSelectedImg(i)"
    />
  </div>
</template>
