<script setup>
import BaseTitle from '../components/Base/BaseTitle.vue'
import BaseInput from '../components/Base/BaseInput.vue'
import BaseButton from '../components/Base/BaseButton.vue'
import BaseError from '../components/Base/BaseError.vue'
import BaseWarn from '../components/Base/BaseWarn.vue'
import { useStore } from '../store'
import { useAxios } from '../functions'
import { useRouter } from 'vue-router'
import { useCookies } from 'vue3-cookies'
import { inject, onMounted } from 'vue'
import GAuth from 'vue3-google-oauth2'
const { $state: state } = $(useStore())

const router = useRouter()
const { cookies } = useCookies()
let Vue3GoogleOauth
let email = $ref('mario@gmail.com')
let password = $ref('m123456')
let isLoading = $ref(false)
let error = $ref('')

const text = $ref({
  myAccount: {
    ar: 'تسجيل الدخول',
    en: 'Login',
  },
  emailPlaceholder: {
    ar: 'البريد الالكتروني',
    en: 'Email',
  },
  passwordPlaceholder: {
    ar: 'كلمه السر',
    en: 'Password',
  },
  loginPlaceholder: {
    ar: 'تسجيل الدخول',
    en: 'Login',
  },
  newHere: {
    ar: 'جديد هنا؟',
    en: `Don't have an Account Yet ? `,
  },
  forgotPassword: {
    ar: 'هل نسيت كلمه السر؟',
    en: `Forgot Password ?`,
  },
})

Vue3GoogleOauth = inject('Vue3GoogleOauth')

const loginUser = async () => {
  isLoading = true
  let body = { email, password }

  let { response } = await useAxios('post', '/auth/login', body)

  if (response.data.ok) {
    let data = response.data.data
    state.user = data.user
    cookies.set('authToken', data.token, '3d')
    cookies.set('isLoggedIn', true, '3d')
    router.replace(`/${state.lang}/`)
  } else {
    error = response.data.message
  }
  isLoading = false
}

const loginWGoogle = async () => {
  let oAuth = Vue3GoogleOauth.instance
  let user = await oAuth.signIn()
  console.log(user)
}
</script>

<template>
  <div
    class="max-w-[850px] rounded-md bg-white p-4 shadow-sm sm:mx-auto sm:w-full sm:p-6"
  >
    <BaseTitle>{{ $t(text.myAccount) }}</BaseTitle>

    <button
      class="!mt-6 flex items-center gap-2 rounded-md bg-slate-200 py-3 px-6 font-semibold shadow-sm transition-colors hover:bg-slate-300 disabled:!bg-red-100"
      @click="loginWGoogle"
      :disabled="Vue3GoogleOauth.isAthorized && !Vue3GoogleOauth.isInit"
    >
      <img src="/images/gIcon.svg" class="h-6 w-6" alt="" />

      <span class="mt-0.5"> Continue with Google</span>
    </button>

    <div class="relative mt-6 h-px w-full bg-bi-200">
      <span
        class="absolute left-1/2 -top-2.5 block -translate-x-1/2 bg-white px-2"
        >OR</span
      >
    </div>

    <form @submit.prevent="loginUser">
      <div class="mt-6 mb-4 grid items-start gap-4 sm:grid-cols-2">
        <BaseWarn
          v-if="router.currentRoute.value.query.ref === `token_expired`"
          class="sm:col-span-2"
          >Your token has expired, please login again.</BaseWarn
        >
        <BaseInput
          type="email"
          class="!w-full"
          :placeholder="$t(text.emailPlaceholder)"
          @updateInput="(val) => (email = val)"
          v-model="email"
          required
        />
        <BaseInput
          type="password"
          class="!w-full"
          :placeholder="$t(text.passwordPlaceholder)"
          v-model="password"
          @updateInput="(val) => (password = val)"
          required
        />
      </div>
      <transition name="fade">
        <BaseError class="mb-3" v-if="error">{{ error }}</BaseError>
      </transition>
      <div class="flex flex-col items-start gap-4">
        <BaseButton
          class="disabled:bg-blue-300"
          :disabled="isLoading && 'disabled'"
          >{{ $t(text.loginPlaceholder) }}</BaseButton
        >
        <div class="flex flex-col">
          <RouterLink
            :to="`/${state.lang}/register`"
            class="text-bi-300 transition-colors hover:text-bi-400/50"
            >{{ $t(text.newHere) }}</RouterLink
          >
          <RouterLink
            :to="`/${state.lang}/register`"
            class="text-bi-300 transition-colors hover:text-bi-400/50"
            >{{ $t(text.forgotPassword) }}</RouterLink
          >
        </div>
      </div>
    </form>
  </div>
</template>
