<script setup lang="ts">
import type { Ref } from "vue";
import { ref } from "vue";
import SearchProductList from "@/components/Custom/Results/SearchProductList.vue";
import HomeHeader from "@/components/Custom/Headers/HomeHeader.vue";

const props = defineProps(["categoryId", "groupName", "carId"]);

const searchCategoriesVisible: Ref<boolean> = ref(false);

const hanldeShowSeacrhCategories = (): void => {
  searchCategoriesVisible.value = !searchCategoriesVisible.value;
};

const handleSaerchCategoryInputFocus = (): void => {
  searchCategoriesVisible.value = false;
};
</script>

<template>
  <div class="bg-[#f1f1fc] dark:bg-slate-800 p-4 space-y-4">
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
    <hr />
    <SearchProductList
      :search-tree-id="props.categoryId"
      :group-name="props.groupName"
      :carId="props.carId"
    />
  </div>
</template>
