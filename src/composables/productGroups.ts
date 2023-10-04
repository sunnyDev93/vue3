// eslint-disable-next-line regex/invalid
import axios from 'axios'
import type { Ref } from 'vue'
import { ref } from 'vue'
import { PRODUCT_GROUP } from './constant'

export default function useProductGroups() {
  const productGroups: Ref<any[]> = ref([])
  const error: Ref<string> = ref('')
  const loading: Ref<boolean> = ref(false)

  const getProductGroups = async (brand: string) => {
    loading.value = true
    try {
      const response = await axios.get(PRODUCT_GROUP, {
        params: {
          suppid: brand,
        },
      })

      const data = await response.data

      productGroups.value = data
      loading.value = false
    }
    catch (err: any) {
      if (err.response) {
        // groupErr.value = err.response.data.message
        console.log(err)
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
    productGroups, productGroupsLoading: loading, productGroupsErr: error, getProductGroups,
  }
}

//
