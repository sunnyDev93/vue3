import type { Ref } from 'vue'
import { ref } from 'vue'
// eslint-disable-next-line regex/invalid
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { VIN_DOMAIN } from './constant'

export default function useVins() {
  const loading: Ref<boolean> = ref(false)
  const error: Ref<string> = ref('')
  const noDataFound: Ref<boolean> = ref(false)
  const searchData: Ref<any> = ref(null)

  const getByVins = async (vinInput: string) => {
    try {
      loading.value = true

      const response = await axios.get(VIN_DOMAIN, {
        params: {
          vin: vinInput,
        },
      })

      const responseData = response.data

      if (!responseData.data) {
        noDataFound.value = true
        loading.value = false

        return
      }

      searchData.value = responseData.data
      loading.value = false
    }
    catch (err: any) {
      console.log(err)
      loading.value = false
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
    }
  }

  return {
    error, loading, getByVins, noDataFound, searchData,
  }
}
