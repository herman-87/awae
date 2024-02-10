<template>
  <div class="flex flex-col gap-0.5 lg:gap-2 text-gray-900">
    <label :for="label">{{ label }}</label>
    <input
      class="rounded lg:rounded-lg p-2 lg:py-4 px-2 outline-none border border-gray-300 focus:border-none focus:outline-blue-400"
      type="text"
      v-model="model"
      :placeholder="placeholder"
    />
  </div>
</template>

<script setup lang="ts">
const model = defineModel()

defineProps<{
  label: string
  placeholder: string
}>()
</script>
