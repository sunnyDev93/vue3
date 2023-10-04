import type {Ref}
from 'vue'
import {ref} from 'vue'
// eslint-disable-next-line regex/invalid
import axios from 'axios'
import {ElMessage} from 'element-plus'
import {MODELS_DOMAIN} from './constant'
import useModelsStore from '@/store/models'

const store = useModelsStore()

export default function useModels() {
    const models: Ref<any[]> = ref([])
    const loading: Ref<boolean> = ref(false)
    const error: Ref<string> = ref('')

    const getModels = async (params : any) => {
        try {
            loading.value = true

            const response = await axios.get(MODELS_DOMAIN, {
                params: {
                    manu: params.selectedManufacturer,
                    typeCar: params.selectedType
                }
            })

            const data = await response.data

            models.value = data.data
            store.setModels(data.data)
            loading.value = false
        } catch (err : any) {
            console.log(err)
            if (err.response) {
                error.value = err.response.data.message
            } else if (err.request) {
                console.log(err.request)
            } else {
                ElMessage({message: 'Oops! Something went wrong', showClose: true, type: 'error', customClass: 'font-bold'})
            } loading.value = false
        }
    }

    return {models, modelsError: error, modelsLoading: loading, getModels}
}
