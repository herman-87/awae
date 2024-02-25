<template>
  <tr class="grid grid-cols-6 py-3 items-center">
    <td class="flex flex-col">
      <span>{{ holiday.owner.fullName }}</span>
      <span>{{ holiday.owner.email }}</span>
    </td>
    <td>{{ t(holiday.type.name.toLowerCase()) }}</td>
    <td>{{ holiday.createdAt }}</td>
    <td class="flex items-center justify-between col-span-2">
      <div class="flex flex-col gap-1">
        <span>{{ t("startOn") }}</span>
        <span>{{ holiday.validity.startDate }}</span>
      </div>
      <div class="w-3 h-3 rounded-full bg-gray-400 shrink-0"></div>
      <div class="flex flex-col gap-1">
        <span>{{ t("endOn") }}</span>
        <span>{{ holiday.validity.endDate }}</span>
      </div>
    </td>
    <td class="flex gap-4 items-center">
      <HolidayStatus :status="holiday.status" />
      <div
        :data-test="`holiday-${holiday.id}`"
        @click="$emit('handleClick', +holiday.id)"
        class="cursor-pointer border hover:border-gray-200 rounded min-w-2 px-2 py-1 flex justify-center items-center"
      >
        <MoreActionIcon />
      </div>
    </td>
  </tr>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import type { Holiday } from "@/domain/holiday";
import HolidayStatus from "@/components/HolidayStatus.vue";
import MoreActionIcon from "@/components/svg/MoreActionIcon.vue";

defineProps<{
  holiday: Holiday;
}>();

defineEmits<{
  (e: "handleClick", id: number): void;
}>();

const { t } = useI18n({
  messages: {
    en: {
      startOn: "Start",
      endOn: "End",
    },
    fr: {
      startOn: "Debut",
      endOn: "Fin",
    },
  },
});
</script>
