<script setup lang="ts">
import { useRouter } from 'vue-router'
import MySearch from '@/views/home/MySearch.vue'
import useCarStore from '@/store/car'

const props = defineProps(['id'])
const carStore = useCarStore()
const router = useRouter()

const handleBackwardNavigation = () => {
  if (carStore.filterLevel > 1) {
    carStore.filterLevel--
    carStore.removeFilterTitle()
  }
  router.go(-1)
}
</script>

<template>
  <div class="bg-[#f1f1fc] space-y-4">
    <div>
      <VBtn
        prepend-icon="mdi-arrow-left"
        variant="text"
        class="hover:bg-[#a9bdf1] hover:text-white"
        @click="handleBackwardNavigation"
      >
        Go Back
      </VBtn>
    </div>
    <div>
      <MySearch :car-id="props.id"/>
    </div>
  </div>
</template>
