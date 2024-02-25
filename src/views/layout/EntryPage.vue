<template>
  <main class="min-h-screen box-border flex flex-col bg-gray-100/40">
    <nav
      ref="navBar"
      class="bg-white flex items-center justify-between p-4 border-b border-gray-100"
    >
      <h2 class="--awae-text-stroke">AWAE</h2>
      <div
        class="w-10 h-10 rounded-full p-2 flex items-center justify-center text-white font-bold bg-gradient-to-bl from-blue-200 from-5% to-blue-500 to-65%"
      >
        {{ initials }}
      </div>
    </nav>
    <section class="flex --awae-height box-border">
      <AsideMenu />
      <section class="w-full">
        <RouterView></RouterView>
      </section>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { RouterView } from "vue-router";
import AsideMenu from "@/components/AsideMenu.vue";
import { useSessionStore } from "@/stores/session";

const session = useSessionStore();
const initials = session.token?.avatar;
const navBar = ref<HTMLElement | undefined>(undefined);
const height = ref<string | undefined>(undefined);
onMounted(() => {
  height.value = navBar.value?.getBoundingClientRect().height + "px";
});
</script>

<style scoped>
.--awae-height {
  height: calc(100vh - v-bind(height));
}

.--awae-text-stroke {
  background: -webkit-linear-gradient(#121d9f, #2095f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 600;
  font-size: 26px;
}
</style>
