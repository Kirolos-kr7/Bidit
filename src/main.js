import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { $t } from './functions'

import App from './App.vue'
import router from './router'
import '../tailwind.css'
import '../transition.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mixin({
  methods: {
    $t,
  },
})

app.mount('#app')
