<template>
  <div class="flex flex-col gap-0.5 lg:gap-2 text-gray-900">
    <label :for="label">{{ label }}</label>
    <div class="flex relative">
      <input
        v-model="model"
        :type="getInputType"
        :placeholder="placeholder"
        :data-test="`${label.toLowerCase()}Field`"
        class="w-full rounded lg:rounded-lg p-2 lg:py-4 outline-none border border-gray-300 focus:border-none focus:outline-blue-400"
      />
      <div
        @click="
          isShowPasswordButtonHasBeenClicked =
            !isShowPasswordButtonHasBeenClicked
        "
        class="absolute top-2.5 lg:top-5 right-0 lg:right-1 h-full w-6 cursor-pointer"
      >
        <ShowIcon v-if="isShowPasswordButtonHasBeenClicked" />
        <HideIcon v-else />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import ShowIcon from "@/components/svg/ShowPassword.vue";
import HideIcon from "@/components/svg/HidePassword.vue";

const model = defineModel();

defineProps<{
  label: string;
  placeholder: string;
}>();

const isShowPasswordButtonHasBeenClicked = ref();
const getInputType = computed<string>(() => {
  return isShowPasswordButtonHasBeenClicked.value ? "password" : "text";
});
</script>
