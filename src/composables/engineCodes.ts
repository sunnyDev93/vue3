import type { Ref } from 'vue'
import { ref } from 'vue'
// eslint-disable-next-line regex/invalid
import axios from 'axios'
import { MODELS_DOMAIN } from './constant'

export default function useEngineCodes() {
  const engineCodes: Ref<any[]> = ref([])
  const loading: Ref<boolean> = ref(false)
  const error: Ref<string> = ref('')

  const getEngineCodes = async (manufacturer: string) => {
    loading.value = true
    try {
      loading.value = true

      const response = await axios.get(MODELS_DOMAIN, {
        params: {
          typeCar: 'ENG',
          manu: manufacturer,
        },
      })

      const data = await response.data

      engineCodes.value = data.data
      loading.value = false
    }
    catch (err: any) {
      console.log(err)
      if (err.response) {
        error.value = err.response.data.message
      }
      else if (err.request) {
        console.log(err.request)
      }
      else {
        ElMessage({
          message: 'Oops! Something went wrong',
          showClose: true,
          type: 'error',
          customClass: 'font-bold',
        })
      }
      loading.value = false
    }
  }

  return {
    getEngineCodes, engineCodes, engineCodeError: error, engineLoading: loading,
  }
}

//
