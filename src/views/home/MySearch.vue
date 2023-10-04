<script setup lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'
import { uniqBy } from 'lodash'
import { useRoute, useRouter } from 'vue-router'
import CarOverview from '@/components/Custom/Results/CarOverview.vue'
import useCarStore from '@/store/car'
import useBrandStore from '@/store/brands'
import useCars from '@/composables/cars'
import type { ICategory } from '@/globalTypes'

const props = defineProps(['carId'])
const carStore = useCarStore()
const brandStore = useBrandStore()
const { carDataLoading, getCarInfo } = useCars()

const router = useRouter()
const route = useRoute()

const filterTitle: Ref<string> = ref('Categories')
const carCategoriesData: Ref<any> = ref(null)
const loading: Ref<boolean> = ref(false)
const selectedBrand: Ref<string> = ref('')

const handleRedirect = (treeID: string, treeName: string) => {
  router.push({ name: 'Product List', params: { categoryId: treeID, groupName: treeName, carId: props.carId } })
}

const handlePrimaryCategoryClick = (values: ICategory[]) => {
  carStore.setFilterTitles(values[0].ROOT_NODE_TEXT)
  carStore.setFilteredCategories(uniqBy(values, 'NODE_1_TEXT'))
  carStore.setAllCategories(values)
  carStore.setFilterLevel(2)
  router.push({ name: 'Categories', params: { id: props.carId, treeName: values[0].ROOT_NODE_TEXT } })
}

const handleSecondLevelClick = (item: ICategory) => {
  if (item.STR_LEVEL === 2) {
    handleRedirect(item.NODE_1_STR_ID, item.NODE_1_TEXT)
  }
  else {
    carStore.setFilterTitles(item.NODE_1_TEXT)

    const categories = carStore.allCategories.filter((category: ICategory) => category.NODE_1_STR_ID === item.NODE_1_STR_ID)

    carStore.setFilteredCategories(uniqBy(categories, 'NODE_2_TEXT'))
    carStore.setFilterLevel(3)
    router.push({ name: 'Categories', params: { id: props.carId, treeName: item.ROOT_NODE_TEXT, strid: item.NODE_1_STR_ID, strName: item.NODE_1_TEXT } })
  }
}

const handleThirdLevelClick = (item: ICategory) => {
  if (item.STR_LEVEL === 3) {
    item.NODE_2_STR_ID && item.NODE_2_TEXT && handleRedirect(item.NODE_2_STR_ID, item.NODE_2_TEXT)
  }
  else {
    item.NODE_2_TEXT && carStore.setFilterTitles(item.NODE_2_TEXT)

    const categories = carStore.allCategories.filter((category: ICategory) => category.NODE_2_STR_ID === item.NODE_2_STR_ID)

    carStore.setFilteredCategories(uniqBy(categories, 'NODE_3_TEXT'))
    carStore.setFilterLevel(4)
    router.push({ name: 'Categories', params: { id: props.carId, treeName: item.ROOT_NODE_TEXT, strid: item.NODE_2_STR_ID, strName: item.NODE_2_TEXT } })
  }
}

const handleFourthLevlClick = (item: ICategory) => {
  item.NODE_3_STR_ID && item.NODE_3_TEXT && handleRedirect(item.NODE_3_STR_ID, item.NODE_3_TEXT)
}

const handlePreviousClick = () => {
  if (carStore.filterLevel > 1) {
    carStore.filterLevel--
    carStore.removeFilterTitle()
    router.go(-1)
  }
}

watch(selectedBrand, async () => {
  const index = brandStore.carSuppliersProducts.findIndex(item => item.SUP_BRAND === selectedBrand.value)

  brandStore.setSelectedBrandIndex(index)
})

watchEffect(() => {
  carCategoriesData.value = carStore.carCategories
})

onMounted(() => {
  carCategoriesData.value = carStore.carCategories
})

watch(() => route.params, async () => {
  if (route.name === 'Categories')
    await getCarInfo({ selectedType: carStore.carType, car: props.carId })
})

