<!-- eslint-disable vue/require-prop-types -->
<script setup lang="ts">
import { S3_STORAGE_IMAGE } from '@/composables/constant'
import { checkIfImageExists } from '@/utils'

const props = defineProps(['name', 'image'])
const imageUrl: Ref<string> = ref('')

onMounted(async () => {
  if (await checkIfImageExists(props.image))
    imageUrl.value = props.image

  else
    imageUrl.value = `${S3_STORAGE_IMAGE}articles/article_img_not_found.png`
})
</script>

<template>
  <VCard
    class="mx-auto hover:brightness-75"
    width="250"
  >
    <VImg
      :src="imageUrl"
      height="150px"
    />

    <h3 class="font-bold text-center p-3">
      {{ name }}
    </h3>
  </VCard>
</template>
