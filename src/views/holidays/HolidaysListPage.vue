<template>
  <section class="p-4 space-y-7">
    <HolidayDetails
      :holidayId="currentHolidayId"
      v-if="shouldDisplayModalDetails"
      @close="closeHolidayDetailsModal"
    />
    <InLoading v-if="isLoading" />
    <table class="w-full text-xs" v-else>
      <thead>
        <tr
          class="grid grid-cols-6 rounded px-2 py-1 bg-gray-200 text-gray-700"
        >
          <th>{{ t("owner") }}</th>
          <th>{{ t("type") }}</th>
          <th>{{ t("createdAt") }}</th>
          <th class="col-span-2">{{ t("period") }}</th>
          <th>{{ t("status") }}</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100">
        <HolidayLine
          v-for="holiday in holidays"
          :key="holiday.id"
          :holiday="holiday"
          @handleClick="openHolidayDetailsModal"
        />
      </tbody>
    </table>
  </section>
</template>

<script setup lang="ts">
import { defineAsyncComponent, onBeforeMount, ref } from "vue";
import type { Holiday } from "@/domain/holiday";
import { useHolidayStore } from "@/stores/holiday";
import HolidayLine from "@/components/HolidayLine.vue";
import { useI18n } from "vue-i18n";
import HolidayDetails from "@/components/HolidayDetails.vue";
const InLoading = defineAsyncComponent(
  () => import("@/components/InLoading.vue"),
);

const holidayStore = useHolidayStore();
const isLoading = ref<boolean>(false);
const holidays = ref<Holiday[]>([]);

const currentHolidayId = ref<number | undefined>(undefined);
const shouldDisplayModalDetails = ref<boolean>(false);

const openHolidayDetailsModal = (holidayId: number): void => {
  currentHolidayId.value = holidayId;
  shouldDisplayModalDetails.value = true;
};

const closeHolidayDetailsModal = (): void => {
  currentHolidayId.value = undefined;
  shouldDisplayModalDetails.value = false;
};

onBeforeMount(async () => {
  isLoading.value = true;
  holidays.value = await holidayStore.getAllHolidays();
  isLoading.value = false;
});

const { t } = useI18n({
  messages: {
    en: {
      type: "Type",
      owner: "Owner",
      status: "Status",
      period: "Duration",
      createdAt: "Date received",
    },
    fr: {
      type: "Type",
      period: "Durée",
      status: "Status",
      owner: "Propriétaire",
      createdAt: "Date de réception",
    },
  },
});
</script>

<style scoped>
th {
  @apply text-left;
}
</style>
