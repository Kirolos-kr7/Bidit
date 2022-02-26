import { useStore } from './store'

export const $t = (x) => {
  const { $state: state } = useStore()
  return x[state.lang]
}
