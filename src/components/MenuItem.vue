<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";

type Link = {
  label: string;
  path: string;
  tag: string;
};
const props = defineProps<{ link: Link }>();

const route = useRoute();
const isCurrentRoute = computed<boolean>(
  () => route.meta.tag === props.link.tag,
);

const router = useRouter();
const goTo = async (path: string): Promise<void> => {
  await router.push(path);
};

const { t } = useI18n({
  messages: {
    en: {
      user: "User",
      holiday: "Holiday",
      employee: "Employee",
      settings: "Settings",
    },
    fr: {
      holiday: "Congé",
      user: "Utilisateur",
      employee: "Employer",
      settings: "Configurations",
    },
  },
});
</script>

<template>
  <div
    :data-test="t(link.label)"
    @click="goTo(link.path)"
    :class="[
      'font-bold transition duration-75 cursor-pointer flex text-sm items-center space-x-1 p-2',
      isCurrentRoute ? 'rounded-md bg-blue-100 text-blue-700' : 'text-gray-400',
    ]"
  >
    <span
      :class="[
        'shrink-0 w-4 h-4 rounded-full bg-white border-[3px]',
        isCurrentRoute ? 'border-blue-700 ' : 'border-gray-400',
      ]"
    ></span>
    <span>{{ t(link.label) }}</span>
  </div>
</template>
