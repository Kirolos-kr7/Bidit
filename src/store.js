import { defineStore } from 'pinia'

export const useStore = defineStore('main', () => {
  let lang = $ref()
  // let user = $ref({
  //   fullName: 'Kirolos Rafaat',
  //   email: 'k@k.co',
  //   phone: '+20 01200462325',
  //   address: '123 st. abc avenue',
  //   gender: 'male',
  // })
  let user = null

  return { lang, user }
})
