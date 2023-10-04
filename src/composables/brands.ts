/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Ref } from 'vue'
import { ref } from 'vue'
// eslint-disable-next-line regex/invalid
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { BRANDS_DOMAIN } from './constant'

export default function useBrands() {
  const brands: Ref<any[]> = ref([])
  const loading: Ref<boolean> = ref(false)
  const error: Ref<string> = ref('')

  const getBrands = async () => {
    loading.value = true
    try {
      const data = await axios.get(BRANDS_DOMAIN)

      brands.value = data.data
      loading.value = false
    }
    catch (e: any) {
      if (e.response) {
        // brandErr.value = e.response.data.message
        console.log(e)
      }
      else if (e.request) {
        console.log(e.request)
      }
      else {
        ElMessage({
          message: 'Oops! Something went wrong',
          showClose: true,
          type: 'error',
          customClass: 'font-bold',
        })
      }
      loading.value = true
    }
  }

  return {
    brands, brandsError: error, brandsLoading: loading, getBrands,
  }
}
