<template>
  <main class="space-y-4 p-4">
    <div class="py-4 text-lg space-x-2">
      <RouterLink to="/users">
        <span class="font-bold">users</span>
      </RouterLink>
      <span>-</span>
      <span class="text-gray-600">{{ user?.lastname }}</span>
    </div>
    <section class="bg-white rounded-xl p-8 flex justify-between">
      <section class="flex flex-col gap-y-7">
        <DetailItem :label="t('email')" :value="user?.email" />
        <DetailItem :label="t('first_name')" :value="user?.firstname" />
        <DetailItem :label="t('last_name')" :value="user?.lastname" />
        <DetailItem :label="t('date_of_birth')" :value="user?.dateOfBirth" />
      </section>
      <section class="p-12">
        <div
          class="rounded-lg p-8 w-32 h-32 flex justify-center items-center bg-gray-100"
        >
          <UserIcon class="h-10 w-10" />
        </div>
      </section>
    </section>
  </main>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { onBeforeMount, ref } from "vue";
import type { User } from "@/domain/user";
import { useUserStore } from "@/stores/user";
import DetailItem from "@/components/DetailItem.vue";
import UserIcon from "@/components/svg/UserIcon.vue";

const props = defineProps<{
  userId: string;
}>();

const user = ref<User>();
onBeforeMount(async () => {
  user.value = await useUserStore().getEmployeeById(+props.userId);
});

const { t } = useI18n({
  messages: {
    en: {
      email: "E-mail",
      first_name: "First name",
      last_name: "Last name",
      date_of_birth: "Date of birth",
    },
    fr: {
      email: "E-mail",
      first_name: "Prénom",
      last_name: "Nom",
      date_of_birth: "Date de naissance",
    },
  },
});
</script>
