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
import UserLayout from '../components/UserLayout.vue'
const { $state: state } = $(useStore())

const router = useRouter()
const { cookies } = useCookies()
let email = $ref('mario@gmail.com')
let isLoading = $ref(false)
let error = $ref('')

const text = $ref({
  forgotPassword: {
    ar: 'نسيت كلمة المرور',
    en: 'Forgot Password',
  },
  emailPlaceholder: {
    ar: 'البريد الالكتروني',
    en: 'Email',
  },
  sendMail: {
    ar: 'ارسال بريد الكتروني',
    en: 'Send Email',
  },
  haveAccount: {
    ar: 'لدي حساب؟',
    en: `Already Have an Account?`,
  },
})

const sendRecoveryEmail = async () => {
  let { response } = useAxios('get', '/auth/forgot-password')
  console.log(response)
}
</script>

<template>
  <UserLayout>
    <div
      class="max-w-[850px] rounded-md bg-white p-4 shadow-sm sm:mx-auto sm:w-full sm:p-6"
    >
      <BaseTitle>{{ $t(text.forgotPassword) }}</BaseTitle>
      <form @submit.prevent="sendRecoveryEmail">
        <div class="mt-6 mb-4 grid items-start gap-4 sm:grid-cols-2">
          <BaseInput
            type="email"
            class="!w-full"
            :placeholder="$t(text.emailPlaceholder)"
            @updateInput="(val) => (email = val)"
            v-model="email"
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
            >{{ $t(text.sendMail) }}</BaseButton
          >
          <div class="flex flex-col">
            <RouterLink
              :to="`/${state.lang}/login`"
              class="text-bi-300 transition-colors hover:text-bi-400/50"
              >{{ $t(text.haveAccount) }}</RouterLink
            >
          </div>
        </div>
      </form>
    </div>
  </UserLayout>
</template>
