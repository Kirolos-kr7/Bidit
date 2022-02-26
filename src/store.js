import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => ({
    lang: null,
    user: null,
  }),
  getters: {},
  actions: {},
})
