<script setup>
import { useStore } from '../store'
import { lists } from '../lang/navigation.json'

const { $state: state } = $(useStore())
</script>

<template>
  <footer
    class="flex flex-col gap-5 border border-neutral-800 bg-bi-700 p-5 backdrop-blur-sm"
  >
    <div class="flex items-start gap-10">
      <ul v-for="(list, index) in lists" :key="index">
        <li class="mb-2 text-lg font-semibold text-gray-400">
          {{ $t(list.name) }}
        </li>
        <li v-for="(item, index) in list.items" :key="index">
          <RouterLink :to="`/${state.lang}/${item.to}`"
            >{{ $t(item) }}
          </RouterLink>
        </li>
      </ul>
    </div>
    <div class="relative">
      <div class="mx-auto block w-fit bg-bi-700 px-3">
        <h4
          class="inline-block bg-gradient-to-r from-indigo-300 to-green-300 bg-clip-text font-semibold text-transparent"
        >
          Designed and Developed by SHA#1
        </h4>
      </div>
      <span class="absolute top-1/2 left-0 z-[-1] h-px w-full bg-bi-900"></span>
    </div>
  </footer>
</template>
