<script setup lang="ts">
import { } from 'vue'
import ManualSearch from '../../components/Custom/Forms/ManualSearch.vue'
import SearchByVin from '../../components/Custom/Forms/SearchByVin.vue'
import SearchByPlate from '../../components/Custom/Forms/SearchByPlate.vue'
import SearchByPartNumber from '@/components/Custom/Forms/SearchByPartNumber.vue'

defineProps({
  isCommercial: Boolean,
  isPersonal: Boolean,
})
</script>

<template>
  <ElTabs type="border-card">
    <ElTabPane>
      <template #label>
        <span class="blue-text flex items-center gap-3">
          <ElIcon :size="18"><Search /></ElIcon>
          <span>Manual Search</span>
        </span>
      </template>
      <div>
        <ManualSearch
          :is-commercial="isCommercial"
          :is-personal="isPersonal"
        />
      </div>
    </ElTabPane>
    <ElTabPane>
      <template #label>
        <span class="blue-text flex items-center gap-3">
          <ElIcon :size="18"><Search /></ElIcon>
          <span>Search By Car Plate</span>
        </span>
      </template>
      <div>
        <SearchByPlate />
      </div>
    </ElTabPane>
    <ElTabPane>
      <template #label>
        <span class="blue-text flex items-center gap-3">
          <ElIcon :size="18"><Search /></ElIcon>
          <span>Search By VIN</span>
        </span>
      </template>
      <SearchByVin />
    </ElTabPane>
    <ElTabPane>
      <template #label>
        <span class="blue-text flex items-center gap-3">
          <ElIcon :size="18"><Search /></ElIcon>
          <span>Search By Part Number</span>
        </span>
      </template>
      <div>
        <SearchByPartNumber />
      </div>
    </ElTabPane>
  </ElTabs>
</template>
