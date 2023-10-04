<script setup lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'

const props = defineProps(['titles'])

const emit = defineEmits(['setSwitchValue'])

const switchValue: Ref<any> = ref(props?.titles[0])
const isSelected: Ref<boolean> = ref(true)

const handleSwitchClick = () => {
  isSelected.value = !isSelected.value

  if (isSelected.value)
    switchValue.value = props?.titles[0]

  else
    switchValue.value = props?.titles[1]

  emit('setSwitchValue', switchValue.value)
}
</script>

<template>
  <div
    class="py-1 px-1  bg-[#2d4aae] text-white flex justify-between w-24 border rounded-2xl cursor-pointer font-bold"
    @click="handleSwitchClick"
  >
    <div
      :class="{ 'bg-white text-[#2d4aae]': isSelected, 'bg-[#2d4aae] text-white': !isSelected }"
      class="rounded-2xl w-full text-center"
    >
      {{ props?.titles[0] }}
    </div>
    <div
      class="rounded-2xl w-full text-center"
      :class="{ 'bg-white text-[#2d4aae]': !isSelected, 'bg-[#2d4aae] text-white': isSelected }"
    >
      {{ props?.titles[1] }}
    </div>
  </div>
</template>

<style>
.active {

}
</style>
