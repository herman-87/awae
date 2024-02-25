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
        <TextField
          :label="t('lastname')"
          placeholder=""
          v-model="userEdit.lastname"
        />
        <TextField
          :label="t('firstname')"
          placeholder=""
          v-model="userEdit.firstname"
        />
        <TextField
          :label="t('dateOfBirth')"
          placeholder=""
          v-model="userEdit.dateOfBirth"
        />
        <div class="pt-4 flex gap-3 items-stretch justify-end">
          <TwButton
            @click="close"
            :cta="t('cancel')"
            :theme="THEME.BORDER_BLUE"
          />
          <TwButton
            :cta="t('save')"
            @click="editUser"
            :disabled="!hasSomeChanges"
            :theme="hasSomeChanges ? THEME.BLUE : THEME.GRAY"
            :isLoading="isLoading"
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
import { User } from "@/domain/user";
import useVuelidate from "@vuelidate/core";
import { useUserStore } from "@/stores/user";
import { required } from "@vuelidate/validators";
import TwButton from "@/components/TwButton.vue";
import TextField from "@/components/TextField.vue";
import ModalWrapper from "@/components/ModalWrapper.vue";
import CloseButton from "@/components/CloseButton.vue";

const userStore = useUserStore();
const props = defineProps<{
  user: User;
}>();
const emit = defineEmits<{
  (e: "close"): void;
  (e: "refresh"): void;
}>();

const isLoading = ref<boolean>(false);

const close = (): void => {
  emit("close");
};

const userEdit = reactive({
  firstname: props.user.firstname,
  lastname: props.user.lastname,
  dateOfBirth: props.user.dateOfBirth,
});

const hasSomeChanges = computed<boolean>(() => {
  return (
    JSON.stringify(userEdit) !==
    JSON.stringify({
      firstname: props.user.firstname,
      lastname: props.user.lastname,
      dateOfBirth: props.user.dateOfBirth,
    })
  );
});

const $externalResults = ref({});

const rules = computed(() => ({
  firstname: {
    required,
  },
  lastname: {
    required,
  },
  dateOfBirth: {
    required,
  },
}));

const v$ = useVuelidate(rules, userEdit, { $externalResults });

const editUser = async (): Promise<void> => {
  isLoading.value = true;
  const isFormReady = await v$.value.$validate();
  if (isFormReady) {
    const payload = new User(userEdit);
    payload.id = +props.user.id;
    await userStore.updateUser(payload);
    emit("refresh");
  }
  isLoading.value = false;
};

const { t } = useI18n({
  messages: {
    en: {
      lastname: "Last name",
      firstname: "First name",
      dateOfBirth: "Date of birth",
      save: "Save",
      cancel: "Cancel",
      formTitle: "Edit User Form",
    },
    fr: {
      lastname: "Nom",
      firstname: "Prénom",
      dateOfBirth: "Date de naissance",
      save: "Enregistrer",
      cancel: "Annuler",
      formTitle: "Formulaire d'édition d'utilisateur",
    },
  },
});
</script>
