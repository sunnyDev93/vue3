import type { Ref } from 'vue'
import { ref } from 'vue'
// eslint-disable-next-line regex/invalid
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { MANUFACTURERS_DOMAIN } from './constant'
import useManufacturesStore from '@/store/manufacturers'

interface IManufacturer {
  MFA_ID: string
  MFA_BRAND: string
}

const store = useManufacturesStore()
export default function useManufacturers() {
  const manufacturers: Ref<IManufacturer[]> = ref([])
  const loading: Ref<boolean> = ref(false)
  const error: Ref<string> = ref('')

  const getManufacturers = async (params: any) => {
    loading.value = true
    try {
      loading.value = true

      const response = await axios.get(MANUFACTURERS_DOMAIN, {
        params: {
          typeCar: params,
        },
      })

      const data = await response.data

      manufacturers.value = data.data
      store.setManufacturers(data.data)
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
    manufacturers, error, manufacturersLoading: loading, getManufacturers,
  }
}
