<script setup>
import MazInput from 'maz-ui/components/MazInput'
import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput'
import 'maz-ui/css/main.css'

import BaseTitle from '../components/Base/BaseTitle.vue'
import BaseInput from '../components/Base/BaseInput.vue'
import BaseButton from '../components/Base/BaseButton.vue'
import { useStore } from '../store'
import BaseSelect from '../components/Base/BaseSelect.vue'
import { useAxios } from '../functions'
import { useRouter } from 'vue-router'
import BaseError from '../components/Base/BaseError.vue'
const { $state: state } = $(useStore())

const router = useRouter()
let name = $ref('')
let email = $ref('')
let address = $ref('')
let password = $ref('')
let confirmPassword = $ref('')
let phone = $ref('')
let gender = $ref('male')
let error = $ref(null)

const text = $ref({
  myAccount: {
    ar: 'حساب جديد',
    en: 'New Account',
  },
  namePlaceholder: {
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

const registerUser = async () => {
  let body = {
    name,
    email,
    address,
    password,
    confirmPassword,
    phone,
    gender,
  }

  let { response, isLoading } = await useAxios('post', '/auth/register', body)

  if (response.data.ok) {
    let data = response.data.data
    state.user = data.user
    cookies.set('authToken', data.token, '3d')
    router.replace(`/${state.lang}/`)
  } else {
    error = response.data.message
  }
}
</script>

<template>
  <div
    class="max-w-[850px] rounded-md bg-white p-4 shadow-sm sm:mx-auto sm:w-full sm:p-6"
  >
    <BaseTitle>{{ $t(text.myAccount) }}</BaseTitle>

    <form @submit.prevent="registerUser">
      <div class="mt-6 mb-4 grid items-start gap-4 sm:grid-cols-2">
        <BaseInput
          type="text"
          class="!w-full"
          :placeholder="$t(text.namePlaceholder)"
          v-model="name"
          @updateInput="(val) => (name = val)"
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
        <MazPhoneNumberInput
          class="sm:col-span-2"
          v-model="phone"
          show-code-on-list
          default-country-code="EG"
          id="phone"
          :preferred-countries="['EG', 'US', 'GB']"
        />
      </div>
      <transition name="fade">
        <BaseError class="mb-3" v-if="error">{{ error }}</BaseError>
      </transition>
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
