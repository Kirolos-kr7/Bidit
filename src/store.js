import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => {
    return {
      lang: null,
      user: null,
      isLoggedIn: false,
      BASE_URL: 'https://bidit-app.herokuapp.com',
      // BASE_URL: 'http://localhost:8080',
    }
  },
  getters: {
    getNTCount: (state) => {
      if (!state.user || !state.isLoggedIn) {
        return null
      }
      let nTCount = 0

      state?.user?.notifications?.map((nt) => {
        if (nt.seen === false) nTCount += 1
      })

      if (nTCount < 10) return nTCount
      else return '+9'
    },
  },
})
