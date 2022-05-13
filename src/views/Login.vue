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
import { onMounted } from 'vue'
import UserLayout from '../components/UserLayout.vue'
const { $state: state } = $(useStore())

const router = useRouter()
const { cookies } = useCookies()
let email = $ref('kiroloskr7@gmail.com')
let password = $ref('k123456')
let isLoading = $ref(false)
let error = $ref('')

onMounted(() => {
  // google.accounts.id.initialize({
  //   client_id:
  //     '93523739734-gm8s6ba175gn6ad2h7ioapcvrnbq7k6p.apps.googleusercontent.com',
  //   callback: (res) => {
  //     console.log(res)
  //   },
  // })
  // google.accounts.id.renderButton(document.getElementById('buttonDiv'), {
  //   theme: 'filled_blue',
  //   size: 'large',
  //   text: 'continue_with',
  //   width: '250px',
  // })
})

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
  isLoading = true
  let body = { email, password }

  let { response } = await useAxios('post', '/auth/login', body)

  if (response.data.ok) {
    let data = response.data.data
    state.user = data.user
    cookies.set('authToken', data.token, '3d')
    cookies.set('isLoggedIn', true, '3d')

    if (router.currentRoute.value.query.ref === `login_to_join`) router.go(-1)
    else router.replace(`/${state.lang}/`)
  } else {
    error = response.data.message
  }
  isLoading = false
}
</script>

<template>
  <UserLayout>
    <div
      class="max-w-[850px] rounded-md bg-white p-4 shadow-sm sm:mx-auto sm:w-full sm:p-6"
    >
      <BaseTitle>{{ $t(text.myAccount) }}</BaseTitle>
      <!-- <div id="buttonDiv" class="my-6"></div> -->
      <form @submit.prevent="loginUser">
        <div class="mt-6 mb-4 grid items-start gap-4 sm:grid-cols-2">
          <BaseWarn
            v-if="router.currentRoute.value.query.ref === `token_expired`"
            class="sm:col-span-2"
            >Your token has expired, please login again.</BaseWarn
          >
          <BaseWarn
            v-else-if="router.currentRoute.value.query.ref === `login_to_join`"
            class="sm:col-span-2"
            >You need to login first in order to join this bid.</BaseWarn
          >
          <BaseWarn
            v-else-if="
              router.currentRoute.value.query.ref === `password_reset_success`
            "
            class="sm:col-span-2"
            >Your password reset is successful.</BaseWarn
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
              :to="`/${state.lang}/forgot-password`"
              class="text-bi-300 transition-colors hover:text-bi-400/50"
              >{{ $t(text.forgotPassword) }}</RouterLink
            >
          </div>
        </div>
      </form>
    </div>
  </UserLayout>
</template>
