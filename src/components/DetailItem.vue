<script setup lang="ts">
defineProps<{
  label: string;
  value: string;
}>();
</script>

<template>
  <div class="flex gap-4 items-center">
    <span class="font-semibold">{{ label }}:</span>
    <span class="text-sm text-gray-500">{{ value }}</span>
  </div>
</template>
