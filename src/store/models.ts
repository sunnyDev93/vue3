import { defineStore } from 'pinia'
import type { Ref } from 'vue'
import { ref } from 'vue'

const useModelsStore = defineStore('models', () => {
  const models: Ref<any[]> = ref([])

  const setModels = (modelsArr: any[]) => {
    models.value = modelsArr
  }

  return {
    models, setModels,
  }
})

export default useModelsStore

//
