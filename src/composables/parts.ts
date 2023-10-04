// eslint-disable-next-line regex/invalid
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { PART_NUMBER } from './constant'

// import useCarStore from '@/store/car'

// const store = useCarStore()
export default function useParts() {
  const articleInfo: Ref<any> = ref(null)
  const articles: Ref<any[]> = ref([])
  const loading: Ref<boolean> = ref(false)
  const noDataFound: Ref<boolean> = ref(false)
  const error: Ref<string> = ref('')

  const getByPartNumber = async (partNumber: string) => {
    try {
      loading.value = true

      const response = await axios.get(PART_NUMBER, {
        params: {
          partnumber: partNumber,
        },
      })

      const responseData = response.data

      if (!responseData.data) {
        noDataFound.value = true
        loading.value = false

        return
      }

      articles.value = responseData.data
      console.log(responseData.data)
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
    getByPartNumber, articleInfo, loading, error, noDataFound, articles,
  }
}
