<script setup lang="ts">
defineProps({ searchCategoriesVisible: Boolean })

defineEmits<{
  (e: 'searchCategoryInputFocus'): void
  (e: 'catalogueClick'): void
  (e: 'showSearchCategories'): void
}>()

// const catalogue: Ref<string> = ref('')

// const searchCategories: Ref<{ icon: string; content: string }[]> = ref([
//   {
//     icon: 'fa-magnifying-glass',
//     content: 'Search by groups (universal article)',
//   },
//   { icon: 'fa-arrow-down-1-9', content: 'Search by any number' },
//   { icon: 'fa-clipboard-list', content: 'Search by article number' },
//   { icon: 'fa-trademark', content: 'Search by comparable number' },
//   { icon: 'fa-magnifying-glass', content: 'Search by trade number' },
// ])

// const selectectedSearchCategory: Ref<string> = ref(searchCategories.value[0].content)

// const handleSearchCategorySelect = (content: string): void => {
//   selectectedSearchCategory.value = content
// }
</script>

<template>
  <div />
  <!--
    <ElRow
    :gutter="20"
    @click.self="$emit('catalogueClick')"
    >
    <ElCol
    :span="3"
    @click="$emit('catalogueClick')"
    >
    <div class="grid-content blue-text">
    Catalogue Search
    </div>
    </ElCol>
    <ElCol
    :span="15"
    class="relative"
    >
    <div class="grid-content blue-text">
    <div class="search-input">
    <input
    v-model="catalogue"
    type="text"
    class="el-input"
    :placeholder="selectectedSearchCategory"
    @focus="$emit('searchCategoryInputFocus')"
    >
    <FontAwesomeIcon
    icon="fa-solid fa-qrcode"
    size="xl"
    class="icon"
    @click="$emit('showSearchCategories')"
    />
    </div>
    </div>
    <div
    v-if="searchCategoriesVisible"
    class="bg-slate-50 mx-2 shadow-lg absolute w-[97%] mt-1 -mr-10 z-10"
    @click="$emit('catalogueClick')"
    >
    <div
    v-for="searchCategory in searchCategories"
    :key="searchCategory.content"
    class="m-0 p-0 flex flex-row items-center border-b hover:bg-slate-300 text-[#2D4AAE] font-bold"
    @click="handleSearchCategorySelect(searchCategory.content)"
    >
    <FontAwesomeIcon
    :icon="`fa-solid ${searchCategory.icon}`"
    class="icon"
    />
    {{ searchCategory.content }}
    </div>
    </div>
    </ElCol>
    <ElCol
    :span="6"
    @click="$emit('catalogueClick')"
    >
    <div class="grid-content blue-text account">

    <div class="account-btn">
    <User /> Account
    </div>
    <div class="account-btn">
    <Logout />Logout
    </div>

    </div>
    </ElCol>
    </ElRow>
  -->
</template>

<style scoped>
.search-input {
  width: 100%;
  display: flex;
  align-items: center;
  border: 1px solid #86b7fd;
  border-radius: 5px;
}
.el-input {
  margin-left: 0px;
  padding-left: 10px;
  border-right: 1px solid #86b7fd;
  &:focus {
    outline: none;
    border: none;
    border-right: 1px solid #86b7fd;
  }
}
.icon {
  padding: 10px;
  width: 30px;
}
.grid-content {
  border-radius: 4px;
  min-height: 50px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  width: 100%;
}
</style>
