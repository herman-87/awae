<script setup lang="ts">
import { useI18n } from "vue-i18n";

defineProps<{ status: string }>();
const { t } = useI18n({
  messages: {
    en: {
      apply: "Active",
      draft: "Draft",
      closed: "Inactivate",
    },
    fr: {
      apply: "Activé",
      draft: "Brouillon",
      closed: "Inactif",
    },
  },
});
</script>

<template>
  <div
    :class="[
      'items-center flex gap-1 text-xs',
      `${status?.toLowerCase()}_text`,
    ]"
  >
    <span :class="`${status?.toLowerCase()}_circle`"></span>
    <span>{{ t(status?.toLowerCase()) }}</span>
  </div>
</template>

<style scoped>
.apply_circle {
  @apply bg-green-500 border border-green-600 rounded-full w-3 h-3 shrink-0;
}
.closed_circle {
  @apply bg-red-500 border border-red-600 rounded-full w-3 h-3 shrink-0;
}
.draft_circle {
  @apply bg-white border-2 border-gray-800 rounded-full w-3 h-3 shrink-0;
}
.apply_text {
  @apply text-green-600 font-semibold;
}
.closed_text {
  @apply text-red-600 font-semibold;
}
.draft_text {
  @apply text-gray-800 font-semibold;
}
</style>
