import { useStore } from './store'
import { categories } from './lang/categories.json'
import { status } from './lang/bidstatus.json'

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
