<script setup lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'

import { uniqBy } from 'lodash'
import { S3_STORAGE_IMAGE } from '@/composables/constant'
import useCarStore from '@/store/car'
import PartCard from '@/components/Custom/cards/PartCard.vue'

const props = defineProps(['carId'])

interface ICategory {
  STR_LEVEL: number
  ROOT_NODE_TEXT: string
  ROOT_NODE_STR_ID: string
  NODE_1_TEXT: string
  NODE_1_STR_ID: string
  NODE_2_TEXT: string | null
  NODE_2_STR_ID: string | null
  NODE_3_TEXT: string | null
  NODE_3_STR_ID: string | null
}

const carStore = useCarStore()

const router = useRouter()
const route = useRoute()

// const route = useRoute()
const carCategoriesData: Ref<any> = ref(null)
const loading: Ref<boolean> = ref(false)

const nestedCategories: Ref<any[]> = ref([])
const categories: Ref<ICategory[]> = ref([])
const filteredItems: Ref<ICategory[]> = ref([])
const level2FilteredItems: Ref<ICategory[]> = ref([])
const level3FilteredItems: Ref<ICategory[]> = ref([])
const level4FilteredItems: Ref<ICategory[]> = ref([])

const handleRedirect = (treeID: string, treeName: string) => {
  router.push({ name: 'Product List', params: { categoryId: treeID, groupName: treeName, carId: props.carId } })
}

const handleLevel2Click = (item: ICategory) => {
  level2FilteredItems.value = categories.value.filter((obj: ICategory) => obj.NODE_1_STR_ID === item.NODE_1_STR_ID)
  if (item.STR_LEVEL === 2)
    handleRedirect(item.NODE_1_STR_ID, item.NODE_1_TEXT)

  else
    level3FilteredItems.value = categories.value.filter((obj: ICategory) => obj.NODE_1_STR_ID === item.NODE_1_STR_ID)
}

const handleLevel3Click = (item: ICategory) => {
  if (item.STR_LEVEL === 3) {
    item.NODE_2_STR_ID && item.NODE_2_TEXT && handleRedirect(item.NODE_2_STR_ID, item.NODE_2_TEXT)
  }
  else {
    const newItems = carStore.carCategories[route.params.treeName.toString()]

    level4FilteredItems.value = newItems.filter((obj: ICategory) => obj.NODE_2_STR_ID === item.NODE_2_STR_ID)
    console.log(level4FilteredItems.value)
    carStore.setFilteredCategories(level4FilteredItems.value)
    router.push({ name: 'Categories', params: { id: route.params.id, treeName: item.ROOT_NODE_TEXT, strName: item.NODE_3_TEXT, strid: item.NODE_2_STR_ID } })
  }
}

const handleLevel4Click = (item: ICategory) => {
  item.NODE_3_STR_ID && item.NODE_3_TEXT && handleRedirect(item.NODE_3_STR_ID, item.NODE_3_TEXT)
}

const handlePrimaryCategoryClick = (values: ICategory[]) => {
  nestedCategories.value = level2FilteredItems.value
  console.log(values)
  router.push({ name: 'Categories', params: { id: route.params.id, treeName: values[0].ROOT_NODE_TEXT } })
}

const handleNestedCartegoriesClick = (categoryItem: ICategory) => {
  // handleRedirect(categoryItem.NODE_1_STR_ID, categoryItem.NODE_1_TEXT)

  if (categoryItem.STR_LEVEL === 2) {
    handleRedirect(categoryItem.NODE_1_STR_ID, categoryItem.NODE_1_TEXT)
  }
  else {
    const newItems = carStore.carCategories[route.params.treeName.toString()]

    level3FilteredItems.value = newItems.filter((obj: ICategory) => obj.NODE_1_STR_ID === categoryItem.NODE_1_STR_ID)
    console.log(level3FilteredItems.value)
    carStore.setFilteredCategories(level3FilteredItems.value)
    router.push({ name: 'Categories', params: { id: route.params.id, treeName: categoryItem.ROOT_NODE_TEXT, strName: categoryItem.NODE_2_TEXT, strid: categoryItem.NODE_1_STR_ID } })
  }
}

onMounted(async () => {
  carCategoriesData.value = carStore.carCategories
  if (route.params.treeName && route.params.strid) {
    const newItems = carStore.carCategories[route.params.treeName.toString()]

    filteredItems.value = newItems.filter((item: ICategory) => item.NODE_1_STR_ID === route.params.strid || item.NODE_2_STR_ID === route.params.strid || item.NODE_3_STR_ID === route.params.strid)
    carStore.setFilteredCategories(filteredItems.value)
    console.log(filteredItems.value.filter((item: ICategory) => item.NODE_1_STR_ID === route.params.strid || item.NODE_2_STR_ID === route.params.strid || item.NODE_3_STR_ID === route.params.strid))
  }
  else if (route.params.treeName) {
    filteredItems.value = uniqBy(carStore.carCategories[route.params.treeName.toString()], 'NODE_1_TEXT')
    carStore.setFilteredCategories(filteredItems.value)
    console.log(filteredItems.value)
  }
})

