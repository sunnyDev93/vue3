<!-- eslint-disable vue/require-prop-types -->
<script setup lang="ts">
import { useRouter } from 'vue-router'
import useCartStore from '../../../store/cart'
import { checkIfImageExists } from '@/utils'
import { S3_STORAGE_IMAGE } from '@/composables/constant'

const props = defineProps(['image', 'brand', 'supId', 'article', 'productName'])

const router = useRouter()
const store = useCartStore()

const cartObject: Ref<any> = ref({
  name: '',
  quantity: 1,
  price: 0,
})

const imageUrl: Ref<string> = ref('')
const quantity: Ref<number> = ref(1)

onMounted(async () => {
  if (await checkIfImageExists(props.image))
    imageUrl.value = props.image

  else
    imageUrl.value = `${S3_STORAGE_IMAGE}articles/article_img_not_found.png`
})

const handleAddToCart = () => {
  cartObject.value = { ...cartObject.value, name: props.productName }
  store.addToCart(cartObject.value)
}

const handleViewDetails = () => {
  console.log(props.article.ART_ID, props.article.ART_ARTICLE_NR, props.supId)
  router.push({ name: 'Product Details', params: { id: props.article.ART_ID, artNumber: props.article.ART_ARTICLE_NR, supId: props.supId } })
}
</script>

<template>
  <div class="flex flex-col md:flex-row items-center p-5 gap-4 w-full rounded-md shadow-md bg-white">
    <div class="w-full md:w-1/3  h-40 p-4 flex items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-95">
      <VImg
        :width="200"
        aspect-ratio="16/9"
        class="rounded-md cursor-pointer"
        cover
        :src="imageUrl"
        @click="handleViewDetails"
      />
    </div>

    <div class="w-full md:2/3 py-3 flex flex-col md:flex-row gap-5">
      <div
        class="w-2/3 space-y-4"
        @click="handleViewDetails"
      >
        <h3 class="font-bold">
          {{ props.productName }}
        </h3>
        <p><span class="font-bold">SUPPLIER BRAND:</span> {{ props.brand }}</p>
        <p><span class="font-bold">STATUS:</span> {{ article.ART_STATUS_TEXT }}</p>
        <p>{{ article.DESCRIPTIONS }}</p>
        <!-- <p>{{ article.ART_INFO }}</p> -->
        <p>{{ article.LA_ARTICLE_CRITERIA }}</p>
      </div>
      <div class="w-1/3 flex flex-col items-end gap-2 md:gap-3">
        <div class="flex items-center justify-between">
          <ElSelect
            v-model="quantity"
            class="m-2 w-[100px]"
            placeholder="1"
          >
            <ElOption
              v-for="item in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
              :key="item"
              :label="item"
              :value="item"
            />
          </ElSelect>
          <VBtn
            color="#2d4aae"
            prepend-icon="mdi-cart"
            class="text-white w-[160px] "

            @click="handleAddToCart"
          >
            Add to cart
          </VBtn>
        </div>
      </div>
    </div>
  </div>
</template>
