<script setup>
import BaseTitle from '../components/Base/BaseTitle.vue'
import BaseInput from '../components/Base/BaseInput.vue'
import BaseButton from '../components/Base/BaseButton.vue'
import { useStore } from '../store'
const { $state: state } = $(useStore())

let fullName = $ref('')
let phoneNumber = $ref('')
let email = $ref('')
let address = $ref('')
let password = $ref('')
let confirmPassword = $ref('')
let birthdate = $ref('')
let gender = $ref('male')
let profilePicture = $ref('')

const text = $ref({
  myAccount: {
    ar: 'انشاء حساب',
    en: 'Register',
  },
})
</script>

<template>
  <div
    class="mx-auto w-full max-w-[850px] rounded-md p-4 sm:border sm:border-bi-600 sm:p-6"
  >
    <BaseTitle>{{ $t(text.myAccount) }}</BaseTitle>

    <form @submit.prevent="">
      <div class="mt-6 mb-4 grid items-start gap-4 sm:grid-cols-2">
        <BaseInput
          type="text"
          class="!w-full"
          placeholder="Enter your Full Name"
          v-model="fullName"
          @updateInput="(val) => (fullName = val)"
        />
        <BaseInput
          type="text"
          class="!w-full"
          placeholder="Enter your Phone Number"
          v-model="phoneNumber"
          @updateInput="(val) => (phoneNumber = val)"
        />
        <BaseInput
          type="text"
          class="!w-full"
          placeholder="Enter your Email"
          v-model="email"
          @updateInput="(val) => (email = val)"
        />
        <BaseInput
          type="text"
          class="!w-full"
          placeholder="Enter your Address"
          v-model="address"
          @updateInput="(val) => (address = val)"
        />
        <BaseInput
          type="password"
          class="!w-full"
          placeholder="Enter your Password"
          v-model="password"
          @updateInput="(val) => (password = val)"
        />
        <BaseInput
          type="password"
          class="!w-full"
          placeholder="Enter your Password Again"
          v-model="confirmPassword"
          @updateInput="(val) => (confirmPassword = val)"
        />
        <BaseInput
          type="date"
          class="!w-full"
          placeholder="Enter your Birthdate"
          v-model="birthdate"
          @updateInput="(val) => (birthdate = val)"
        />
        <select
          :value="gender"
          @change="(e) => (gender = e.target.value)"
          class="peer w-full rounded-md bg-bi-600 px-3 py-1 placeholder:text-transparent focus:outline-none sm:w-full"
        >
          <option class="capitalize" value="male">Male</option>
          <option class="capitalize" value="female">Female</option>
        </select>
      </div>

      <div class="flex flex-col items-start gap-4">
        <BaseButton>Login</BaseButton>
        <div class="flex flex-col">
          <RouterLink
            :to="`/${state.lang}/login`"
            class="text-indigo-400 transition-colors hover:text-indigo-600"
            >Already Have an Account ?</RouterLink
          >
        </div>
      </div>
    </form>
  </div>
</template>
