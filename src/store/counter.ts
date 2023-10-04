import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => (count.value * 2))

  const increment = () => {
    count.value++
  }

  return { count, increment, doubleCount }

  // state: () => ({ count: 0 }),
  // getters: {
  //   doubleCount: state => state.count * 2,
  // },
  // actions: {
  //   increment() {
  //     this.count++
  //   },
  // },
})
