<template>
  <ModalWrapper>
    <section class="bg-white rounded-xl flex flex-col w-[90%] max-w-[500px]">
      <section
        class="font-semibold flex flex-col p-4 border-b border-dashed border-gray-200"
      >
        <CloseButton class="self-end" @click="close" />
        <div class="text-lg">{{ t("formTitle") }}</div>
      </section>
      <section class="p-7 space-y-4">
        <TextField :label="t('name')" placeholder="" v-model="state.type">
          <template #default="{ label }">
            <label :for="label" class="space-x-0.5">
              {{ label }}
              <span class="text-red-600">*</span>
            </label>
          </template>
        </TextField>
        <TextareaField
          class="pb-7"
          v-model="state.description"
          :label="t('description')"
        />
        <div class="flex gap-3 items-stretch justify-end">
          <TwButton
            @click="close"
            :cta="t('cancel')"
            :theme="THEME.BORDER_BLUE"
          />
          <TwButton
            @click="createHolidayType"
            :isLoading="isLoading"
            :cta="t('save')"
            :theme="THEME.BLUE"
          />
        </div>
      </section>
    </section>
  </ModalWrapper>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { THEME } from "@/utils/enum";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import TwButton from "@/components/TwButton.vue";
import TextField from "@/components/TextField.vue";
import ModalWrapper from "@/components/ModalWrapper.vue";
import CloseButton from "@/components/CloseButton.vue";
import TextareaField from "@/components/TextareaField.vue";
import { useHolidayConfigStore } from "@/stores/config";
import { HolidayType } from "@/domain/config";

const useConfigStore = useHolidayConfigStore();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "refresh"): void;
}>();

const close = (): void => {
  emit("close");
};

const isLoading = ref<boolean>(false);

const state = reactive({
  type: "",
  description: "",
});

const $externalResults = ref({});

const rules = computed(() => ({
  type: {
    required,
  },
}));

const v$ = useVuelidate(rules, state, { $externalResults });

const createHolidayType = async (): Promise<void> => {
  isLoading.value = true;
  const isFormReady = await v$.value.$validate();
  if (isFormReady) {
    const payload = new HolidayType(state);
    await useConfigStore.createHolidayType(payload);
    emit("refresh");
  }
  isLoading.value = false;
};

const { t } = useI18n({
  messages: {
    en: {
      name: "Type",
      description: "Description",
      save: "Save",
      cancel: "Cancel",
      formTitle: "Add holiday type form",
    },
    fr: {
      name: "Type",
      description: "Description",
      save: "Enregistrer",
      cancel: "Annuler",
      formTitle: "Formulaire d'ajout d'un type de congé",
    },
  },
});
</script>
