<template>
  <button
    :data-test="cta"
    :disabled="disabled || isLoading"
    :class="[
      'font-bold outline-none flex justify-center items-center rounded',
      theme.toLowerCase(),
      { 'cursor-pointer': !disabled || !isLoading },
    ]"
  >
    <span class="loader" v-if="isLoading"></span>
    <slot v-else name="content" :cta="cta">{{ cta }}</slot>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  cta: string;
  theme: string;
  disabled?: boolean;
  isLoading?: boolean;
}>();
</script>

<style scoped>
.blue {
  @apply bg-blue-500 text-white p-2 min-w-24;
}

.border_blue {
  @apply border border-gray-300 text-black p-2 min-w-24;
}

.gray {
  @apply bg-gray-200/80 text-gray-900/40 p-2 min-w-24;
}

.dark_gray {
  @apply bg-gray-900 text-white p-2 min-w-24;
}

.red {
  @apply bg-red-500 text-white p-2 min-w-24;
}

.green {
  @apply bg-green-600 text-white p-2 min-w-24;
}

.light_blue {
  @apply bg-blue-400 text-white px-4 py-1;
}

.loader {
  @apply w-6 h-6 rounded-full border-2 border-gray-100 border-t-indigo-800 animate-spin;
}
</style>
