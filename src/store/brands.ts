import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import type { ICarSupplierProduct } from '@/composables/cars'

const useBrandStore = defineStore('brand', () => {
  const brands: Ref<string[]> = ref([])
  const selectedBrandIndex: Ref<number> = ref(0)
  const carSuppliersProducts: Ref<ICarSupplierProduct[]> = ref([])

  const setBrands = (brandsArr: string[]) => {
    brands.value = brandsArr
  }

  const setSelectedBrandIndex = (index: number) => {
    selectedBrandIndex.value = index
  }

  const setCarSupplierProducts = (products: ICarSupplierProduct[]) => {
    carSuppliersProducts.value = products
  }

  return { brands, setBrands, selectedBrandIndex, setSelectedBrandIndex, carSuppliersProducts, setCarSupplierProducts }
})

export default useBrandStore
