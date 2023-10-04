import { defineStore } from 'pinia'
import type { Ref } from 'vue'
import { ref } from 'vue'

const useManufacturesStore = defineStore('manufacturers', () => {
  const manufacturers: Ref<any[]> = ref([])

  const setManufacturers = (manufacturersArr: any[]) => {
    manufacturers.value = manufacturersArr
  }

  return {
    manufacturers, setManufacturers,
  }
})

export default useManufacturesStore
