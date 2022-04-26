import { createRouter, createWebHistory } from 'vue-router'
import { useCookies } from 'vue3-cookies'
import { getPreferedLanguage, routerLang, useAxios } from './functions'
import { useStore } from './store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
  routes: [
    {
      path: '/',
      redirect: () => {
        let lang = localStorage.getItem('lang')

        if (lang) {
          return lang
        } else {
          return getPreferedLanguage()
        }
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
          path: 'bid',
          name: 'bidview',
          component: () => import('./views/BidView.vue'),
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
          component: () => import('./views/Inventory.vue'),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'account/notification',
          name: 'account/notification',
          component: () => import('./views/Notifications.vue'),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'account/purchases',
          name: 'account/purchases',
          component: () => import('./views/Purchases.vue'),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'account/sales',
          name: 'account/sales',
          component: () => import('./views/Sales.vue'),
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
          path: 'admin',
          name: 'admin',
          component: () => import('./views/Admin/Admin.vue'),
        },
        {
          path: 'admin/users',
          name: 'usersAdmin',
          component: () => import('./views/Admin/Users.vue'),
        },
        {
          path: 'admin/bids',
          name: 'bidsAdmin',
          component: () => import('./views/Admin/Bids.vue'),
        },
        {
          path: 'admin/orders',
          name: 'ordersAdmin',
          component: () => import('./views/Admin/Orders.vue'),
        },
        {
          path: 'admin/reports',
          name: 'reportsAdmin',
          component: () => import('./views/Admin/Reports.vue'),
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

router.beforeEach(async (to, from, next) => {
  const { $state: state } = useStore()
  const { cookies } = useCookies()

  let tokenExpired = false
  let authToken = cookies.get('authToken')
  let isLoggedIn = cookies.get('isLoggedIn')
  if (isLoggedIn) state.isLoggedIn = isLoggedIn

  if (authToken) {
    let { response } = await useAxios('get', '/auth/user')

    if (response.data.ok) {
      state.user = response.data.data
      state.isLoggedIn = true
    } else {
      state.user = null
      state.isLoggedIn = false
      cookies.remove('authToken')
      cookies.remove('isLoggedIn')
      tokenExpired = true
    }
  }

  routerLang(state, to, next)

  if (tokenExpired) {
    next({
      name: 'login',
      params: { lang: state.lang },
      query: { ref: 'token_expired' },
    })
    return
  }
  if (state.isLoggedIn && to.meta.requiresUnAuth) {
    next({ name: 'home', params: { lang: state.lang } })
    return
  }
  if (!state.isLoggedIn && to.meta.requiresAuth) {
    next({ name: 'home', params: { lang: state.lang } })
    return
  }
  next()
})

export default router
