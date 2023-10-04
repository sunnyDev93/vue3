<script setup lang="ts">
import { defineProps } from 'vue'
import SearchCategories from '../../../views/home/SearchCategories.vue'
import HomeHeader from '@/components/Custom/Headers/HomeHeader.vue'

const props = defineProps(['id'])

const searchCategoriesVisible: Ref<boolean> = ref(false)

const hanldeShowSeacrhCategories = (): void => {
  searchCategoriesVisible.value = !searchCategoriesVisible.value
}

const handleSaerchCategoryInputFocus = (): void => {
  searchCategoriesVisible.value = false
}
</script>

<template>
  <div class="bg-[#f1f1fc] space-y-4">
    <VBtn
      prepend-icon="mdi-arrow-left"
      variant="text"
      class="hover:bg-[#a9bdf1] hover:text-white"
      @click="$router.go(-1)"
    >
      Go Back
    </VBtn>
    <div>
      <HomeHeader
        :search-categories-visible="searchCategoriesVisible"
        @show-search-categories="hanldeShowSeacrhCategories"
        @search-category-input-focus="handleSaerchCategoryInputFocus"
        @catalogue-click="handleSaerchCategoryInputFocus"
      />
    </div>
    <hr>
    <div class="w-[100%] m-auto">
      <SearchCategories :car-id="props.id" />
    </div>
  </div>
</template>

<style>
.btn {
  color: white;
  background-color: #2d4aae;
}
</style>
