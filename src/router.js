import { createRouter, createWebHistory } from 'vue-router'
import { useStore } from './store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: () => {
        const { $state: state } = useStore()
        return state.lang || 'ar'
      },
    },
    {
      path: '/:lang',
      component: () => import('./views/NothingButARouterView.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('./views/Home.vue'),
        },
        {
          path: 'bids',
          name: 'bids',
          component: () => import('./views/AllBids.vue'),
        },
        {
          path: 'bids/:cat',
          name: 'bids categories',
          component: () => import('./views/BidsCategories.vue'),
        },
        {
          path: 'account',
          name: 'account',
          component: () => import('./views/Account.vue'),
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('./views/Login.vue'),
        },
        {
          path: '404',
          name: '404',
          component: () => import('./views/404.vue'),
        },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  const { $state: state } = useStore()

  if (to.params.lang === 'ar') {
    state.lang = 'ar'
    localStorage.setItem('lang', 'ar')
  } else if (to.params.lang === 'en') {
    state.lang = 'en'
    localStorage.setItem('lang', 'en')
  } else {
    const currentLang = localStorage.getItem('lang')

    if (!currentLang) {
      const preferdLang = navigator.language.split('-')[0]

      if (preferdLang === 'en') {
        state.lang = 'en'
        localStorage.setItem('lang', 'en')
      } else {
        state.lang = 'ar'
        localStorage.setItem('lang', 'ar')
      }
    } else state.lang = currentLang
    next({ name: to.name, params: { lang: state.lang } })
    return
  }

  if (state.lang === 'ar') {
    document.body.dir = 'rtl'
  } else {
    document.body.dir = 'ltr'
  }
  next()
})

export default router
