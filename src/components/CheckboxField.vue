<template>
  <div class="flex justify-between items-center text-blue-500">
    <label :data-test="label" :for="label">
      {{ label }}
    </label>
    <input
      type="radio"
      :id="label"
      :checked="isChecked"
      @click="$emit('check')"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  isChecked: boolean;
}>();

defineEmits<{
  (e: "check"): void;
}>();
</script>

<style scoped>
input[type="radio"] {
  @apply w-14 h-[30px] border border-gray-200 bg-gray-300 rounded-full
  appearance-none relative cursor-pointer outline-none;
}

input[type="radio"]::before {
  @apply absolute content-[""] w-[28px] h-full top-0 translate-x-0 transition
  duration-200 ease-linear rounded-full bg-white shadow-lg;
}

input[type="radio"]:checked {
  @apply p-1 border-2 border-blue-500 bg-blue-500;
}

input[type="radio"]:checked::before {
  @apply translate-x-[70%];
}
</style>
