import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { $t } from './functions'
import GAuth from 'vue3-google-oauth2'

import App from './App.vue'
import router from './router'
import '../tailwind.css'
import '../transition.css'
import { registerSW } from 'virtual:pwa-register'

registerSW({})

const gAuthOptions = {
  clientId:
    '93523739734-r8av9s9e4595ecticu63tg3gqu3jiags.apps.googleusercontent.com',
  scope: 'email',
  prompt: 'consent',
  // fetch_basic_profile: false,
}

const app = createApp(App)

app.use(GAuth, gAuthOptions)
app.use(createPinia())
app.use(router)

app.mixin({
  methods: {
    $t,
  },
})

app.mount('#app')
