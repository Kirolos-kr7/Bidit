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
  let itemType

  if (!val) return 'N/F'

  categories.items.forEach((item) => {
    if (item.en.toLowerCase() === val?.toLowerCase()) {
      itemType = $t(item)
    }
  })

  return itemType || 'N/F'
}

export const getStatus = (val) => {
  let bidStatus

  if (!val) return 'N/F'

  status.forEach((state) => {
    if (state.en.toLowerCase() === val.toLowerCase()) {
      bidStatus = $t(state)
    }
  })

  return bidStatus || 'N/F'
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

export const getNumPerLang = (val) => {
  const { $state: state } = useStore()

  if (state.lang === 'ar') {
    return new Intl.NumberFormat('ar-EG').format(val)
  } else {
    return new Intl.NumberFormat('en-EG').format(val)
  }
}

export const useAxios = async (req, path, body) => {
  const { $state: state } = useStore()
  // const BASE_URL = 'https://9b65-156-204-20-156.eu.ngrok.io'
  const BASE_URL = 'https://bidit-app.herokuapp.com'

  const { cookies } = useCookies()
  let authToken = cookies.get('authToken')

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
  } catch (err) {
    console.log(err)
  }

  return { response }
}
