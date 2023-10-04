<script setup lang="ts">
defineProps({
  icon: String,
  title: String,
  isActive: Boolean,
})
</script>

<template>
  <button
    class="icon-btn"
    @click="$emit('updateVehicleType')"
  >
    <FontAwesomeIcon
      :icon="`fa-solid ${icon}`"
      size="24"
    />
    {{ title }}
  </button>
</template>

<style scoped>
.icon-btn {
    cursor: pointer;
    display: flex;
    justify-content:center;
    align-items: center;
    padding: 7px 10px;
    gap: 10px;
    border: none;
    border: 1px solid #d9d9e0;
    border-radius: 3px;
    color: #2D4AAE;
    background-color: #fff;
    font-size: 14px;
    text-transform: uppercase;
    outline: none;
}
.icon-btn.active {
    background-color: #2D4AAE;
    color: white;
}
.icon:hover, .icon-btn:hover {
    background-color: #2D4AAE;
    color: white;
}
</style>
