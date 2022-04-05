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
    '93523739734-gm8s6ba175gn6ad2h7ioapcvrnbq7k6p.apps.googleusercontent.com',
  scope: 'email',
  prompt: 'consent',
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
