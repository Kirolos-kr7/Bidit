<script setup>
import { onMounted } from 'vue'

const props = defineProps({
  imgs: {
    type: Array,
  },
})

let front = $ref(1)
let index = $ref(0)
let interval = $ref(4500)
let xDown = $ref(null)
let imageToshow1 = $ref(props?.imgs[0])
let imageToshow2 = $ref(props?.imgs[1])
let imageInterval

onMounted(() => startAutoSwitcher())

const startAutoSwitcher = () => {
  imageInterval = setInterval(() => {
    nextImg()
  }, interval)
}

const changeSelectedImg = (i) => {
  if (front === 1) {
    if (imageToshow1 !== props.imgs[i]) {
      front = 2
      imageToshow2 = props.imgs[i]
      index = i
    }
  } else {
    if (imageToshow2 !== props.imgs[i]) {
      front = 1
      imageToshow1 = props.imgs[i]
      index = i
    }
  }
  clearInterval(imageInterval)
  startAutoSwitcher()
}

const tsImage = (e) => {
  xDown = e.touches[0].clientX
}

const tmImage = (e) => {
  if (!xDown) return

  let xUp = e.touches[0].clientX
  let xDiff = xDown - xUp

  if (xDiff > 0) nextImg()
  else prevImg()

  xDown = null
}

const nextImg = () => {
  if (index < props.imgs.length - 1) {
    changeSelectedImg(index + 1)
  } else {
    index = 0
    changeSelectedImg(index)
  }
}

const prevImg = () => {
  if (index === 0) {
    index = props.imgs.length - 1
    changeSelectedImg(index)
  } else {
    changeSelectedImg(index - 1)
  }
}
</script>

<template>
  <div class="flex items-center justify-evenly">
    <div
      class="mt-4 mb-2 hidden flex-col items-center gap-2 overflow-scroll p-1 md:flex"
    >
      <img
        v-for="(img, i) in imgs"
        :src="`https://ik.imagekit.io/bidit/${img}?tr=w-52`"
        :key="i"
        :class="
          (front === 1 && index === i && 'ring-2 ring-black') ||
          (front === 2 && index === i && 'ring-2 ring-black')
        "
        alt=""
        class="w-[60px] cursor-pointer rounded-md p-1"
        @click="changeSelectedImg(i)"
      />
    </div>

    <div class="relative flex flex-col items-center gap-4 overflow-hidden">
      <div @touchstart="tsImage($event)" @touchmove="tmImage($event)">
        <img
          :src="`https://ik.imagekit.io/bidit/${imageToshow1}?tr=w-400,h-400`"
          key="1"
          alt=""
          class="absolute z-[4] mx-auto rounded-md opacity-0 transition-opacity"
          :class="front === 1 ? 'opacity-100' : ''"
        />
        <img
          :src="`https://ik.imagekit.io/bidit/${imageToshow2}?tr=w-400,h-400`"
          key="2"
          alt=""
          class="relative z-[3] mx-auto rounded-md"
        />
      </div>

      <div class="mb-2 flex items-center gap-2 md:hidden">
        <span
          v-for="(img, i) in imgs"
          :key="i"
          :class="
            (front === 1 && index === i && 'ring-2 ring-black') ||
            (front === 2 && index === i && 'ring-2 ring-black')
          "
          class="h-2 w-2 cursor-pointer rounded-full bg-gray-300"
          @click="changeSelectedImg(i)"
        ></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-leave-active {
  position: absolute;
}

.fade-move {
  transition: 0.3s all ease-in-out;
}
</style>
