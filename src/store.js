import { defineStore } from 'pinia'

export const useStore = defineStore('main', () => {
  let lang = $ref()
  let user = $ref(null)

  return { lang, user }
})
