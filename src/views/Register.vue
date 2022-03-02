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
    ar: 'حساب جديد',
    en: 'New Account',
  },
  fullNamePlaceholder: {
    ar: 'الاسم كامل',
    en: 'Full Name',
  },
  phoneNumberPlaceholder: {
    ar: 'رقم الهاتف',
    en: 'Phone Number',
  },
  emailPlaceholder: {
    ar: 'البريد الالكتروني',
    en: 'Email',
  },
  addressPlaceholder: {
    ar: 'العنوان',
    en: 'Address',
  },
  passwordPlaceholder:{
    ar: 'كلمه السر',
    en: 'Password',
  },
  newPasswordPlaceholder:{
    ar: 'كلمه السر مره اخري',
    en: 'Password Again',
  },
  birthdatePlaceholder:{
    ar: 'تاريخ الميلاد',
    en: 'Birthdate',
  },
  male:{
    ar: 'ذكر',
    en: 'Male',
  },
  female:{
    ar: 'أنثي',
    en: 'Female',
  },
  loginPlaceholder:{
    ar: 'انشاء حساب',
    en: 'Create Account',
  },
  account:{
    ar: 'لدي حساب؟',
    en: `Already Have an Account?`,
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
          :placeholder="$t(text.fullNamePlaceholder)"
          v-model="fullName"
          @updateInput="(val) => (fullName = val)"
        />
        <BaseInput
          type="text"
          class="!w-full"
          :placeholder="$t(text.phoneNumberPlaceholder)"
          v-model="phoneNumber"
          @updateInput="(val) => (phoneNumber = val)"
        />
        <BaseInput
          type="text"
          class="!w-full"
          :placeholder="$t(text.emailPlaceholder)"
          v-model="email"
          @updateInput="(val) => (email = val)"
        />
        <BaseInput
          type="text"
          class="!w-full"
          :placeholder="$t(text.addressPlaceholder)"
          v-model="address"
          @updateInput="(val) => (address = val)"
        />
        <BaseInput
          type="password"
          class="!w-full"
          :placeholder="$t(text.passwordPlaceholder)"
          v-model="password"
          @updateInput="(val) => (password = val)"
        />
        <BaseInput
          type="password"
          class="!w-full"
          :placeholder="$t(text.newPasswordPlaceholder)"
          v-model="confirmPassword"
          @updateInput="(val) => (confirmPassword = val)"
        />
        <BaseInput
          type="date"
          class="!w-full"
          :placeholder="$t(text.birthdatePlaceholder)"
          v-model="birthdate"
          @updateInput="(val) => (birthdate = val)"
        />
        <select
          :value="gender"
          @change="(e) => (gender = e.target.value)"
          class="peer w-full rounded-md bg-bi-600 px-3 py-1 placeholder:text-transparent focus:outline-none sm:w-full"
        >
          <option class="capitalize" value="male">{{ $t(text.male) }}</option>
          <option class="capitalize" value="female">{{ $t(text.female) }}</option>
        </select>
      </div>

      <div class="flex flex-col items-start gap-4">
        <BaseButton>{{ $t(text.loginPlaceholder) }}</BaseButton>
        <div class="flex flex-col">
          <RouterLink
            :to="`/${state.lang}/login`"
            class="text-indigo-400 transition-colors hover:text-indigo-600"
            >{{ $t(text.account) }}</RouterLink
          >
        </div>
      </div>
    </form>
  </div>
</template>
