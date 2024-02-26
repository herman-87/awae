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
          v-model="user.lastname"
        />
        <TextField
          :label="t('firstname')"
          placeholder=""
          v-model="user.firstname"
        />
        <TextField
          :label="t('dateOfBirth')"
          placeholder=""
          v-model="user.dateOfBirth"
        />
        <div class="py-4" v-if="sessionStore.token.isSuperAdmin">
          <CheckboxField
            :label="t('setAdmin')"
            :isChecked="user.isAdmin"
            @check="user.isAdmin = !user.isAdmin"
          />
        </div>
        <div class="flex gap-3 items-stretch justify-end">
          <TwButton
            @click="close"
            :cta="t('cancel')"
            :theme="THEME.BORDER_BLUE"
          />
          <TwButton
            @click="createUser"
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
import CheckboxField from "@/components/CheckboxField.vue";
import ModalWrapper from "@/components/ModalWrapper.vue";
import { useUserStore } from "@/stores/user";
import { User } from "@/domain/user";
import CloseButton from "@/components/CloseButton.vue";
import { useSessionStore } from "@/stores/session";

const userStore = useUserStore();
const sessionStore = useSessionStore();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "refresh"): void;
}>();

const close = (): void => {
  emit("close");
};

const isLoading = ref<boolean>(false);

const user = reactive({
  firstname: "",
  lastname: "",
  dateOfBirth: "",
  isAdmin: false,
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

const v$ = useVuelidate(rules, user, { $externalResults });

const createUser = async (): Promise<void> => {
  isLoading.value = true;
  const isFormReady = await v$.value.$validate();
  if (isFormReady) {
    const payload = new User(user);
    user.isAdmin
      ? await userStore.createAdmin(payload)
      : await userStore.createEmployee(payload);
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
      setAdmin: "Set as admin",
      save: "Save",
      cancel: "Cancel",
      formTitle: "Add User Form",
    },
    fr: {
      lastname: "Nom",
      firstname: "Prénom",
      dateOfBirth: "Date de naissance",
      setAdmin: "Définir en tant que administrateur",
      save: "Enregistrer",
      cancel: "Annuler",
      formTitle: "Formulaire d'ajout d'utilisateur",
    },
  },
});
</script>
