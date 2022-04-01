import axios from 'axios'
import { useStore } from './store'
import { categories } from './lang/categories.json'
import { status } from './lang/bidstatus.json'
import { useCookies } from 'vue3-cookies'

export const $t = (x) => {
  const { $state: state } = useStore()
  return x[state.lang]
}

export const routerLang = (state, to, next) => {
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
}

export const getPreferedLanguage = () => {
  const { $state: state } = useStore()
  let preferdLang = navigator.language.split('-')[0]

  if (preferdLang === 'en') {
    return (state.lang = 'en')
  } else {
    return 'ar'
  }
}

export const getType = (val) => {
  let itemType = val

  categories.items.forEach((item) => {
    if (item.en.toLowerCase() === val.toLowerCase()) {
      itemType = $t(item)
    }
  })

  return itemType
}

export const getStatus = (val) => {
  let itemType = val

  status.forEach((item) => {
    if (item.en.toLowerCase() === val.toLowerCase()) {
      itemType = $t(item)
    }
  })

  return itemType
}

export const getPricePerLang = (val) => {
  const { $state: state } = useStore()

  if (state.lang === 'ar') {
    return new Intl.NumberFormat('ar-EG', {
      style: 'currency',
      currency: 'EGP',
      maximumFractionDigits: 0,
    }).format(val)
  } else {
    return new Intl.NumberFormat('en-EG', {
      style: 'currency',
      currency: 'EGP',
      maximumFractionDigits: 0,
    }).format(val)
  }
}

export const useAxios = async (req, path, body) => {
  const { $state: state } = useStore()
  const BASE_URL = 'https://bidit-app.herokuapp.com'

  const { cookies } = useCookies()
  let authToken = cookies.get('authToken')

  let isLoading = $ref(true)
  let response = $ref(null)

  let headers = {
    'Access-Control-Allow-Origin': '*',
    'Accept-Language': state.lang,
    Authorization: authToken ? `Bearer ${authToken}` : null,
  }

  try {
    response = await axios({
      method: req,
      url: BASE_URL + path,
      data: body,
      headers,
    })

    setInterval(() => (isLoading = false), 3000)
  } catch (err) {
    console.log(err)
  }

  return { response, isLoading }
}
