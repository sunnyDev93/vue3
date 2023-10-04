import type {Ref}
from 'vue'
import {ref} from 'vue'
// eslint-disable-next-line regex/invalid
import axios from 'axios'
import {ElMessage} from 'element-plus'
import {CARS_DOMAIN, CAR_INFO, CAR_SUPPLIERS_PRODUCTS} from './constant'
import useCarStore from '@/store/car'

const store = useCarStore()

export interface ICarSupplierProduct {
    PRODUCT_GROUP: string,
    PT_ID: number | string,
    SUP_BRAND: string,
    SUP_ID: number | string
}

export default function useCars() {
    const cars: Ref<any[]> = ref([])
    const carSuppliersProducts: Ref<ICarSupplierProduct[]> = ref([])
    const carData: Ref<any> = ref(null)
    const loading: Ref<boolean> = ref(false)
    const error: Ref<string> = ref('')
    const noDataFound: Ref<boolean> = ref(false)
    const carDataLoading: Ref<boolean> = ref(false)

    const getCars = async (params : {
        model: string;
        selectedType: string
    }) => {
        try {
            loading.value = true

            const response = await axios.get(CARS_DOMAIN, {
                params: {
                    model: params.model,
                    typeCar: params.selectedType
                }
            })

            const responseData = await response.data

            cars.value = responseData.data
            loading.value = false
        } catch (err) {
            console.log(err)
            loading.value = false
        }
    }

    const getCarInfo = async (params : {
        car: string;
        selectedType: string
    }) => {
        try {
            carDataLoading.value = true

            const response = await axios.get(CAR_INFO, {
                params: {
                    car: params.car,
                    typeCar: params.selectedType
                }
            })

            const responseData = await response.data
            if (responseData.data) {
                carData.value = responseData.data
                const constructionYear = carData.value.PCS_CONSTRUCTION_INTERVAL_START

                store.setCarInfo(responseData.data)
                store.setCategories(responseData.tree)
                noDataFound.value = false
            } else {
                noDataFound.value = true
            } carDataLoading.value = false
        } catch (err : any) {
            console.log(err)
            if (err.response) {
                error.value = err.response.data.message
            } else if (err.request) {
                console.log(err.request.response.message)
            } else {
                ElMessage({message: 'Oops! Something went wrong', showClose: true, type: 'error', customClass: 'font-bold'})
            } carDataLoading.value = false
        }
    }

    const getCarSuppliersProduct = async (params : {
        carid: string;
        selectedType: string;
        strid: string
    }) => {
        try {
            loading.value = true

            const response = await axios.get(CAR_SUPPLIERS_PRODUCTS, {
                params: {
                    carid: params.carid,
                    typeCar: params.selectedType,
                    strid: params.strid
                }
            })

            const responseData = await response.data

            carSuppliersProducts.value = responseData.suppliersproducts
            loading.value = false
        } catch (err : any) {
            console.log(err)
            if (err.response) {
                error.value = err.response.data.message
            } else if (err.request) {
                console.log(err.request.response.message)
            } else {
                ElMessage({message: 'Oops! Something went wrong', showClose: true, type: 'error', customClass: 'font-bold'})
            } loading.value = false
        }
    }

    return {
        cars,
        carsError: error,
        carsLoading: loading,
        getCars,
        getCarInfo,
        carData,
        noDataFound,
        carSuppliersProducts,
        getCarSuppliersProduct,
        carDataLoading
    }
}
