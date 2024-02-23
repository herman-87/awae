<template>
  <button
    :data-test="cta"
    :disabled="disabled"
    :class="[
      'font-bold outline-none flex justify-center items-center rounded min-w-24',
      theme.toLowerCase(),
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
  @apply bg-blue-500 text-white p-2;
}

.border_blue {
  @apply border border-blue-500 text-blue-500 p-2;
}

.gray {
  @apply bg-gray-200/80 text-gray-900/40 p-2;
}

.loader {
  @apply w-6 h-6 rounded-full border-2 border-gray-100 border-t-indigo-800 animate-spin;
}
</style>
