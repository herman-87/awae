<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { onBeforeMount, ref } from "vue";
import { useHolidayConfigStore } from "@/stores/config";
import { type HolidayConfig, NullableHolidayConfig } from "@/domain/config";

import TwButton from "@/components/TwButton.vue";
import { THEME } from "@/utils/enum";
import ConfigStatus from "@/components/ConfigStatus.vue";

const configStore = useHolidayConfigStore();
const config = ref<HolidayConfig>(NullableHolidayConfig());

const props = defineProps<{
  configId?: number;
}>();

const { t } = useI18n({
  messages: {
    en: {
      apply: "Apply",
      close: "Close",
      draft: "Draft",
      status: "Status",
      configs: "Configuration",
      description: "Description",
      estimateHours: "Number of times :",
      minimumDays: "Minimum days :",
      maximumDays: "Maximum days :",
    },
    fr: {
      apply: "Applique",
      close: "Fermer",
      draft: "Brouillon",
      status: "Status",
      configs: "Configuration",
      description: "Description",
      estimateHours: "Nombre d'heures :",
      minimumDays: "Nombre de jours au minimum :",
      maximumDays: "Nombre de jours au maximum :",
    },
  },
});

const isDetailsLoading = ref<boolean>(false);
const isAppliedLoading = ref<boolean>(false);
const isClosedLoading = ref<boolean>(false);

const closeConfig = async (): Promise<void> => {
  isClosedLoading.value = true;
  await configStore.deactivateConfig(props.configId as number);
  isClosedLoading.value = false;
  await fetchDetails();
};

const applyConfig = async (): Promise<void> => {
  isAppliedLoading.value = true;
  await configStore.activeConfig(props.configId as number);
  isAppliedLoading.value = false;
  await fetchDetails();
};

const fetchDetails = async (): Promise<void> => {
  isDetailsLoading.value = true;
  config.value = await configStore.getConfigById(props.configId as number);
  isDetailsLoading.value = false;
};

onBeforeMount(async () => {
  await fetchDetails();
});
</script>

<template>
  <section class="p-4 flex flex-col gap-4">
    <section class="bg-white rounded-lg p-7 flex flex-col gap-y-7">
      <section class="flex gap-3 items-center justify-end">
        <TwButton
          v-if="config.isDraft || config.isClosed"
          :cta="t('apply')"
          :theme="THEME.GREEN"
          @click="applyConfig"
          :is-loading="isAppliedLoading"
        />
        <TwButton
          v-if="config.isApplied"
          :cta="t('close')"
          :theme="THEME.RED"
          @click="closeConfig"
          :is-loading="isClosedLoading"
        />
      </section>
      <section class="grid grid-cols-2 gap-7">
        <div class="flex gap-4">
          <span class="text-gray-950 font-bold">{{ t("estimateHours") }}</span>
          <span>{{ config.numberOfTime }}</span>
        </div>
        <div class="flex gap-4">
          <span class="text-gray-950 font-bold">{{ t("minimumDays") }}</span>
          <span>{{ config.minimumOfDays }}</span>
        </div>
        <div class="flex gap-4">
          <span class="text-gray-950 font-bold">{{ t("maximumDays") }}</span>
          <span>{{ config.maximumOfDays }}</span>
        </div>
        <div class="flex gap-4">
          <span class="text-gray-950 font-bold">{{ t("status") }}</span>
          <ConfigStatus :is-detail-mode="true" :status="config.status" />
        </div>
      </section>
    </section>
    <section class="bg-white rounded-lg p-7 flex flex-col gap-3">
      <h1 class="text-xl font-semibold">{{ t("description") }}</h1>
      <div class="text-gray-950">{{ config.description }}</div>
    </section>
  </section>
</template>
