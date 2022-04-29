<script setup>
import BaseTitle from '../components/Base/BaseTitle.vue'
import BaseInput from '../components/Base/BaseInput.vue'
import BaseButton from '../components/Base/BaseButton.vue'
import { useStore } from '../store'
import BaseSelect from '../components/Base/BaseSelect.vue'
import { useAxios } from '../functions'
import { useRouter } from 'vue-router'
import BaseError from '../components/Base/BaseError.vue'
import BasePhone from '../components/Base/BasePhone.vue'
import BaseCountryCode from '../components/Base/BaseCountryCode.vue'
import { useCookies } from 'vue3-cookies'
import UserLayout from '../components/UserLayout.vue'
const { $state: state } = $(useStore())
const { cookies } = useCookies()

const router = useRouter()
let name = $ref('')
let email = $ref('')
let address = $ref('')
let password = $ref('')
let confirmPassword = $ref('')
let cc = $ref('+20')
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
  confirmPasswordPlaceholder: {
    ar: 'تأكيد كلمه السر',
    en: 'Confirm Password',
  },
  birthdatePlaceholder: {
    ar: 'تاريخ الميلاد',
    en: 'Birthdate',
  },
  ccPlaceholder: {
    ar: 'كود البلد',
    en: 'Country Code',
  },
  phonePlaceholder: {
    ar: 'رقم التليفون',
    en: 'Phone Number',
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
    phone: `${cc} ${phone.replaceAll(' ', '')}`,
    gender,
  }

  let { response } = await useAxios('post', '/auth/register', body)

  if (response.data.ok) {
    let data = response.data.data
    state.user = data.user
    cookies.set('authToken', data.token, '3d')
    cookies.set('isLoggedIn', true, '3d')
    router.replace(`/${state.lang}/`)
  } else {
    error = response.data.message
  }
}
</script>

<template>
  <UserLayout>
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
            :placeholder="$t(text.confirmPasswordPlaceholder)"
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

          <BaseSelect
            v-model="gender"
            class="!w-full"
            @updateInput="(val) => (gender = val)"
            :placeholder="$t(text.genderPlaceholder)"
          >
            <option class="capitalize" value="male">{{ $t(text.male) }}</option>
            <option class="capitalize" value="female">
              {{ $t(text.female) }}
            </option>
          </BaseSelect>

          <div class="flex items-center gap-3 sm:col-span-2">
            <BaseCountryCode
              v-model="cc"
              @updateInput="(val) => (cc = val)"
              :placeholder="$t(text.ccPlaceholder)"
            >
              <option class="capitalize" value="+20">+20</option>
              <option class="capitalize" value="+1">+1</option>
            </BaseCountryCode>

            <BasePhone
              type="tel"
              class="!w-full sm:col-span-2"
              :placeholder="$t(text.phonePlaceholder)"
              v-model="phone"
              @updateInput="(val) => (phone = val)"
            />
          </div>
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
  </UserLayout>
</template>
