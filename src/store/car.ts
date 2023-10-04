import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import type { ICategory } from '@/globalTypes'

const useCarStore = defineStore('car', () => {
  const cars: Ref<any[]> = ref([])
  const cartInfo: Ref<any> = ref(null)
  const carCategories: Ref<any> = ref(null)
  const carType: Ref<string> = ref('PC')
  const filteredCategories: Ref<ICategory[]> = ref([])
  const filters: Ref<any[]> = ref([])
  const allCategories: Ref<ICategory[]> = ref([])
  const filterLevel: Ref<number> = ref(1)
  const filterTitles: Ref<string[]> = ref([])

  const setCars = (carsArr: any[]) => {
    cars.value = carsArr
  }

  const setCarInfo = (cartObject: any) => {
    cartInfo.value = cartObject
  }

  const setCategories = (categoriesData: any) => {
    carCategories.value = categoriesData
  }

  const setCarType = (type: string) => {
    carType.value = type
  }

  const setFilteredCategories = (categoriesArray: ICategory[]) => {
    filteredCategories.value = categoriesArray
  }

  const setAllCategories = (categories: ICategory[]) => {
    allCategories.value = categories
  }

  const setFilters = (filtersArr: any[]) => {
    filters.value = filtersArr
  }

  const setFilterLevel = (level: number) => {
    filterLevel.value = level
  }

  const decrementFilterLevel = () => {
    if (filterLevel.value > 1)
      filterLevel.value--
  }

  const setFilterTitles = (title: string) => {
    filterTitles.value.push(title)
  }

  const removeFilterTitle = () => {
    filterTitles.value.pop()
  }

  return {
    setCarInfo,
    cartInfo,
    setCategories,
    carCategories,
    setCarType,
    carType,
    cars,
    setCars,
    filteredCategories,
    setFilteredCategories,
    filters,
    setFilters,
    filterLevel,
    setFilterLevel,
    allCategories,
    setAllCategories,
    decrementFilterLevel,
    filterTitles,
    setFilterTitles,
    removeFilterTitle,
  }
}, { persist: { storage: sessionStorage } })

export default useCarStore
