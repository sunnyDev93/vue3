import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'

const useCartStore = defineStore('cart', () => {
  const storeCount: Ref<number> = ref(0)

  const cartItems: Ref<any[]> = ref([])

  const addToCart = (cartObject: any) => {
    cartItems.value.push(cartObject)

    const jsonString = JSON.stringify(cartItems.value)

    localStorage.setItem('cart', jsonString)
  }

  return { storeCount, addToCart, cartItems }
})

export default useCartStore
