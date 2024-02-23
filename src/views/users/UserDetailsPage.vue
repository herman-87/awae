<template>
  <main class="space-y-4 p-4">
    <EditUser
      :user="user"
      v-if="shouldEditUser"
      @refresh="fetchUserDetails"
      @close="shouldEditUser = false"
    />
    <section class="flex justify-between items-center">
      <div class="py-4 text-lg space-x-2">
        <RouterLink to="/users">
          <span class="font-bold">users</span>
        </RouterLink>
        <span>-</span>
        <span class="text-gray-600">{{ user?.lastname }}</span>
      </div>
      <TwButton
        :cta="t('edit')"
        :theme="THEME.BLUE"
        @click="shouldEditUser = true"
      />
    </section>
    <InLoading v-if="isLoading" />
    <section
      v-else
      class="space-y-4 bg-white rounded-xl p-8 flex justify-between"
    >
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
import { THEME } from "@/utils/enum";
import { useRouter } from "vue-router";
import { onBeforeMount, ref } from "vue";
import type { User } from "@/domain/user";
import { useUserStore } from "@/stores/user";
import EditUser from "@/components/EditUser.vue";
import TwButton from "@/components/TwButton.vue";
import InLoading from "@/components/InLoading.vue";
import DetailItem from "@/components/DetailItem.vue";
import UserIcon from "@/components/svg/UserIcon.vue";

const props = defineProps<{
  userId?: string;
}>();

const user = ref<User>();
const shouldEditUser = ref<boolean>(false);
const isLoading = ref<boolean>(false);

const router = useRouter();
const fetchUserDetails = async (): Promise<void> => {
  shouldEditUser.value = false;
  isLoading.value = true;
  if (props.userId) {
    user.value = await useUserStore().getEmployeeById(+props.userId);
    isLoading.value = false;
  } else {
    isLoading.value = false;
    await router.push("/403");
  }
};

onBeforeMount(async () => {
  await fetchUserDetails();
});

const { t } = useI18n({
  messages: {
    en: {
      email: "E-mail",
      first_name: "First name",
      last_name: "Last name",
      date_of_birth: "Date of birth",
      edit: "Edit",
    },
    fr: {
      email: "E-mail",
      first_name: "Prénom",
      last_name: "Nom",
      date_of_birth: "Date de naissance",
      edit: "Editer",
    },
  },
});
</script>
