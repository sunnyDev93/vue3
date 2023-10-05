// eslint-disable-next-line regex/invalid
import axios from 'axios'
import {ElMessage} from 'element-plus'
import {PLATE_NUMBER} from './constant'

export default function usePlates() {
    const searchData: Ref<any> = ref(null)
    const loading: Ref<boolean> = ref(false)
    const noDataFound: Ref<boolean> = ref(false)
    const error: Ref<string> = ref('')

    const getByPlates = async (params : {
        plate: string;
        serie: string
    }) => {
        try {
            loading.value = true

            const response = await axios.get(PLATE_NUMBER, {
                params: {
                    platenum: params.plate,
                    serie: params.serie
                }
            })

            const responseData = response.data

            if (! responseData.data) {
                noDataFound.value = true
                loading.value = false

                return
            }

            searchData.value = responseData
            loading.value = false
        } catch (err : any) {
            console.log(err)
            loading.value = false
            if (err.response) {
                error.value = err.response.data.message
            } else if (err.request) {
                console.log(err.request)
            } else {
                ElMessage({message: 'Oops! Something went wrong', showClose: true, type: 'error', customClass: 'font-bold'})
            }
        }
    }

    return {
        getByPlates,
        searchData,
        loading,
        error,
        noDataFound
    }
}
