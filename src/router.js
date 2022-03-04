import { createRouter, createWebHistory } from 'vue-router'
import { routerLang } from './functions'
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
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'account/inventory',
          name: 'account/inventory',
          component: () => import('./views/Account.vue'),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'account/notification',
          name: 'account/notification',
          component: () => import('./views/Account.vue'),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'account/purchases',
          name: 'account/purchases',
          component: () => import('./views/Account.vue'),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'account/sales',
          name: 'account/sales',
          component: () => import('./views/Account.vue'),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('./views/Login.vue'),
          meta: {
            requiresUnAuth: true,
          },
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('./views/Register.vue'),
          meta: {
            requiresUnAuth: true,
          },
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

  routerLang(state, to, next)

  if (state.user && to.meta.requiresUnAuth) {
    next({ name: 'home', params: { lang: state.lang } })
    return
  }
  if (!state.user && to.meta.requiresAuth) {
    next({ name: 'home', params: { lang: state.lang } })
    return
  }
  next()
})

export default router
