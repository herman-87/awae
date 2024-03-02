<script setup lang="ts">
const model = defineModel<string>();
defineProps<{
  label: string;
  size?: number;
}>();
</script>

<template>
  <div class="flex flex-col gap-2">
    <label for="reason">{{ label }} </label>
    <textarea
      v-if="size"
      :style="{ height: size + 'px' }"
      class="resize-none rounded-lg focus:border-blue-400 outline-none p-2 border border-gray-300 focus:border-2"
      v-model="model"
    ></textarea>
    <textarea
      v-else
      class="resize-none h-20 rounded-lg focus:border-blue-400 outline-none p-2 border border-gray-300 focus:border-2"
      v-model="model"
    ></textarea>
  </div>
</template>
