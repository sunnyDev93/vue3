<!-- eslint-disable vue/require-prop-types -->
<script setup lang="ts">
import SearchProductDetails from "../../components/Custom/Results/SearchProductDetails.vue";

const props = defineProps(["id", "artNumber", "supId", "showModal"]);
</script>

<template>
  <v-dialog v-model="showModal" max-width="800">
    <div class="bg-[#f1f1fc] py-2">
      <div class="w-full md:w-[90%] mx-auto">
        <div class="space-y-4">
          <SearchProductDetails
            :art-id="props.id"
            :art-number="props.artNumber"
            :sup-id="props.supId"
          />
        </div>
      </div>
    </div>
  </v-dialog>
</template>
