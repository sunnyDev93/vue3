<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import type { Ref } from "vue";
import { ref } from "vue";
import HomeHeader from "../../components/Custom/Headers/HomeHeader.vue";
import HomeSeacrh from "./HomeSearch.vue";
import BrandSearch from "./BrandSearch.vue";

const isPersonal: Ref<boolean> = ref(true);
const isCommercial: Ref<boolean> = ref(true);

const smartSearch: Ref<string> = ref("");
const searchCategoriesVisible: Ref<boolean> = ref(false);

const hanldeShowSeacrhCategories = (): void => {
  searchCategoriesVisible.value = !searchCategoriesVisible.value;
};

const handleSaerchCategoryInputFocus = (): void => {
  searchCategoriesVisible.value = false;
};

const handleSamrtSeach = () => {
  /**
   * @todo update logic for smart search
   */
};
</script>

<template>
  <div class="main">
    <div class="layout" @click.self="handleSaerchCategoryInputFocus">
      <div>
        <HomeHeader
          :search-categories-visible="searchCategoriesVisible"
          @show-search-categories="hanldeShowSeacrhCategories"
          @search-category-input-focus="handleSaerchCategoryInputFocus"
          @catalogue-click="handleSaerchCategoryInputFocus"
        />
      </div>
      <div @click="handleSaerchCategoryInputFocus">
        <div class="search-section mt-4">
          <div class="search-fields">
            <div class="grid-content blue-text">
              <div class="smart-search">
                <ElButton
                  class="btn p-1.5"
                  icon="search"
                  @click="handleSamrtSeach"
                >
                  Smart search
                </ElButton>
                <input
                  v-model="smartSearch"
                  type="text"
                  class="el-input mx-1 text-[#000]"
                  placeholder="Start typing..."
                />
              </div>
            </div>
            <div class="search-tabs">
              <HomeSeacrh
                :is-commercial="isCommercial"
                :is-personal="isPersonal"
              />
            </div>
            <div class="search-tabs my-6">
              <BrandSearch />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.main {
  gap: 20px;
}
.home-btn {
  padding-left: 10px;
  padding-top: 10px;
}
.btn {
  color: white;
  background-color: #2d4aae;
}

.layout {
  background-color: #f1f1fc;
  padding: 10px;
  margin: 20px 0px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 0px;
}

.grid-content {
  border-radius: 4px;
  min-height: 50px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  width: 100%;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.smart-search {
  width: 100%;
  display: flex;
  align-items: center;
  border: 1px solid #86b7fd;
  border-radius: 4px;
  margin-left: -10px;
  margin-bottom: 20px;
}

.el-input {
  width: 100%;
  height: 40px;
  border: none;
  padding: 0px 10px;
  border-right: 1px solid transparent;
  border-radius: 0px;

  &:focus {
    outline: none;
    border: none;
  }
}

.account {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
}

.account-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}

.blue-text {
  color: var(--primary-color);
  font-weight: 600;
}

.tabs-buttons {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px;
  background-color: #fff;
}

.search-section {
  display: block;
  flex-wrap: wrap;
  width: 100%;
}

.search-fields {
  width: 100%;
}

.search-by-brand {
  /* padding: 10px; */
  margin-top: 20px;
  background-color: #fff;
  box-shadow: 0 8px 6px -6px rgb(226, 224, 224);
}
</style>
