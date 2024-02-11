<template>
  <section class="flex flex-col lg:hidden">
    <div
      class="text-xs font-bold flex justify-end gap-2 p-4 border-b border-gray-200"
    >
      <span>{{ t("doSignup") }}</span>
      <span class="text-blue-500 underline underline-offset-8">{{
        t("signup")
      }}</span>
    </div>
    <div class="flex flex-col gap-0.5 items-center p-4 text-lg">
      <div>
        <span class="font-medium">{{ t("sayWelcome") }}</span>
        <strong class="text-blue-500">AWAE</strong>
      </div>
      <span class="text-[13px]">{{ t("doSignin") }}</span>
    </div>
    <div class="flex flex-col p-4 gap-3">
      <TextField placeholder="" :label="t('email')" v-model="state.email" />
      <PasswordField
        placeholder=""
        :label="t('password')"
        v-model="state.password"
      />
      <div class="grid pt-6">
        <TwButton
          :theme="THEME.BLUE"
          :cta="t('signin')"
          @click="performAuthentication"
        />
      </div>
    </div>
  </section>
  <section class="hidden lg:grid grid-cols-2 min-h-screen">
    <section class="p-4 bg-gray-50">
      <section class="w-1/2 m-auto space-y-10 pt-10">
        <h1 class="flex flex-col items-center gap-2">
          <span class="font-bold text-2xl"
            >{{ t("sayWelcome")
            }}<strong class="text-blue-500">AWAE</strong></span
          >
          <span class="text-base">{{ t("doSignin") }}</span>
        </h1>
        <div class="flex flex-col gap-5">
          <TextField placeholder="" :label="t('email')" v-model="state.email" />
          <PasswordField
            placeholder=""
            :label="t('password')"
            v-model="state.password"
          />
          <div class="grid pt-10">
            <TwButton
              :theme="THEME.BLUE"
              :cta="t('signin')"
              @click="performAuthentication"
            />
          </div>
        </div>
        <div
          class="text-center py-7 space-x-2 border-t border-gray-300 text-sm"
        >
          <span>{{ t("doSignup") }}</span>
          <span class="text-blue-500 font-bold underline underline-offset-4">
            {{ t("signup") }}
          </span>
        </div>
      </section>
    </section>
    <section class="holiday-pic"></section>
  </section>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

import { THEME } from "@/utils/enum";

import TwButton from "@/components/TwButton.vue";
import TextField from "@/components/TextField.vue";
import PasswordField from "@/components/PasswordField.vue";
import { useRouter } from "vue-router";

type State = {
  email: string;
  password: string;
};

const state = reactive<State>({
  email: "",
  password: "",
});

const $externalResults = ref({});

const rules = computed(() => ({
  email: {
    required,
  },
  password: {
    required,
  },
}));

const v$ = useVuelidate(rules, state, { $externalResults });

const router = useRouter();
const performAuthentication = async (): Promise<void> => {
  const isFormReady = await v$.value.$validate();
  // isFormReady && console.log('data', state)
  if (isFormReady) {
    console.log("data ->", state);
    await router.push("/users");
  }
};

const { t } = useI18n({
  messages: {
    en: {
      email: "E-mail",
      password: "Password",
      doSignup: "Don't have an account ?",
      doSignin: "Sign in to your account",
      signup: "Sign Up",
      signin: "Sign In",
      sayWelcome: "Welcome back to ",
    },
    fr: {
      email: "E-mail",
      password: "Mot de passe",
      doSignup: "Vous n'avez pas de compte ?",
      doSignin: "Connectez-vous à votre compte",
      signup: "S'inscrire",
      signin: "Se connecter",
      sayWelcome: "Bon retour chez",
    },
  },
});
</script>

<style scoped>
.holiday-pic {
  @apply bg-[url('../assets/holiday-pic.jpg')] bg-no-repeat bg-cover;
}
</style>
