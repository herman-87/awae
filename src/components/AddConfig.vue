<script setup lang="ts">
import { reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";

import { THEME } from "@/utils/enum";
import { useHolidayConfigStore } from "@/stores/config";
import { NullableHolidayConfig } from "@/domain/config";

import TwButton from "@/components/TwButton.vue";
import TextField from "@/components/TextField.vue";
import TextareaField from "@/components/TextareaField.vue";

const emit = defineEmits(["refresh", "close"]);

const configStore = useHolidayConfigStore();
const route = useRoute();

const isLoading = ref<boolean>(false);

const saveConfig = async (): Promise<void> => {
  isLoading.value = true;
  const config = NullableHolidayConfig();
  config.holidayTypeId = +route.params.id;
  config.description = state.description;
  config.maximumOfDays = +state.maximumOfDays;
  config.minimumOfDays = +state.minimumOfDays;
  config.numberOfTime = +state.numberOfTime;

  await configStore.createConfig(config);
  isLoading.value = false;
  close();
  emit("refresh");
};

const close = (): void => {
  emit("close");
};

const state = reactive({
  description: "",
  numberOfTime: "",
  minimumOfDays: "",
  maximumOfDays: "",
});

const { t } = useI18n({
  messages: {
    en: {
      cancel: "Cancel",
      save: "Enregistrer",
      description: "Description",
      estimateHours: "Number of times",
      minimumDays: "Minimum days",
      maximumDays: "Maximum days",
    },
    fr: {
      cancel: "Abandonner",
      save: "Save",
      description: "Description",
      estimateHours: "Nombre d'heures",
      minimumDays: "Nombre de jours au minimum",
      maximumDays: "Nombre de jours au maximum",
    },
  },
});
</script>

<template>
  <section class="items-center grid grid-cols-3 gap-4">
    <TextField
      v-model="state.numberOfTime"
      :label="t('estimateHours')"
      placeholder=""
    />
    <TextField
      v-model="state.minimumOfDays"
      :label="t('minimumDays')"
      placeholder=""
    />
    <TextField
      v-model="state.maximumOfDays"
      :label="t('maximumDays')"
      placeholder=""
    />
    <TextareaField
      class="col-span-3"
      :size="140"
      v-model="state.description"
      :label="t('description')"
    />
    <div class="col-span-3 flex gap-4 items-center py-5">
      <TwButton @click="close" :cta="t('cancel')" :theme="THEME.DARK_GRAY" />
      <TwButton
        :isLoading="isLoading"
        @click="saveConfig"
        :cta="t('save')"
        :theme="THEME.BLUE"
      />
    </div>
  </section>
</template>
