<script setup>
import BaseTitle from '../components/Base/BaseTitle.vue'
import BaseInput from '../components/Base/BaseInput.vue'
import BaseButton from '../components/Base/BaseButton.vue'
import { useStore } from '../store'
import { onMounted } from 'vue'
import { useAxios } from '../functions'
import { tSTypePredicate } from '@babel/types'
import { useRouter } from 'vue-router'
const { $state: state } = $(useStore())

const router = useRouter()
let email = $ref('mario@gmail.com')
let password = $ref('m123456')
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

const loginUser = async () => {
  let body = { email, password }

  let { isLoading, data, err } = await useAxios('post', '/auth/login', body)
  error = err

  if (!err) {
    localStorage.setItem('user', JSON.stringify(data))
    router.replace(`/${state.lang}/`)
    state.user = data
  }
}
</script>

<template>
  <div
    class="mx-4 max-w-[850px] rounded-md bg-white p-4 shadow-sm sm:mx-auto sm:w-full sm:p-6"
  >
    <BaseTitle>{{ $t(text.myAccount) }}</BaseTitle>

    <form @submit.prevent="loginUser">
      <div class="mt-6 mb-4 grid items-start gap-4 sm:grid-cols-2">
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
        <span
          v-if="error"
          class="mb-3 block rounded-md bg-red-300 px-3 py-2 capitalize text-black transition-all"
          >{{ error }}</span
        >
      </transition>
      <div class="flex flex-col items-start gap-4">
        <BaseButton>{{ $t(text.loginPlaceholder) }}</BaseButton>
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
