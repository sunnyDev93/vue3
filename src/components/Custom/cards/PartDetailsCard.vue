<!-- eslint-disable vue/require-prop-types -->
<script setup lang="ts">
const props = defineProps(['image', 'title', 'eanCode', 'price', 'status', 'deliveryUnit', 'articleData'])

console.log('Images: ', props.image)
</script>

<template>
  <div class="w-full">
    <div
      v-if="props.articleData"
      class="flex flex-col md:flex-row gap-6 w-full items-center"
    >
      <div class="w-full md:w-1/3">
        <img
          :src="props.image"
          alt="Product"
        >
      </div>
      <div class="w-full md:w-2/3 space-y-4 py-3 aspect-square flex flex-col justify-center">
        <p> {{ props.articleData[0].ACS_PACK_UNIT ? `Pack Unit: ${props.articleData[0].ACS_PACK_UNIT} ` : null }}</p>
        <p> {{ articleData[0].ACS_QUANTITY_PER_UNIT ? `quantity Per Unit: ${articleData[0].ACS_QUANTITY_PER_UNIT} ` : null }}</p>
        <p> {{ articleData[0].ACS_STATUS_DATE ? `Status Date: ${articleData[0].ACS_STATUS_DATE} ` : null }}</p>
        <p> {{ articleData[0].ART_STATUS_TEXT ? `Status Text: ${articleData[0].ART_STATUS_TEXT} ` : null }}</p>
        <p> {{ articleData[0].ART_PRODUCT_NAME ? `Product Name: ${articleData[0].ART_PRODUCT_NAME} ` : null }}</p>
        <p> {{ articleData[0].ART_INFO ? `Article Info: ${articleData[0].ART_INFO} ` : null }}</p>
        <p> {{ articleData[0].ARTICLE_CRITERIA ? `Article Criteria: ${articleData[0].ARTICLE_CRITERIA} ` : null }}</p>
        <p> {{ articleData[0].ART_SUP_BRAND ? `Pack Unit: ${articleData[0].ART_SUP_BRAND} ` : null }}</p>
      </div>
    </div>
  </div>
</template>