watch(() => brandStore.brands, () => {
  // eslint-disable-next-line curly
  if (brandStore.brands.length > 0) {
    selectedBrand.value = brandStore.brands[0]
  }
})
</script>

<template>
  <div>
    <div class="w-full flex gap-4">
      <div class="w-1/4 space-y-4">
        <div class="bg-white rounded-md px-4 py-2">
          <div class="w-full pb-3 space-y-5">
            <div class="bg-white rounded-md">
              <div class="space-y-5 pt-5 w-full">
                <VSelect
                  v-model="selectedBrand"
                  label="Brand"
                  :items="brandStore.brands"
                  variant="outlined"
                />
                <VDivider />
                <!--
                  <VTextField
                  v-model="assemblyGroup"
                  label="Search Product Group"
                  append-inner-icon="mdi-search"
                  variant="outlined"
                  />
                -->
              </div>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-md">
          <div class="p-4 flex justify-start gap-5">
            <VBtn
              :disabled="carStore.filterLevel <= 1"
              density="compact"
              icon=" mdi-chevron-left"
              color="primary"
              variant="outlined"
              class="rounded-md bg-slate-400 text-white"
              @click="handlePreviousClick"
            />
            <h2 class="font-bold text-lg">
              {{ carStore.filterTitles.at(-1) ?? filterTitle }}
            </h2>
          </div>
          <div class="rounded-md bg-white">
            <div v-if="carStore.filterLevel === 1">
              <div v-if="carCategoriesData">
                <div
                  v-for="(values, key) in carCategoriesData"
                  :key="key"
                  class="flex justify-between px-4 py-2 hover:bg-slate-100 cursor-pointer"
                  @click="handlePrimaryCategoryClick(values)"
                >
                  <div>{{ key }}</div>
                  <div><VIcon icon="mdi-chevron-right" /></div>
                </div>
              </div>
              <div
                v-else-if="carDataLoading"
                class="flex justify-center items-center p-5"
              >
                <VProgressCircular
                  :size="70"
                  :width="7"
                  color="gray"
                  indeterminate
                />
              </div>
            </div>
            <div v-if="carStore.filterLevel === 2">
              <div
                v-for="item in carStore.filteredCategories"
                :key="item.NODE_1_STR_ID"
                class="flex justify-between px-4 py-2 hover:bg-slate-100 cursor-pointer"
                @click="handleSecondLevelClick(item)"
              >
                <div>{{ item.NODE_1_TEXT }}</div>
                <div v-if="item.NODE_2_STR_ID">
                  <VIcon icon="mdi-chevron-right" />
                </div>
              </div>
            </div>
            <div v-if="carStore.filterLevel === 3">
              <div
                v-for="item in carStore.filteredCategories"
                :key="item.NODE_2_STR_ID ?? item.NODE_1_STR_ID"
                class="flex justify-between px-4 py-2 hover:bg-slate-100 cursor-pointer"
                @click="handleThirdLevelClick(item)"
              >
                <div>{{ item.NODE_2_TEXT }}</div>
                <div v-if="item.NODE_3_STR_ID">
                  <VIcon icon="mdi-chevron-right" />
                </div>
              </div>
            </div>
            <div v-if="carStore.filterLevel === 4">
              <div
                v-for="item in carStore.filteredCategories"
                :key="item.NODE_3_STR_ID ?? item.NODE_1_STR_ID"
                class="flex justify-between px-4 py-2 hover:bg-slate-100 cursor-pointer"
                @click="handleFourthLevlClick(item)"
              >
                <div>{{ item.NODE_3_TEXT }}</div>
                <div><VIcon icon="mdi-chevron-right" /></div>
              </div>
            </div>
            <div
              v-if="!loading && !carCategoriesData"
              class="px-4"
            >
              No Categories found
            </div>
          </div>
        </div>
      </div>
      <div class="w-3/4 space-y-4">
        <div class="sticky top-0 z-10 w-full space-y-3">
          <CarOverview :car-id="props.carId" />
          <div class="bg-white rounded-md w-full p-3">
            Breadcrumb goes here
          </div>
        </div>
        <RouterView />
      </div>
    </div>
  </div>
</template>
