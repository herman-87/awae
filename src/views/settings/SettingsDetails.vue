<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { onBeforeMount, ref } from "vue";
import { useHolidayConfigStore } from "@/stores/config";
import {
  HolidayConfig,
  type HolidayType,
  NullableHolidayType,
} from "@/domain/config";
import ConfigStatus from "@/components/ConfigStatus.vue";
import AddConfig from "@/components/AddConfig.vue";
import TwButton from "@/components/TwButton.vue";
import { THEME } from "@/utils/enum";
import InLoading from "@/components/InLoading.vue";

const configStore = useHolidayConfigStore();
const holidayType = ref<HolidayType>(NullableHolidayType());
const holidayConfigs = ref<Grid[]>([]);

const props = defineProps<{
  id?: number;
}>();

const { t } = useI18n({
  messages: {
    en: {
      type: "Type",
      status: "Status",
      configs: "Configuration",
      description: "Description",
      estimateHours: "Number of times",
      minimumDays: "Minimum days",
      maximumDays: "Maximum days",
      add: "Add new config",
    },
    fr: {
      type: "Type",
      status: "Status",
      configs: "Configuration",
      description: "Description",
      estimateHours: "Nombre d'heures",
      minimumDays: "Nombre de jours au minimum",
      maximumDays: "Nombre de jours au maximum",
      add: "Ajouter une nouvelle configuration",
    },
  },
});

const headersColumns = [
  "estimateHours",
  "minimumDays",
  "maximumDays",
  "status",
];

class Grid {
  constructor(private config: HolidayConfig) {}
  get id(): number | undefined {
    return this.config.id;
  }

  getTextFor = (column: string): string | undefined => {
    switch (column) {
      case "status":
        return this.config.status;
      case "estimateHours":
        return this.config.numberOfTime?.toString();
      case "minimumDays":
        return this.config.minimumOfDays?.toString();
      case "maximumDays":
        return this.config.maximumOfDays?.toString();
      default:
        return "";
    }
  };
}
const isLoading = ref<boolean>(false);
const shouldAddConfig = ref<boolean>(false);
const close = () => {
  shouldAddConfig.value = false;
};
const fetchSettingsDetails = async (): Promise<void> => {
  isLoading.value = true;
  close();
  const [type, configs] = await Promise.all([
    configStore.getHolidayTypeById(props?.id as number),
    configStore.getAllConfigsByHolidayType(props?.id as number),
  ]);

  holidayType.value = type;
  holidayConfigs.value = configs.map((config) => new Grid(config));
  isLoading.value = false;
};

onBeforeMount(async () => {
  await fetchSettingsDetails();
});
</script>

<template>
  <section class="p-10 flex flex-col gap-4">
    <InLoading v-if="isLoading" />
    <template v-else>
      <section class="rounded-md space-y-5 p-7 bg-white">
        <div class="flex flex-col font-bold">
          <span class="text-gray-950 text-base">{{ t("type") }}</span>
          <span class="px-4 text-blue-800">{{ holidayType.name }}</span>
        </div>
        <div class="flex flex-col">
          <span class="text-gray-950 font-bold text-lg">
            {{ t("description") }}
          </span>
          <p class="px-4 text-blue-800 font-medium">
            {{ holidayType.description }}
          </p>
        </div>
      </section>
      <section v-if="shouldAddConfig" class="rounded-md p-7 bg-white">
        <AddConfig @close="close" @refresh="fetchSettingsDetails" />
      </section>
      <section class="rounded-md p-7 bg-white space-y-8">
        <h2 class="flex justify-between items-center">
          <span>{{ t("configs") }}</span>
          <TwButton
            v-if="!shouldAddConfig"
            :cta="t('add')"
            :theme="THEME.DARK_GRAY"
            @click="shouldAddConfig = true"
            class="!px-4 !text-sm !rounded-lg"
          />
        </h2>
        <table class="w-full">
          <thead>
            <tr
              :style="{
                gridTemplateColumns: `repeat(${headersColumns.length}, minmax(0, 1fr))`,
              }"
              class="grid bg-blue-100 text-blue-800 px-3 rounded"
            >
              <th
                class="text-left"
                v-for="column in headersColumns"
                :key="column"
              >
                {{ t(column) }}
              </th>
            </tr>
          </thead>
          <tbody class="flex flex-col gap-y-2 py-2">
            <tr
              :style="{
                gridTemplateColumns: `repeat(${headersColumns.length}, minmax(0, 1fr))`,
              }"
              class="rounded transition ease-linear duration-75 hover:border-2 hover:border-blue-500 cursor-pointer grid items-center text-blue-800 font-extrabold border border-blue-100"
              v-for="config in holidayConfigs"
              :key="config.id"
            >
              <td class="px-2" v-for="column in headersColumns" :key="column">
                <ConfigStatus
                  :status="config.getTextFor(column)"
                  v-if="column === 'status'"
                />
                <span v-else>{{ config.getTextFor(column) }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </template>
  </section>
</template>
