import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => {
    return {
      lang: null,
      user: null,
      isLoggedIn: false,
    }
  },
})
