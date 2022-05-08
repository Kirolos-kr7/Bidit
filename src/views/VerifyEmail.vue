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
import { onMounted } from 'vue'
const { $state: state } = $(useStore())

const router = useRouter()
const { cookies } = useCookies()
let email = $ref('mario@gmail.com')
let verificationToken = $ref(router.currentRoute.value.params.token)
let isLoading = $ref(false)
let error = $ref('')
let successfull = $ref('')

onMounted(async () => {
  if (verificationToken) {
    let { response } = await useAxios(
      'patch',
      `/auth/verify-email/${verificationToken}`,
    )
    if (!response.data.ok) {
      error = response.data.message
    } else {
      successfull = response.data.message
      setTimeout(() => {
        router.push(`/${state.lang}/`)
      }, 3000)
    }
  }
})

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
  isLoading = true
  let { response } = await useAxios('get', '/auth/send-verification-link')
  if (response.data.ok) {
    successfull = response.data.message
    isLoading = true
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
      <BaseTitle>{{ $t(text.verifyEmail) }}</BaseTitle>

      <div class="mt-6">
        <div v-if="!verificationToken && !successfull && !error">
          You need to verify your email to continue.
        </div>
        <div v-if="successfull">{{ successfull }}</div>
        <transition name="fade">
          <BaseError v-if="error">{{ error }}</BaseError>
        </transition>

        <BaseButton
          v-if="!verificationToken && !successfull"
          @click="sendVerificationEmail"
          class="mt-2 disabled:bg-blue-300"
          :disabled="isLoading && 'disabled'"
          >{{ $t(text.sendMail) }}</BaseButton
        >
      </div>
    </div>
  </UserLayout>
</template>
