<!-- eslint-disable vue/require-prop-types -->
<script setup lang="ts">
import { pickBy } from 'lodash'
import useCarStore from '@/store/car'

// const props = defineProps(['carDetails'])
const carStore = useCarStore()

const newCarData = computed(() => {
  return pickBy(carStore.cartInfo, (value: any) => value !== null)
})
</script>

<template>
  <div v-if="newCarData">
    <h2 class="pb-4 text-xl font-semibold">
      Car info
    </h2>
    <div class="flex flex-col md:flex-row flex-wrap w-full gap-3">
      <div
        v-for="(value, key) in newCarData"
        :key="key"
        class="w-full md:w-[32%]"
      >
        <p v-if="value !== null">
          {{ key === 'TYPEL' ? key : key.toString().slice(3).replace(/_/g, ' ').replace('-00', '') }}: {{ value.toString().replace('-00', '').replace('.0000', '') }}
        </p>
      </div>
    </div>
  </div>
</template>
