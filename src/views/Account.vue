<script setup>
import { useStore } from '../store'
const { $state: state } = $(useStore())
</script>

<template>
  <div class="relative mt-20 rounded-md bg-white px-4 pt-20 shadow-sm">
    <div
      class="absolute -top-20 left-4 rounded-full border-8 border-bi-100"
      :class="state.lang === 'ar' ? 'right-4 left-auto' : 'left-4 right-auto'"
    >
      <img src="/images/avatar.png" class="w-32" alt="avatar" />
    </div>
    <div class="flex justify-between p-5 pt-0">
      <div>
        <h1 class="text-3xl font-semibold text-black">
          {{ state.user?.name }}
        </h1>
        <div class="mt-3 grid grid-cols-[20px,1fr] gap-x-2 gap-y-1">
          <svg
            class="h-5 w-5 text-neutral-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            ></path>
          </svg>
          <h2 class="font-medium text-neutral-600">
            {{ state.user?.email }}
          </h2>
          <svg
            class="h-5 w-5 text-neutral-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
            ></path>
          </svg>
          <span class="font-medium text-neutral-600">{{
            state.user?.phone
          }}</span>
          <svg
            class="h-5 w-5 text-neutral-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            ></path>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
          </svg>
          <span class="font-medium text-neutral-600">{{
            state.user?.address
          }}</span>
          <svg
            class="h-5 w-5 text-neutral-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span class="font-medium capitalize text-neutral-600">
            {{ state.user?.gender }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
