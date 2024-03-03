<template>
  <section class="p-4 space-y-7">
    <AddHolidayType
      @close="closeModal"
      @refresh="fetchAllHolidaysType"
      v-if="shouldOpenAddHolidayTypeModal"
    />
    <section class="flex justify-between items-end">
      <h1 class="flex flex-col">
        <span class="text-xl text-gray-950">{{ t("holidayTypes") }}</span>
        <span class="text-sm text-gray-700">{{ t("description") }}</span>
      </h1>
      <TwButton
        :cta="t('add')"
        :theme="THEME.BLUE"
        @click="shouldOpenAddHolidayTypeModal = true"
      />
    </section>
    <section class="rounded-md p-5 bg-white grid grid-cols-4 gap-3">
      <section
        :data-test="`holidayType-${type.id}`"
        :key="type.id"
        v-for="type in holidaysTypes"
        @click="goToHolidayTypeDetails(+type.id)"
        class="cursor-pointer rounded-md shadow p-4 space-y-4"
      >
        <h1 class="font-bold text-base text-gray-950">{{ type.name }}</h1>
        <div class="text-xs text-gray-600 text-ellipsis line-clamp-2">
          {{ type.description }}
        </div>
      </section>
    </section>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { onBeforeMount, ref } from "vue";
import { THEME } from "@/utils/enum";
import { type HolidayType } from "@/domain/config";
import { useHolidayConfigStore } from "@/stores/config";
import TwButton from "@/components/TwButton.vue";
import AddHolidayType from "@/components/AddHolidayType.vue";

const configStore = useHolidayConfigStore();

const isLoading = ref<boolean>(false);
const shouldOpenAddHolidayTypeModal = ref<boolean>(false);

const holidaysTypes = ref<HolidayType[]>([]);

const router = useRouter();
const goToHolidayTypeDetails = async (typeId: number): Promise<void> => {
  await router.push(`/settings/${typeId}`);
};

const closeModal = (): void => {
  shouldOpenAddHolidayTypeModal.value = false;
};

const fetchAllHolidaysType = async (): Promise<void> => {
  isLoading.value = true;
  closeModal();
  holidaysTypes.value = await configStore.getAllHolidaysTypes();
  isLoading.value = false;
};

onBeforeMount(async () => {
  await fetchAllHolidaysType();
});

const { t } = useI18n({
  messages: {
    en: {
      add: "Add +",
      holidayTypes: "Holidays types",
      description: "List of holidays that can be requested",
    },
    fr: {
      add: "Ajouter +",
      holidayTypes: "Types de demande de congés",
      description: "Liste des congés pouvant être demandés",
    },
  },
});
</script>
