<template>
  <section class="p-4">
    <section></section>
    <section class="bg-white p-4 border rounded-md">
      <table class="w-full flex flex-col">
        <thead>
          <tr class="grid grid-cols-5 border-dashed border-b-[1.5px] pt-0 p-4">
            <th class="text-left" v-for="column in columns" :key="column">
              {{ t(column.toLowerCase()) }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="grid grid-cols-5 px-3 py-2 rounded overflow-auto bg-white even:bg-gray-100 even:text-gray-900"
            v-for="row in state.rows" 
            :key="row.id"
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

const userStore = useUserStore();

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
      account_status: "Account Status",
    },
    fr: {
      email: "E-mail",
      first_name: "Prénom",
      last_name: "Nom",
      date_of_birth: "Date de naissance",
      account_status: "Statut du compte",
    },
  },
});
</script>
