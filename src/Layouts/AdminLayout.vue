<script setup>
import { useStore } from '../store'
const { $state: state } = $(useStore())

let isCollapsed = $ref(true)

defineProps(['title'])
</script>

<template>
  <div class="flex flex-1">
    <div
      class="fixed bottom-0 left-0 z-20 h-[4.5rem] w-full flex-shrink-0 border-t-2 border-[#123f55] bg-[#1C263D] transition-all duration-300 md:static md:h-auto md:min-h-screen md:border-t-0"
      :class="isCollapsed ? 'md:w-16' : 'md:w-48'"
    >
      <ul
        class="fixed flex w-[inherit] flex-row items-center justify-around gap-x-0.5 overflow-hidden sm:items-stretch md:flex-col"
      >
        <!-- <li class="h-px w-2/3 bg-gray-700 mx-auto my-3"></li> -->
        <li>
          <RouterLink
            :to="`/${state.lang}/admin`"
            class="flex w-full gap-1 bg-[#1C263D] py-6 font-medium text-[#8291A5] ring-inset transition-all hover:bg-[#273146] focus:ring-1 md:px-3 md:py-3"
            title="Dashboard"
          >
            <svg
              class="pointer-events-none mx-[10px] w-5 flex-shrink-0 select-none"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="24" height="24" rx="3" fill="#425165" />
              <rect x="5" y="9" width="2" height="11" fill="#7B8A9E" />
              <rect x="11" y="4" width="2" height="16" fill="#7B8A9E" />
              <rect x="17" y="14" width="2" height="6" fill="#7B8A9E" />
            </svg>

            <transition name="fade">
              <span
                v-show="!isCollapsed"
                class="hidden translate-y-px font-normal transition-all md:block"
                >Dashboard</span
              >
            </transition>
          </RouterLink>
        </li>
        <li>
          <RouterLink
            :to="`/${state.lang}/admin/users`"
            class="flex w-full gap-1 bg-[#1C263D] py-6 font-medium text-[#8291A5] ring-inset transition-all hover:bg-[#273146] focus:ring-1 md:px-3 md:py-3"
            title="Users"
          >
            <svg
              class="pointer-events-none mx-[10px] w-5 flex-shrink-0 select-none"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M20.8944 19.1651C20.964 18.9204 21 18.6705 21 18.4167C21 16.1294 18.0808 14.1683 13.927 13.339C14.8532 13.122 15.8938 13.0002 16.9935 13.0002C20.8631 13.0002 24 14.5078 24 16.3675C24 17.5333 22.7674 18.5607 20.8944 19.1651Z"
                fill="#8190A4"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M16.3386 10.4154C17.3803 9.33196 18 7.97402 18 6.5C18 4.89321 17.2637 3.42437 16.0469 2.29869C16.4582 2.17577 16.8954 2.10956 17.3488 2.10956C19.7672 2.10956 21.7278 3.99407 21.7278 6.31874C21.7278 8.64341 19.7672 10.5279 17.3488 10.5279C17.0011 10.5279 16.6629 10.489 16.3386 10.4154Z"
                fill="#425165"
              />
              <ellipse
                cx="9.36317"
                cy="18.5"
                rx="9.36317"
                ry="4.5"
                fill="#8190A4"
              />
              <ellipse
                cx="9.88336"
                cy="6.5"
                rx="5.72194"
                ry="5.5"
                fill="#425165"
              />
            </svg>

            <transition name="fade">
              <span
                v-show="!isCollapsed"
                class="hidden translate-y-px font-normal transition-all md:block"
                >Users</span
              >
            </transition>
          </RouterLink>
        </li>
        <li>
          <RouterLink
            :to="`/${state.lang}/admin/bids`"
            class="flex w-full gap-1 bg-[#1C263D] py-6 font-medium text-[#8291A5] ring-inset transition-all hover:bg-[#273146] focus:ring-1 md:px-3 md:py-3"
            title="Bids"
          >
            <svg
              class="pointer-events-none mx-[10px] w-5 flex-shrink-0 select-none"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0 5C0 3.34315 1.34315 2 3 2H21C22.6569 2 24 3.34315 24 5V9.77778C22.6745 9.7778 21.6 10.7727 21.6 12C21.6 13.2273 22.6745 14.2222 24 14.2222V19C24 20.6569 22.6569 22 21 22H3C1.34315 22 0 20.6569 0 19V14.2222C1.21593e-05 14.2222 2.43187e-05 14.2222 3.6478e-05 14.2222C1.32552 14.2222 2.40004 13.2273 2.40004 12C2.40004 10.7727 1.32552 9.77778 3.6478e-05 9.77778C2.43187e-05 9.77778 1.21593e-05 9.77778 0 9.77778V5Z"
                fill="#425165"
              />
              <path
                d="M11.0878 8.84554C11.4413 8.05855 12.5587 8.05855 12.9122 8.84554L13.3429 9.80443C13.4933 10.1392 13.8151 10.3648 14.1811 10.3919L15.1528 10.4641C16.061 10.5315 16.4137 11.6789 15.7002 12.2448L15.0769 12.7392C14.7673 12.9847 14.6314 13.3895 14.7299 13.7721L14.9399 14.587C15.1599 15.4411 14.2469 16.1411 13.4792 15.707L12.4923 15.1488C12.1868 14.976 11.8132 14.976 11.5077 15.1488L10.5208 15.707C9.75306 16.1411 8.84008 15.4411 9.06011 14.587L9.27005 13.7721C9.36863 13.3895 9.23266 12.9847 8.92309 12.7392L8.29981 12.2448C7.5863 11.6789 7.93901 10.5315 8.8472 10.4641L9.81891 10.3919C10.1849 10.3648 10.5067 10.1392 10.6571 9.80443L11.0878 8.84554Z"
                fill="#C4C4C4"
              />
            </svg>

            <transition name="fade">
              <span
                v-show="!isCollapsed"
                class="hidden translate-y-px font-normal transition-all md:block"
                >Bids</span
              >
            </transition>
          </RouterLink>
        </li>

        <li>
          <RouterLink
            :to="`/${state.lang}/admin/orders`"
            class="flex w-full gap-1 bg-[#1C263D] py-6 font-medium text-[#8291A5] ring-inset transition-all hover:bg-[#273146] focus:ring-1 md:px-3 md:py-3"
            title="Orders"
          >
            <svg
              class="pointer-events-none mx-[10px] w-5 flex-shrink-0 select-none"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0)">
                <circle cx="17.9101" cy="18" r="2" fill="#425165" />
                <circle cx="6" cy="18" r="2" fill="#425165" />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M19 4H0V9.90909C0 12.6705 2.23858 14.9091 5 14.9091H19C21.7614 14.9091 24 12.6705 24 9.90909V9C24 6.23858 21.7614 4 19 4ZM13.1711 6.63636C12.7568 6.63636 12.4211 6.97215 12.4211 7.38636C12.4211 8.07672 12.9807 8.63636 13.671 8.63636H18.3684C18.9207 8.63636 19.3684 8.18864 19.3684 7.63636C19.3684 7.08408 18.9207 6.63636 18.3684 6.63636H13.1711Z"
                  fill="#8291A5"
                />
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>

            <transition name="fade">
              <span
                v-show="!isCollapsed"
                class="hidden translate-y-px font-normal transition-all md:block"
                >Orders</span
              >
            </transition>
          </RouterLink>
        </li>
        <li>
          <RouterLink
            :to="`/${state.lang}/admin/reports`"
            class="flex w-full gap-1 bg-[#1C263D] py-6 font-medium text-[#8291A5] ring-inset transition-all hover:bg-[#273146] focus:ring-1 md:px-3 md:py-3"
            title="Reports"
          >
            <svg
              class="pointer-events-none mx-[10px] w-5 flex-shrink-0 select-none"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6 15.8571H2.57143C1.88944 15.8571 1.23539 15.5862 0.753154 15.104C0.270917 14.6218 0 13.9677 0 13.2857V5.57143C0 4.88944 0.270917 4.23539 0.753154 3.75315C1.23539 3.27092 1.88944 3 2.57143 3H15.4286C16.1106 3 16.7646 3.27092 17.2468 3.75315C17.7291 4.23539 18 4.88944 18 5.57143V8H11.1381C11.0452 7.86094 10.9383 7.7303 10.8183 7.6103C10.336 7.12806 9.68199 6.85714 9 6.85714C8.31802 6.85714 7.66396 7.12806 7.18173 7.6103C6.69949 8.09253 6.42857 8.74659 6.42857 9.42857C6.42857 9.43695 6.42861 9.44532 6.42869 9.45369C6.15655 9.90525 6 10.4343 6 11V15.8571Z"
                fill="#425165"
              />
              <path
                d="M5.5 6.5H11.5L13.5 8L9.5 14.5L4.5 12L5.5 6.5Z"
                fill="#425165"
              />
              <path
                d="M8.57143 20.8571H21.4286C22.1106 20.8571 22.7646 20.5862 23.2468 20.104C23.7291 19.6218 24 18.9677 24 18.2857V10.5714C24 9.88944 23.7291 9.23539 23.2468 8.75315C22.7646 8.27092 22.1106 8 21.4286 8H8.57143C7.88944 8 7.23539 8.27092 6.75315 8.75315C6.27092 9.23539 6 9.88944 6 10.5714V18.2857C6 18.9677 6.27092 19.6218 6.75315 20.104C7.23539 20.5862 7.88944 20.8571 8.57143 20.8571ZM17.5714 14.4286C17.5714 15.1106 17.3005 15.7646 16.8183 16.2468C16.336 16.7291 15.682 17 15 17C14.318 17 13.664 16.7291 13.1817 16.2468C12.6995 15.7646 12.4286 15.1106 12.4286 14.4286C12.4286 13.7466 12.6995 13.0925 13.1817 12.6103C13.664 12.1281 14.318 11.8571 15 11.8571C15.682 11.8571 16.336 12.1281 16.8183 12.6103C17.3005 13.0925 17.5714 13.7466 17.5714 14.4286Z"
                fill="#7B8A9E"
              />
            </svg>

            <transition name="fade">
              <span
                v-show="!isCollapsed"
                class="hidden translate-y-px font-normal transition-all md:block"
                >Reports</span
              >
            </transition>
          </RouterLink>
        </li>
        <!-- <li>
          <RouterLink
            to="/notification"
            class=" flex w-full gap-1 bg-[#1C263D] py-6 font-medium text-[#8291A5] ring-inset transition-all hover:bg-[#273146] focus:ring-1 md:px-3 md:py-3"
            title="Notification"
          >
            <svg
              class="pointer-events-none mx-[10px] w-5 flex-shrink-0 select-none"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 10C0 7.79086 1.79086 6 4 6H20C22.2091 6 24 7.79086 24 10V18H4C1.79086 18 0 16.2091 0 14V10Z"
                fill="#425165"
              />
              <circle cx="6" cy="12" r="1" fill="#8291A5" />
              <circle cx="9" cy="12" r="1" fill="#8291A5" />
              <circle cx="12" cy="12" r="1" fill="#8291A5" />
            </svg>

            <transition name="fade">
              <span
                v-show="!isCollapsed"
                class="hidden translate-y-px font-normal transition-all md:block"
                >Notification</span
              >
            </transition>
          </RouterLink>
        </li> -->
        <!-- <li>
          <RouterLink
            to="/chat"
            class=" flex w-full gap-1 bg-[#1C263D] py-6 font-medium text-[#8291A5] ring-inset transition-all hover:bg-[#273146] focus:ring-1 md:px-3 md:py-3"
            title="Chat"
          >
            <svg
              class="pointer-events-none mx-[10px] w-5 flex-shrink-0 select-none"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 6.5C6 4.567 7.567 3 9.5 3H19C21.7614 3 24 5.23858 24 8V10H9.5C7.567 10 6 8.433 6 6.5V6.5Z"
                fill="#425165"
              />
              <path
                d="M0 19C0 16.2386 2.23858 14 5 14H14.5C16.433 14 18 15.567 18 17.5V17.5C18 19.433 16.433 21 14.5 21H0V19Z"
                fill="#8291A5"
              />
            </svg>

            <transition name="fade">
              <span
                v-show="!isCollapsed"
                class="hidden translate-y-px font-normal transition-all md:block"
                >Messages</span
              >
            </transition>
          </RouterLink>
        </li> -->
        <!-- <li>
          <RouterLink
            to="/settings"
            class=" flex w-full gap-1 bg-[#1C263D] py-6 font-medium text-[#8291A5] ring-inset transition-all hover:bg-[#273146] focus:ring-1 md:px-3 md:py-3"
            title="Settings"
          >
            <svg
              class="pointer-events-none mx-[10px] w-5 flex-shrink-0 select-none"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M14.0488 2.6088C13.5263 0.463733 10.4737 0.463733 9.95119 2.6088C9.87318 2.93113 9.72016 3.23049 9.5046 3.48252C9.28904 3.73454 9.01702 3.93212 8.71068 4.05915C8.40434 4.18619 8.07234 4.23911 7.74168 4.2136C7.41103 4.18809 7.09107 4.08487 6.80784 3.91234C4.92128 2.76281 2.76246 4.92162 3.912 6.80818C4.65452 8.02647 3.99587 9.61602 2.60983 9.9529C0.46339 10.474 0.46339 13.528 2.60983 14.0478C2.93225 14.1259 3.23166 14.279 3.48369 14.4948C3.73571 14.7105 3.93323 14.9827 4.06014 15.2892C4.18706 15.5957 4.2398 15.9279 4.21405 16.2586C4.18831 16.5893 4.08481 16.9093 3.912 17.1925C2.76246 19.0791 4.92128 21.2379 6.80784 20.0883C7.09101 19.9155 7.411 19.812 7.74175 19.7863C8.07249 19.7605 8.40464 19.8133 8.71114 19.9402C9.01765 20.0671 9.28985 20.2646 9.50557 20.5167C9.7213 20.7687 9.87445 21.0681 9.95256 21.3905C10.4737 23.537 13.5277 23.537 14.0474 21.3905C14.1258 21.0683 14.2791 20.7691 14.4949 20.5172C14.7107 20.2654 14.9828 20.068 15.2892 19.9411C15.5956 19.8142 15.9277 19.7614 16.2583 19.787C16.589 19.8126 16.9089 19.9158 17.1922 20.0883C19.0787 21.2379 21.2375 19.0791 20.088 17.1925C19.9155 16.9093 19.8122 16.5893 19.7867 16.2587C19.7611 15.928 19.8139 15.596 19.9407 15.2896C20.0676 14.9832 20.265 14.711 20.5169 14.4952C20.7687 14.2795 21.0679 14.1262 21.3902 14.0478C23.5366 13.5266 23.5366 10.4727 21.3902 9.9529C21.0678 9.87479 20.7683 9.72164 20.5163 9.50592C20.2643 9.29019 20.0668 9.01799 19.9399 8.71149C19.8129 8.40498 19.7602 8.07283 19.7859 7.74209C19.8117 7.41135 19.9152 7.09136 20.088 6.80818C21.2375 4.92162 19.0787 2.76281 17.1922 3.91234C16.909 4.08516 16.589 4.18865 16.2583 4.2144C15.9275 4.24014 15.5954 4.18741 15.2889 4.06049C14.9823 3.93357 14.7102 3.73606 14.4944 3.48403C14.2787 3.232 14.1255 2.93259 14.0474 2.61018L14.0488 2.6088ZM12 16.1255C13.0941 16.1255 14.1433 15.6909 14.9169 14.9173C15.6905 14.1436 16.1251 13.0944 16.1251 12.0003C16.1251 10.9063 15.6905 9.85705 14.9169 9.08344C14.1433 8.30983 13.0941 7.87521 12 7.87521C10.9059 7.87521 9.85671 8.30983 9.08309 9.08344C8.30948 9.85705 7.87487 10.9063 7.87487 12.0003C7.87487 13.0944 8.30948 14.1436 9.08309 14.9173C9.85671 15.6909 10.9059 16.1255 12 16.1255V16.1255Z"
                fill="#8291A5"
              />
            </svg>

            <transition name="fade">
              <span
                v-show="!isCollapsed"
                class="hidden translate-y-px font-normal transition-all md:block"
                >Settings</span
              >
            </transition>
          </RouterLink>
        </li> -->
        <li>
          <RouterLink
            :to="`/${state.lang}`"
            class="flex w-full gap-1 bg-[#1C263D] py-6 font-medium text-[#8291A5] ring-inset transition-all hover:bg-[#273146] focus:outline-none focus:ring-1 md:px-3 md:py-3"
            title="To Home"
          >
            <svg
              class="pointer-events-none mx-[10px] w-5 flex-shrink-0 select-none"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 11.25C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75V11.25ZM22.5303 12.5303C22.8232 12.2374 22.8232 11.7626 22.5303 11.4697L17.7574 6.6967C17.4645 6.40381 16.9896 6.40381 16.6967 6.6967C16.4038 6.98959 16.4038 7.46447 16.6967 7.75736L20.9393 12L16.6967 16.2426C16.4038 16.5355 16.4038 17.0104 16.6967 17.3033C16.9896 17.5962 17.4645 17.5962 17.7574 17.3033L22.5303 12.5303ZM9 12.75H22V11.25H9V12.75Z"
                fill="#8291A5"
              />
              <path
                d="M1 4C1 2.34315 2.34315 1 4 1H14V8C14 8.55228 13.5523 9 13 9H4C2.34315 9 1 7.65685 1 6V4Z"
                fill="#425165"
              />
              <rect
                x="1"
                y="20"
                width="15"
                height="5"
                transform="rotate(-90 1 20)"
                fill="#425165"
              />
              <path
                d="M1 18C1 16.3431 2.34315 15 4 15H13C13.5523 15 14 15.4477 14 16V23H4C2.34315 23 1 21.6569 1 20V18Z"
                fill="#425165"
              />
            </svg>

            <transition name="fade">
              <span
                v-show="!isCollapsed"
                class="hidden translate-y-px font-normal transition-all md:block"
                >To Home</span
              >
            </transition>
          </RouterLink>
        </li>
      </ul>
      <button
        @click="isCollapsed = !isCollapsed"
        class="shadow-x fixed bottom-0 my-3 mx-auto hidden h-7 w-7 rounded-full bg-indigo-600 ring-inset ring-offset-1 transition hover:bg-indigo-800 focus:outline-none focus:ring-1 md:block"
        :class="
          !isCollapsed
            ? 'translate-x-[11.1rem] rotate-180'
            : 'translate-x-[3.1rem]'
        "
        style="transition: transform 0.2s ease-out, left 0.3s ease-out"
      >
        <svg
          class="pointer-events-none mx-auto h-4 w-4 flex-shrink-0 select-none text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          ></path>
        </svg>
      </button>
    </div>

    <div class="w-full p-5">
      <h1 class="mb-5 font-merriweather text-3xl font-extrabold">
        {{ title }}
      </h1>

      <slot />
    </div>
  </div>
</template>
