<script setup>
let mainConstraint = $ref('name')
let mainDirection = $ref('desc')
let users = $ref([{ name: 'kirolos' }])

const props = defineProps({
  columns: {
    type: Array,
    required: true,
  },
  values: {
    type: Array,
    required: true,
  },
  layout: {
    type: String,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div class="overflow-hidden rounded-md bg-white">
    <div
      v-for="(item, index) in data"
      class="grid border-b last-of-type:border-b-0"
      :style="{ 'grid-template-columns': layout }"
    >
      <div
        v-for="column in columns"
        v-if="index === 0"
        class="mb-1 grid items-center bg-gray-300 p-3 font-semibold"
      >
        {{ column }}
      </div>

      <div
        v-for="value in values"
        class="p-2"
        :class="value === 'status' && 'capitalize'"
      >
        {{ item[value] }}
      </div>
    </div>
  </div>

  <!-- <div class="mt-8 w-full overflow-x-auto rounded-xl rounded-b-none shadow-md">
    <div class="min-w-[600px]">
      <div class="labels gap-5 overflow-hidden bg-pink-100 pt-0.5">
        <div
          class="grid grid-cols-[2fr,1.2fr,1.2fr,64px] items-center gap-x-5 p-2.5"
        >
          <div>
            <button
              @click="
                mainConstraint === 'name'
                  ? mainDirection === 'desc'
                    ? fetchData('name', 'asc')
                    : fetchData('name', 'desc')
                  : fetchData('name', 'asc')
              "
              class="-mx-1 flex cursor-pointer items-center rounded-lg p-1 font-semibold transition hover:text-gray-400 focus:outline-none focus:ring-2"
              :class="
                mainConstraint === 'name'
                  ? 'text-indigo-500 hover:text-indigo-700'
                  : ''
              "
            >
              User
              <svg
                v-if="mainConstraint === 'name'"
                class="h-4 w-4"
                :class="mainDirection === 'desc' ? '' : 'rotate-180'"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 17l-4 4m0 0l-4-4m4 4V3"
                ></path>
              </svg>
            </button>
          </div>
          <div>
            <button
              @click="
                mainConstraint === 'balance'
                  ? mainDirection === 'desc'
                    ? fetchData('balance', 'asc')
                    : fetchData('balance', 'desc')
                  : fetchData('balance', 'asc')
              "
              class="-mx-1 flex cursor-pointer items-center rounded-lg p-1 font-semibold transition hover:text-gray-400 focus:outline-none focus:ring-2"
              :class="
                mainConstraint === 'balance'
                  ? 'text-indigo-500 hover:text-indigo-700'
                  : ''
              "
            >
              Balance
              <svg
                v-if="mainConstraint === 'balance'"
                class="h-4 w-4"
                :class="mainDirection === 'desc' ? '' : 'rotate-180'"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 17l-4 4m0 0l-4-4m4 4V3"
                ></path>
              </svg>
            </button>
          </div>
          <div>
            <button
              @click="
                mainConstraint === 'pending'
                  ? mainDirection === 'desc'
                    ? fetchData('pending', 'asc')
                    : fetchData('pending', 'desc')
                  : fetchData('pending', 'asc')
              "
              class="-mx-1 flex cursor-pointer items-center rounded-lg p-1 font-semibold transition hover:text-gray-400 focus:outline-none focus:ring-2"
              :class="
                mainConstraint === 'pending'
                  ? 'text-indigo-500 hover:text-indigo-700'
                  : ''
              "
            >
              Pending
              <svg
                v-if="mainConstraint === 'pending'"
                class="h-4 w-4"
                :class="mainDirection === 'desc' ? '' : 'rotate-180'"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 17l-4 4m0 0l-4-4m4 4V3"
                ></path>
              </svg>
            </button>
          </div>
          <div class="font-semibold">Actions</div>
        </div>
      </div>
      <div
        class="users max-h-[56.5vh] gap-5 overflow-hidden overflow-y-auto bg-white md:max-h-[68vh]"
      >
        <div
          v-for="user in users"
          :key="user"
          :class="
            users.length > 12
              ? ' grid-cols-[2fr,1.2fr,1.2fr,56px] '
              : 'grid-cols-[2fr,1.2fr,1.2fr,64px]'
          "
          class="grid items-center gap-x-5 gap-y-2 border-b border-solid p-2 transition last-of-type:border-0 hover:bg-gray-100"
        >
          <div class="flex items-center gap-x-2">
            <img
              v-if="user.profilePhoto"
              :src="user.profilePhoto"
              class="h-6 w-6 rounded-full object-cover"
            />
            <span>{{ user.name }}</span>
          </div>
          <div>{{ '$' + user.balance }}</div>
          <div>{{ '$' + user.pending }}</div>
          <div class="flex items-center justify-end font-semibold">
            <button
              @click="openProfileDialog(user)"
              title="Open"
              class="cursor-pointer rounded-md p-0.5 text-gray-500 transition hover:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500/50"
            >
              <svg
                class="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                ></path>
              </svg>
            </button>
            <button
              title="Edit"
              class="cursor-pointer rounded-md p-0.5 text-green-500 transition hover:text-green-400 focus:outline-none focus:ring-1 focus:ring-green-500/50"
              @click="editUser(user)"
            >
              <svg
                class="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div> -->
</template>
