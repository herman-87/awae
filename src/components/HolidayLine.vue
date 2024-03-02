<template>
  <tr
    :class="[
      'grid py-3 items-center',
      hasAccess ? 'grid-cols-6' : 'grid-cols-5',
    ]"
  >
    <td class="flex flex-col">
      <span>{{ holiday.owner?.fullName }}</span>
      <span>{{ holiday.owner?.email }}</span>
    </td>
    <td v-if="hasAccess">{{ t(holiday.type.name?.toLowerCase()) }}</td>
    <td>{{ holiday?.createdAt }}</td>
    <td class="flex items-center justify-between col-span-2">
      <div class="flex flex-col gap-1">
        <span>{{ t("startOn") }}</span>
        <span>{{ holiday.validity?.startDate }}</span>
      </div>
      <div class="w-3 h-3 rounded-full bg-gray-400 shrink-0"></div>
      <div class="flex flex-col gap-1">
        <span>{{ t("endOn") }}</span>
        <span>{{ holiday.validity?.endDate }}</span>
      </div>
    </td>
    <td class="flex pl-5 gap-4 items-center">
      <HolidayStatus :status="holiday?.status" />
      <div
        v-if="hasAccess"
        :data-test="`holiday-${holiday?.id}`"
        @click="$emit('handleClick', +holiday?.id)"
        class="cursor-pointer border hover:border-gray-200 rounded min-w-2 px-2 py-[2.9px] flex justify-center items-center"
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
  hasAccess: boolean;
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
