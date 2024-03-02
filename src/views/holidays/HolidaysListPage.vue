<template>
  <section class="p-4 space-y-7">
    <HolidayDetails
      :holidayId="currentHolidayId"
      v-if="shouldDisplayModalDetails"
      @close="closeHolidayDetailsModal"
    />
    <InLoading v-if="isLoading" />
    <section class="flex flex-col gap-4" v-else>
      <div class="flex flex-col gap-4">
        <h2 class="flex flex-col font-sans font-medium">
          <span class="text-blue-800 text-xl">
            {{ t("holidays", { total: holidays.length }) }}
          </span>
          <span class="text-xs text-gray-800 font-bold">
            {{ t("description") }}
          </span>
        </h2>
        <div class="border-b border-gray-100 flex items-2">
          <span
            :data-test="t('incoming')"
            @click="shouldDisplayOnlyICreated = false"
            :class="[
              'rounded-t min-w-16 text-sm text-center transition duration-500 ease-in px-4 py-2 font-bold cursor-pointer',
              shouldDisplayOnlyICreated
                ? 'text-gray-500'
                : 'text-blue-600 border-b-2 bg-blue-50 border-blue-600',
            ]"
          >
            {{ t("incoming") }}
          </span>
          <span
            v-if="!session.token.isSuperAdmin"
            :data-test="t('private')"
            @click="shouldDisplayOnlyICreated = true"
            :class="[
              'rounded-t min-w-16 text-sm text-center transition duration-500 ease-in px-4 py-2 font-bold cursor-pointer',
              shouldDisplayOnlyICreated
                ? 'text-blue-600 border-b-2 bg-blue-50 border-blue-600'
                : 'text-gray-500',
            ]"
          >
            {{ t("private") }}
          </span>
        </div>
      </div>
      <table class="w-full text-xs">
        <thead>
          <tr
            :class="[
              'grid rounded px-2 py-1 bg-gray-200 text-gray-700',
              hasAccess ? 'grid-cols-6' : 'grid-cols-5',
            ]"
          >
            <th>{{ t("owner") }}</th>
            <th v-if="hasAccess">{{ t("type") }}</th>
            <th>{{ t("createdAt") }}</th>
            <th class="col-span-2">{{ t("period") }}</th>
            <th class="pl-6">{{ t("status") }}</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <HolidayLine
            v-for="holiday in holidays"
            :key="holiday?.id"
            :holiday="holiday"
            @handleClick="openHolidayDetailsModal"
            :hasAccess="hasAccess"
          />
        </tbody>
      </table>
    </section>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import type { Holiday } from "@/domain/holiday";
import { useHolidayStore } from "@/stores/holiday";
import { useSessionStore } from "@/stores/session";
import {
  computed,
  defineAsyncComponent,
  onBeforeMount,
  type Ref,
  ref,
  watch,
} from "vue";

const InLoading = defineAsyncComponent(
  () => import("@/components/InLoading.vue"),
);
const HolidayLine = defineAsyncComponent(
  () => import("@/components/HolidayLine.vue"),
);
const HolidayDetails = defineAsyncComponent(
  () => import("@/components/HolidayDetails.vue"),
);

const session = useSessionStore();
const holidayStore = useHolidayStore();
const isLoading = ref<boolean>(false);

const list = ref<Holiday[]>([]) as Ref<Holiday[]>;
const holidays = computed<Holiday[]>(() => list.value);

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

const shouldDisplayOnlyICreated = ref<boolean>(false);
const hasAccess = computed<boolean>(
  () => shouldDisplayOnlyICreated.value || session.token.hasAccess,
);

const getAllHolidays = async (): Promise<void> => {
  isLoading.value = true;
  list.value = shouldDisplayOnlyICreated.value
    ? await holidayStore.getMyHolidays()
    : await holidayStore.getAllHolidays();
  isLoading.value = false;
};

onBeforeMount(async () => {
  await getAllHolidays();
});

watch(
  () => shouldDisplayOnlyICreated.value,
  async () => {
    await getAllHolidays();
  },
);

const { t } = useI18n({
  messages: {
    en: {
      type: "Type",
      owner: "Owner",
      status: "Status",
      period: "Duration",
      createdAt: "Date received",
      holidays: "Holidays {total}",
      incoming: "In coming",
      private: "Private",
      description:
        "Here you will find all created holidays. | here you will all holidays you created.",
    },
    fr: {
      type: "Type",
      period: "Durée",
      status: "Status",
      owner: "Propriétaire",
      createdAt: "Date de réception",
      holidays: "Congés {total}",
      incoming: "Arrivant",
      private: "Privé",
      description:
        "Ici vous trouverez tous les demandes de congés crées. | ici vous verrez toutes les demandes de congés que vous avez créés.",
    },
  },
});
</script>

<style scoped>
th {
  @apply text-left;
}
</style>