watch(() => route.params, () => {
  carCategoriesData.value = carStore.carCategories
  if (route.params.treeName && route.params.strid) {
    const newItems = carStore.carCategories[route.params.treeName.toString()]

    filteredItems.value = newItems.filter((item: ICategory) => item.NODE_1_STR_ID === route.params.strid || item.NODE_2_STR_ID === route.params.strid || item.NODE_3_STR_ID === route.params.strid)
    carStore.setFilteredCategories(filteredItems.value)
    console.log(filteredItems.value.filter((item: ICategory) => item.NODE_1_STR_ID === route.params.strid || item.NODE_2_STR_ID === route.params.strid || item.NODE_3_STR_ID === route.params.strid))
  }
  else if (route.params.treeName && !route.params.strid) {
    filteredItems.value = uniqBy(carStore.carCategories[route.params.treeName.toString()], 'NODE_1_TEXT')
    carStore.setFilteredCategories([])
    console.log(filteredItems.value)
  }
})

// onBeforeRouteUpdate(async (to, from) => {
//   console.log('Params from::', from.params)
//   console.log('Params to::', to.params)
//   carCategoriesData.value = carStore.carCategories
//   if (to.params.treeName && to.params.strid) {
//     const newItems = carStore.carCategories[route.params.treeName as string]

//     filteredItems.value = newItems.filter((item: ICategory) => item.NODE_1_STR_ID === route.params.strid || item.NODE_2_STR_ID === route.params.strid || item.NODE_3_STR_ID === route.params.strid)
//     carStore.setFilteredCategories(filteredItems.value)
//   }
//   else if (to.params.treeName !== '' && !to.params.strid) {
//     console.log('Tree name::', to.params.treeName)
//     filteredItems.value = uniqBy(carStore.carCategories[route.params.treeName as string], 'NODE_1_TEXT')
//     carStore.setFilteredCategories(filteredItems.value)
//     console.log(filteredItems.value)
//   }
//   else if (to.params.treeName === '' && to.params.targetTYpe) {
//     filteredItems.value = []
//     carStore.setFilteredCategories([])
//   }
// })
</script>

<template>
  <div
    v-loading.fullscreen.lock="loading"
    class="p-3 space-y-4 scroll-smooth"
  >
    <div class="w-full flex gap-4">
      <div class="w-full">
        <div v-if="!route.params.treeName">
          <div v-if="carCategoriesData">
            <div class="flex flex-wrap flex-col md:flex-row gap-6 w-full">
              <div
                v-for="(values, key) in carCategoriesData"
                :key="key"
              >
                <PartCard
                  :name="key"
                  :image="`${S3_STORAGE_IMAGE}img.sections/100x100/${values[0].ROOT_NODE_STR_ID}.png`"
                  @click="handlePrimaryCategoryClick(values)"
                />
              </div>
            </div>
          </div>
          <div
            v-if="!loading && !carCategoriesData"
            class="px-4 flex items-center text-xl font-bold text-center"
          >
            Unfortunately, we do not offer any products for the particular vehicle at this time.
            You can choose another vehicle or search for articles using the free text search.
          </div>
        </div>
        <div v-else-if="filteredItems.length > 0 && level3FilteredItems.length === 0">
          <div class="flex flex-wrap flex-col md:flex-row gap-6 w-full">
            <div
              v-for="item in filteredItems"
              :key="item.NODE_1_STR_ID"
            >
              <PartCard
                :name="item.NODE_1_TEXT"
                :image="`${S3_STORAGE_IMAGE}img.sections/100x100/${item.NODE_1_STR_ID}.png`"
                @click="handleNestedCartegoriesClick(item)"
              />
            </div>
          </div>
        </div>

        <div v-else-if="level3FilteredItems.length > 0 && level4FilteredItems.length === 0">
          <div class="flex flex-wrap flex-col md:flex-row gap-6 w-full">
            <div
              v-for="(item, index) in level3FilteredItems"
              :key="item.NODE_2_STR_ID ?? index"
              :image="`${S3_STORAGE_IMAGE}img.sections/100x100/${item.NODE_2_STR_ID}.png`"
            >
              <PartCard
                :name=" item.NODE_2_TEXT"
                @click="handleLevel3Click(item)"
              />
            </div>
          </div>
        </div>

        <div v-else-if="level4FilteredItems.length === 0">
          <div class="flex flex-wrap flex-col md:flex-row gap-6 w-full">
            <div
              v-for="(item, index) in level4FilteredItems"
              :key="item.NODE_3_STR_ID ?? index"
              :image="`${S3_STORAGE_IMAGE}img.sections/100x100/${item.NODE_3_STR_ID}.png`"
            >
              <PartCard
                :name=" item.NODE_3_TEXT"
                @click="handleLevel4Click(item)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
</style>
