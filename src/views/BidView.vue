<script setup>
import BaseButton from '../components/Base/BaseButton.vue'
import BaseInput from '../components/Base/BaseInput.vue'

const text = $ref({
  price: {
    ar: 'السعر',
    en: 'price',
  },
  startBid: {
    ar: 'بدء المزاد',
    en: 'Bid Now',
  },
  report: {
    ar: 'الابلاغ عن المزاد!',
    en: 'Report This Bid!',
  },
})
</script>

<template>
  <div class="bg-bi-600 grid grid-cols-2">
    <img src="/images/monalisa-art.jpg" class="mx-auto my-auto w-[240px] h-[230px] object-cover">

    <div class="bg-bi-800">
      <div class="p-3">
        <p class="my-3 inline-block rounded-2xl bg-indigo-600 px-3 font-medium capitalize">art</p>

        <h2 class="text-neutral-300 text-lg font-semibold capitalize md:text-[22px]">Bid Title</h2>

        <div class="my-2 flex gap-2">
          <img src="/images/avatar.png" class="w-7 cursor-pointer">
          <a href="#" class="text-blue-600 underline">@meen</a>
          <p class="text-slate-500">Saturday 12 may 2021</p>
        </div>

        <h3 class="mb-1">{{ $t(text.price)}} : 1000$ </h3>
        <p class="text-neutral-400">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam hic corporis, doloribus debitis maxime harum placeat itaque fugit culpa nihil sit est rerum molestias asperiores quam alias! Odit, exercitationem eveniet?</p>

        <BaseButton class="mt-2 w-full rounded-lg bg-white text-black font-semibold capitalize">latest Bid is 1000$ by @meen</BaseButton>

        <div class="flex my-3">
          <BaseInput
            type="number"
            placeholder="Your Price"
            class="w-full"
          />
          <BaseButton
            class="bg-bi-600 hover:!bg-bi-800"
          >
            {{ $t(text.startBid) }}
          </BaseButton>
          <p></p>
        </div>

        <a href="#" class="flex justify-end text-blue-600 underline">{{ $t(text.report) }}</a>
        
      </div>
    </div>
  </div>
</template>
