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
})
