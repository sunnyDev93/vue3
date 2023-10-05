<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { uniqBy } from "lodash";
import type { ICategory } from "../../../globalTypes";
import useCarStore from "@/store/car";
import PartCard from "@/components/Custom/cards/PartCard.vue";
import { S3_STORAGE_IMAGE } from "@/composables/constant";

const props = defineProps(["carId"]);
const router = useRouter();
const route = useRoute();

const carStore = useCarStore();
const loading: Ref<boolean> = ref(false);
const carCategoriesData: Ref<any> = ref(null);

const handleRedirect = (treeID: string, treeName: string) => {
  router.push({
    name: "Product List",
    params: { categoryId: treeID, groupName: treeName, carId: props.carId },
  });
};

const handlePrimaryCategoryClick = (values: ICategory[]) => {
  carStore.setFilterTitles(values[0].ROOT_NODE_TEXT);
  carStore.setFilteredCategories(uniqBy(values, "NODE_1_TEXT"));
  carStore.setAllCategories(values);
  carStore.setFilterLevel(2);
  router.push({
    name: "Categories",
    params: { id: props.carId, treeName: values[0].ROOT_NODE_TEXT },
  });
};

const handleSecondLevelClick = (item: ICategory) => {
  if (item.STR_LEVEL === 2) {
    handleRedirect(item.NODE_1_STR_ID, item.NODE_1_TEXT);
  } else {
    carStore.setFilterTitles(item.NODE_1_TEXT);

    const categories = carStore.allCategories.filter(
      (category: ICategory) => category.NODE_1_STR_ID === item.NODE_1_STR_ID
    );

    carStore.setFilteredCategories(uniqBy(categories, "NODE_2_TEXT"));
    carStore.setFilterLevel(3);
    router.push({
      name: "Categories",
      params: {
        id: props.carId,
        treeName: item.ROOT_NODE_TEXT,
        strid: item.NODE_1_STR_ID,
        strName: item.NODE_1_TEXT,
      },
    });
  }
};

const handleThirdLevelClick = (item: ICategory) => {
  if (item.STR_LEVEL === 3) {
    item.NODE_2_STR_ID &&
      item.NODE_2_TEXT &&
      handleRedirect(item.NODE_2_STR_ID, item.NODE_2_TEXT);
  } else {
    item.NODE_2_TEXT && carStore.setFilterTitles(item.NODE_2_TEXT);

    const categories = carStore.allCategories.filter(
      (category: ICategory) => category.NODE_2_STR_ID === item.NODE_2_STR_ID
    );

    carStore.setFilteredCategories(uniqBy(categories, "NODE_3_TEXT"));
    carStore.setFilterLevel(4);
    router.push({
      name: "Categories",
      params: {
        id: props.carId,
        treeName: item.ROOT_NODE_TEXT,
        strid: item.NODE_2_STR_ID,
        strName: item.NODE_2_TEXT,
      },
    });
  }
};

const handleFourthLevlClick = (item: ICategory) => {
  item.NODE_3_STR_ID &&
    item.NODE_3_TEXT &&
    handleRedirect(item.NODE_3_STR_ID, item.NODE_3_TEXT);
};

onMounted(() => {
  carCategoriesData.value = carStore.carCategories;
});

watchEffect(() => {
  carCategoriesData.value = carStore.carCategories;
});

watch(
  () => route.name,
  () => {
    if (route.name !== "Categories" && route.name !== "Product List")
      carStore.setFilterLevel(1);
  }
);

window.addEventListener("popstate", () => {
  // eslint-disable-next-line curly
  if (carStore.filterLevel > 1 && route.name === "Categories") {
    carStore.filterLevel--;
  }
  carStore.removeFilterTitle();
});
</script>

<template>
  <div v-loading.fullscreen.lock="loading" class="p-3 space-y-4 scroll-smooth">
    <div class="w-full flex gap-4">
      <div v-if="carStore.filterLevel === 1">
        <div v-if="carCategoriesData">
          <div class="flex flex-wrap flex-col md:flex-row gap-6 w-full">
            <div v-for="(values, key) in carCategoriesData" :key="key">
              <PartCard
                :name="key"
                :image="`${S3_STORAGE_IMAGE}img.sections/100x100/${values[0].ROOT_NODE_STR_ID}.png`"
                @click="handlePrimaryCategoryClick(values)"
              />
            </div>
          </div>
        </div>
      </div>
      <div v-if="carStore.filterLevel === 2">
        <div class="flex flex-wrap flex-col md:flex-row gap-6 w-full">
          <div
            v-for="item in carStore.filteredCategories"
            :key="item.NODE_1_STR_ID"
          >
            <PartCard
              :name="item.NODE_1_TEXT"
              :image="`${S3_STORAGE_IMAGE}img.sections/100x100/${item.NODE_1_STR_ID}.png`"
              @click="handleSecondLevelClick(item)"
            />
          </div>
        </div>
      </div>
      <div v-if="carStore.filterLevel === 3">
        <div class="flex flex-wrap flex-col md:flex-row gap-6 w-full">
          <div
            v-for="item in carStore.filteredCategories"
            :key="item.NODE_2_STR_ID ?? item.NODE_1_STR_ID"
          >
            <PartCard
              :name="item.NODE_2_TEXT"
              :image="`${S3_STORAGE_IMAGE}img.sections/100x100/${item.NODE_2_STR_ID}.png`"
              @click="handleThirdLevelClick(item)"
            />
          </div>
        </div>
      </div>
      <div v-if="carStore.filterLevel === 4">
        <div class="flex flex-wrap flex-col md:flex-row gap-6 w-full">
          <div
            v-for="item in carStore.filteredCategories"
            :key="item.NODE_3_STR_ID ?? item.NODE_1_STR_ID"
          >
            <PartCard
              :name="item.NODE_3_TEXT"
              :image="`${S3_STORAGE_IMAGE}img.sections/100x100/${item.NODE_3_STR_ID}.png`"
              @click="handleFourthLevlClick(item)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

//
