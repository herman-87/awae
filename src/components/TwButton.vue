<template>
  <button :class="['font-bold flex justify-center items-center rounded lg:rounded-lg', theme.toLowerCase()]">
    <slot name="content" :cta="cta">{{ cta }}</slot>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  cta: string;
  theme: string;
}>()
</script>

<style scoped>
.blue {
  @apply bg-blue-500 text-white p-2 lg:py-4
}
</style>