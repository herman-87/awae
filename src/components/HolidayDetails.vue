<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { onBeforeMount, ref } from "vue";
import { useHolidayStore } from "@/stores/holiday";
import { type Holiday, NullableHoliday } from "@/domain/holiday";
import InLoading from "@/components/InLoading.vue";
import CloseButton from "@/components/CloseButton.vue";
import ModalWrapper from "@/components/ModalWrapper.vue";
import HolidayStatus from "@/components/HolidayStatus.vue";

const holidayStore = useHolidayStore();
const holiday = ref<Holiday>(NullableHoliday());

const props = defineProps<{
  holidayId: number;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();

const close = (): void => {
  emit("close");
};

const isLoading = ref<boolean>(false);
onBeforeMount(async () => {
  isLoading.value = true;
  holiday.value = await holidayStore.getHolidayById(props.holidayId);
  isLoading.value = false;
});

const { t } = useI18n({
  messages: {
    en: {
      holidayDetails: "Holiday details",
      from: "From",
      to: "To",
    },
    fr: {
      holidayDetails: "Détails des vacances",
      from: "Du",
      to: "Au",
    },
  },
});
</script>

<template>
  <ModalWrapper>
    <section
      class="absolute rounded-md z-50 right-4 border w-1/2 h-[95vh] bg-white"
    >
      <div
        class="flex items-center justify-between px-4 py-2.5 border-b border-gray-100"
      >
        <h2 class="font-semibold text-lg">{{ t("holidayDetails") }}</h2>
        <CloseButton @click="close" />
      </div>
      <div class="flex h-full items-center" v-if="isLoading">
        <InLoading />
      </div>
      <section class="divide-y divide-gray-200" v-else>
        <section class="p-4">
          <div class="flex gap-3">
            <span class="font-bold text-lg">{{ t("owner") }}</span>
            <div class="flex flex-col">
              <span>{{ holiday.owner.email }}</span>
              <span>{{ holiday.owner.fullName }}</span>
            </div>
          </div>
        </section>
        <section class="p-4 flex flex-col gap-3">
          <div class="flex justify-between items-center">
            <span>{{ t("type") }}</span>
            <span>{{ holiday.type.name }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span>{{ t("title") }}</span>
            <span>{{ holiday.title }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span>{{ t("status") }}</span>
            <HolidayStatus :status="holiday.status" />
          </div>
          <div class="flex justify-between items-center">
            <span>{{ t("period") }}</span>
            <span>
              {{ holiday.validity.formatDate(t) }}
            </span>
          </div>
          <div class="flex justify-between items-center">
            <span>{{ t("createdAt") }}</span>
            <span>{{ holiday.createdAt }}</span>
          </div>
        </section>
        <section class="p-4 space-y-1.5">
          <span class="text-xl font-medium">{{ t("description") }}</span>
          <p>{{ holiday.description }}</p>
        </section>
      </section>
    </section>
  </ModalWrapper>
</template>
