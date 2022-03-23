<script setup>
import BaseTitle from '../components/Base/BaseTitle.vue'
import BaseInput from '../components/Base/BaseInput.vue'
import BaseButton from '../components/Base/BaseButton.vue'
import { useStore } from '../store'
import BaseSelect from '../components/Base/BaseSelect.vue'
const { $state: state } = $(useStore())

let fullName = $ref('')
let email = $ref('')
let address = $ref('')
let password = $ref('')
let confirmPassword = $ref('')
let gender = $ref('male')

const text = $ref({
  myAccount: {
    ar: 'حساب جديد',
    en: 'New Account',
  },
  fullNamePlaceholder: {
    ar: 'الاسم كامل',
    en: 'Full Name',
  },
  emailPlaceholder: {
    ar: 'البريد الالكتروني',
    en: 'Email',
  },
  addressPlaceholder: {
    ar: 'العنوان',
    en: 'Address',
  },
  passwordPlaceholder: {
    ar: 'كلمه السر',
    en: 'Password',
  },
  newPasswordPlaceholder: {
    ar: 'تأكيد كلمه السر',
    en: 'Confirm Password',
  },
  birthdatePlaceholder: {
    ar: 'تاريخ الميلاد',
    en: 'Birthdate',
  },
  genderPlaceholder: {
    ar: 'الجنس',
    en: 'Gender',
  },
  male: {
    ar: 'ذكر',
    en: 'Male',
  },
  female: {
    ar: 'أنثي',
    en: 'Female',
  },
  loginPlaceholder: {
    ar: 'انشاء حساب',
    en: 'Create Account',
  },
  account: {
    ar: 'لدي حساب؟',
    en: `Already Have an Account?`,
  },
})
</script>

<template>
  <div
    class="mx-4 max-w-[850px] rounded-md bg-white p-4 shadow-sm sm:mx-auto sm:w-full sm:p-6"
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
          :placeholder="$t(text.emailPlaceholder)"
          v-model="email"
          @updateInput="(val) => (email = val)"
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
          type="text"
          class="!w-full"
          :placeholder="$t(text.addressPlaceholder)"
          v-model="address"
          @updateInput="(val) => (address = val)"
        />
        <div class="flex items-center gap-5">
          <label for="gender" class="font-medium text-black">{{
            $t(text.genderPlaceholder)
          }}</label>
          <BaseSelect
            :value="gender"
            id="gender"
            @change="(e) => (gender = e.target.value)"
          >
            <option class="capitalize" value="male">{{ $t(text.male) }}</option>
            <option class="capitalize" value="female">
              {{ $t(text.female) }}
            </option>
          </BaseSelect>
        </div>
      </div>

      <div class="flex flex-col items-start gap-4">
        <BaseButton>{{ $t(text.loginPlaceholder) }}</BaseButton>
        <div class="flex flex-col">
          <RouterLink
            :to="`/${state.lang}/login`"
            class="text-bi-300 transition-colors hover:text-bi-400/50"
            >{{ $t(text.account) }}</RouterLink
          >
        </div>
      </div>
    </form>
  </div>
</template>
