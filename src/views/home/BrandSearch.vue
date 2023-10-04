<script setup lang="ts">
import SearchByBrand from '@/components/Custom/Forms/SearchByBrand.vue'
</script>

<template>
  <ElTabs type="border-card">
  <ElTabPane>
      <template #label>
        <span class="blue-text flex items-center gap-3">
          <ElIcon :size="18"><Search /></ElIcon>
          <span>Search By Brand</span>
        </span>
      </template>
      <div>
        <SearchByBrand />
      </div>
    </ElTabPane>
  </ElTabs>
</template>
