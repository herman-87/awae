<template>
  <section class="p-4">
    <section></section>
    <section class="bg-white p-4 border rounded-md">
      <table class="w-full flex flex-col">
        <thead>
          <tr class="grid grid-cols-4 border-dashed border-b-[1.5px] pt-0 p-4">
            <th class="text-left" v-for="column in columns" :key="column">
              {{ t(column.toLowerCase()) }}
            </th>
          </tr>
        </thead>
        <tbody class="space-y-2">
          <tr
            class="row"
            :key="row.id"
            v-for="row in state.rows"
            :data-test="`user-${row.id}`"
            @click="goToUserDetailsPage(row.id)"
          >
            <td v-for="column in columns" :key="column">
              {{ row.getTextFor(column) }}
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { TABLE_ROW } from "@/utils/enum";
import type { User } from "@/domain/user";
import { onBeforeMount, reactive } from "vue";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

const userStore = useUserStore();

const router = useRouter();
const goToUserDetailsPage = async (userId: string): Promise<void> => {
  await router.push(`/users/${userId}`);
};

type State = {
  rows: User[];
};

const state = reactive<State>({
  rows: [],
});

onBeforeMount(async () => {
  state.rows = await userStore.getAllEmployees();
});

const columns = Object.keys(TABLE_ROW);

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

<style scoped>
.row {
  @apply cursor-pointer grid grid-cols-4 px-3 py-2 rounded overflow-auto bg-white even:bg-gray-100 even:text-gray-900;
}
</style>
