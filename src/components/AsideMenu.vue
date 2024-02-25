<template>
  <section
    class="w-48 text-[15px] bg-white border-r border-gray-200 shadow box-border pt-10 px-4"
  >
    <div v-for="link in links" :key="link.label">
      <MenuItem
        :link="link"
        v-if="session.token?.hasRoleToAccess(link.allowedRoles)"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ROLE } from "@/utils/enum";
import MenuItem from "@/components/MenuItem.vue";
import { useSessionStore } from "@/stores/session";

const session = useSessionStore();

const links = [
  {
    tag: "user",
    label: "user",
    path: "/users",
    allowedRoles: [ROLE.SUPER_ADMIN],
  },
  {
    tag: "user",
    label: "employee",
    path: "/users",
    allowedRoles: [ROLE.ADMIN],
  },
  {
    tag: "holiday",
    label: "holiday",
    path: "/holidays",
    allowedRoles: [ROLE.SUPER_ADMIN, ROLE.ADMIN, ROLE.EMPLOYEE],
  },
];
</script>
