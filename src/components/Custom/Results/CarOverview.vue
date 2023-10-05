<script setup lang="ts">
import type { Ref } from "vue";
import { ref } from "vue";
import { useRoute } from "vue-router";
import CarInfo from "../Results/CarInfo.vue";
import { checkIfImageExists } from "../../../utils";
import HomeSearch from "@/views/home/HomeSearch.vue";
import useCarStore from "@/store/car";
import { S3_STORAGE_IMAGE } from "@/composables/constant";
import useCars from "@/composables/cars";

const props = defineProps(["carId"]);
const carStore = useCarStore();
const show: Ref<boolean> = ref(false);
const showType: Ref<string> = ref("car-info");
const carImage: Ref<string> = ref("");
const imageLoading: Ref<boolean> = ref(false);
const isSticky: Ref<boolean> = ref(false);
const stickyDiv: Ref<any> = ref(null);
const imgHeight: Ref<string | number> = ref(100);
const lastScrollTop: Ref<number> = ref(0);
const carIdValue: Ref<string> = ref(props.carId);

const { getCarInfo, carDataLoading } = useCars();
const route = useRoute();

onMounted(async () => {
  await getCarInfo({ car: props.carId, selectedType: carStore.carType });
});

const handleScroll = () => {
  const scrollTopValue = window.scrollY || document.documentElement.scrollTop;

  if (stickyDiv.value) {
    isSticky.value = window.scrollY >= stickyDiv.value.offsetTop;
    if (scrollTopValue > lastScrollTop.value) {
      imgHeight.value = 50;
    } else if (scrollTopValue < lastScrollTop.value) {
      // imgHeight.value = 120
      isSticky.value = false;
    }
  }

  lastScrollTop.value = scrollTopValue <= 0 ? 0 : scrollTopValue;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});

const stickyClass = computed(() => {
  return {
    "sticky top-0": isSticky.value,
    "reduced-size": isSticky.value,
  };
});

watchEffect(async () => {
  imageLoading.value = true;
  if (route.params.carId) carIdValue.value = route.params.carId as string;
  else carIdValue.value = route.params.id as string;
  if (
    await checkIfImageExists(
      `${S3_STORAGE_IMAGE}carImages/${carIdValue.value}.jpg`
    )
  ) {
    carImage.value = `${S3_STORAGE_IMAGE}carImages/${carIdValue.value}.jpg`;
    imageLoading.value = false;
  } else {
    carImage.value = `${S3_STORAGE_IMAGE}carImages/notfound.jpeg`;
    imageLoading.value = false;
  }
});

watch(
  () => route.params,
  async () => {
    await getCarInfo({
      car: route.params.id as string,
      selectedType: carStore.carType,
    });

    if (route.params.carId) carIdValue.value = route.params.carId as string;
    else carIdValue.value = route.params.id as string;
  }
);

const handleChangeSelection = () => {
  if (show.value) {
    showType.value === "car-info"
      ? (showType.value = "select")
      : (show.value = !show.value);

    return;
  }
  show.value = !show.value;
  showType.value = "select";
};

const handleShowCarInfo = () => {
  if (show.value) {
    showType.value === "select"
      ? (showType.value = "car-info")
      : (show.value = !show.value);

    return;
  }
  show.value = !show.value;
  showType.value = "car-info";
};

const truncateText = (params: string): string => {
  const maxLength = 20;
  if (params.length > maxLength) return `${params.substring(0, maxLength)}...`;
  else return params;
};
</script>

<template>
  <div v-loading="carDataLoading">
    <div
      v-if="carStore.cartInfo"
      ref="stickyDiv"
      :class="stickyClass"
      class="w-full shadow-md rounded-md bg-white dark:bg-black px-10 transition ease-in-out delay-300 scroll-smooth"
    >
      <div class="flex flex-col md:flex-row justify-between">
        <div
          class="w-full md:w-1/2 flex flex-col md:flex-row items-center gap-5"
        >
          <VImg
            :width="200"
            :height="120"
            aspect-ratio="16/9"
            class="cursor-pointer"
            lazy-src="https://media.tenor.com/40NNfhcajzoAAAAC/car-wheel.gif"
            :src="carImage"
            @click="handleShowCarInfo"
          >
            <template #placeholder>
              <div class="d-flex align-center justify-center fill-height">
                <VProgressCircular color="grey-lighten-4" indeterminate />
              </div>
            </template>
          </VImg>
          <VBtn
            variant="text"
            class="hover:bg-[#a9bdf1]"
            @click="handleShowCarInfo"
          >
            {{ truncateText(carStore.cartInfo.TYPEL) }}
          </VBtn>
        </div>
        <div class="w-full md:w-1/2 flex items-center justify-center px-10">
          <VBtn
            variant="text"
            class="hover:bg-[#a9bdf1]"
            :prepend-icon="
              show && showType === 'select'
                ? 'mdi-chevron-up'
                : 'mdi-chevron-down'
            "
            @click="handleChangeSelection"
          >
            Change Selection
          </VBtn>
        </div>
      </div>
      <div>
        <Transition name="slide-fade">
          <div v-if="show" class="py-4">
            <CarInfo
              v-if="showType === 'car-info'"
              :car-details="carStore.cartInfo"
            />
            <HomeSearch
              v-if="showType === 'select'"
              is-commercial
              is-personal
            />
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
