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
  verifyEmail: {
    ar: 'نسيت كلمة المرور',
    en: 'Verify  Email',
  },
  emailPlaceholder: {
    ar: 'البريد الالكتروني',
    en: 'Email',
  },
  sendMail: {
    ar: 'ارسال بريد التأكيد',
    en: 'Send Verification Email',
  },
  haveAccount: {
    ar: 'لدي حساب؟',
    en: `Already Have an Account?`,
  },
})

const sendVerificationEmail = async () => {
  let { response } = await useAxios('get', '/auth/resend-verification-link')
  console.log(response)
}
</script>

<template>
  <UserLayout>
    <div
      class="max-w-[850px] rounded-md bg-white p-4 shadow-sm sm:mx-auto sm:w-full sm:p-6"
    >
      <BaseTitle>{{ $t(text.verifyEmail) }}</BaseTitle>
      <div class="mt-6 mb-2">You need to verify your email to continue.</div>
      <div class="flex flex-col items-start gap-4">
        <BaseButton
          @click="sendVerificationEmail"
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
    </div>
  </UserLayout>
</template>
