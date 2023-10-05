<script setup lang="ts">
import { defineProps } from "vue";
import Categories from "@/views/home/components/Categories.vue";

const props = defineProps(["id"]);
</script>

<template>
  <div class="bg-[#f1f1fc] space-y-4">
    <div class="w-[100%] m-auto">
      <Categories :carId="props.id" />
    </div>
  </div>
</template>

<style>
.btn {
  color: white;
  background-color: #2d4aae;
}
</style>
