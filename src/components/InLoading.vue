<template>
  <div class="w-full flex flex-col py-20 gap-7 justify-center items-center">
    <div
      class="w-20 h-20 rounded-full border-4 border-gray-200 border-t-blue-500 animate-spin"
    ></div>
    <h2 class="text-gray-800 font-thin text-4xl">{{ t("loading") }}</h2>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n({
  messages: {
    en: {
      loading: "Loading...",
    },
    fr: {
      loading: "En cours...",
    },
  },
});
</script>
