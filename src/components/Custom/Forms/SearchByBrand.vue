<script setup lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'
import CarInfo from '../../../components/Custom/Results/CarInfo.vue'
import useBrands from '@/composables/brands'
import useProductGroups from '@/composables/productGroups'

interface Brand {
  SUP_ID: number
  SUP_BRAND: string
  SUP_MATCH_CODE: string
  SUP_LOGO_NAME: string
}

const { brands, brandsError, brandsLoading, getBrands } = useBrands()
const { productGroups, productGroupsErr, productGroupsLoading, getProductGroups } = useProductGroups()

const brand: Ref<string> = ref('')
const productGroup: Ref<string> = ref('')
const brandErr: Ref<string> = ref('')
const groupErr: Ref<string> = ref('')

const brandOptions: Ref<Brand[]> = ref([])

const productGroupOptions: Ref<any[]> = ref([])

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const carData: Ref<any> = ref(null)

const handleSearchByBrand = () => {
  if (brand.value === '') {
    brandErr.value = 'Brand is required'

    return
  }

  if (productGroup.value === '')
    groupErr.value = 'Product group is required'

  /**
   * @todo add search logic
   */
}

/**
 * TO BE TESTED AND THEN REFACTORED
 */

// onMounted(async () => {
//   await getBrands()
//   brandOptions.value = brands.value
// })

// watch(brand, async () => {
//   await getProductGroups(brand.value)
//   productGroupOptions.value = productGroups.value
// })
</script>

<template>
  <div class="brand-search">
    <h3 class="blue-text" />
    <div class="w-full flex flex-col md:flex-row gap-4">
      <div class="w-full md:w-1/3">
        <label> Select Brand </label>
        <ElSelect
          v-model="brand"
          filterable
          placeholder="Select"
          class="select"
          :loading="brandsLoading"
        >
          <ElOption
            v-for="item in brandOptions"
            :key="item.SUP_ID"
            :label="item.SUP_BRAND"
            :value="item.SUP_ID"
          />
        </ElSelect>
        <p
          v-if="brand === ''"
          class="text-red-500 text-sm"
        >
          {{ brandErr }}
        </p>
      </div>
      <div class="w-full md:w-1/3">
        <label> Select Product Group</label>
        <ElSelect
          v-model="productGroup"
          filterable
          placeholder="Select"
          class="select"
          :loading="productGroupsLoading"
        >
          <ElOption
            v-for="item in productGroupOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </ElSelect>
        <p
          v-if="productGroup === ''"
          class="text-red-500 text-sm"
        >
          {{ groupErr }}
        </p>
      </div>
    </div>
    <div>
      <ElButton
        class="btn"
        icon="search"
        @click="handleSearchByBrand"
      >
        Search
      </ElButton>
    </div>
    <div v-if="carData">
      <CarInfo />
    </div>
  </div>
</template>

<style scoped>
.brand-search {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
</style>
