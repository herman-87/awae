<template>
  <div class="min-h-screen w-full flex justify-center items-center">
    <span class="p-3 text-xl font-bold border-r border-gray-400">403</span>
    <div class="flex flex-col text-sm px-4">
      <span>{{ t("unauthorized") }}</span>
      <RouterLink :to="safeRoute">
        <span class="text-blue-500 underline underline-offset-2">
          {{ t("back") }}
        </span>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { RouterLink } from "vue-router";

const safeRoute = localStorage.getItem("safeRoute");

const { t } = useI18n({
  messages: {
    en: {
      unauthorized: "Unauthorized",
      back: "Back to AWAE",
    },
    fr: {
      unauthorized: "Pas autorisé",
      back: "Retourner vers AWAE",
    },
  },
});
</script>
