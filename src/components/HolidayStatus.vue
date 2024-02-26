<script setup lang="ts">
import { useI18n } from "vue-i18n";

defineProps<{ status: string }>();
const { t } = useI18n({
  messages: {
    en: {
      draft: "Draft",
      publish: "Published",
      validated: "Validated",
      refused: "Refused",
      in_progress: "In progress",
      passed: "Passed",
    },
    fr: {
      draft: "Brouillon",
      publish: "Publié",
      validated: "Validé",
      refused: "Refusé",
      in_progress: "En cours",
      passed: "Passé",
    },
  },
});
</script>

<template>
  <div
    :class="['rounded px-2 py-0.5 text-xs text-center', status?.toLowerCase()]"
  >
    {{ t(status?.toLowerCase()) }}
  </div>
</template>

<style scoped>
.draft {
  @apply bg-orange-50 border border-orange-500 text-orange-500;
}

.publish {
  @apply bg-blue-50 border border-blue-500 text-blue-500;
}

.validated {
  @apply bg-green-50 border border-green-500 text-green-500;
}

.refused {
  @apply bg-red-50 border border-red-500 text-red-500;
}

.in_progress {
  @apply bg-pink-50 border border-pink-500 text-pink-500;
}

.passed {
  @apply bg-cyan-50 border border-cyan-600 text-cyan-700;
}
</style>
