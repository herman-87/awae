<template>
  <main
    class="min-h-screen box-border flex flex-col bg-gradient-to-bl from-white from-45% to-fuchsia-100 to-90%"
  >
    <nav
      ref="navBar"
      class="bg-white flex items-center justify-between p-4 border-b border-gray-100"
    >
      <div class="flex gap-4 cursor-pointer font-bold text-blue-500">
        <span
          class="p-2 min-w-12 text-center rounded-md transition ease-linear duration-100 hover:text-white hover:bg-blue-500"
        >
          User
        </span>
        <span
          class="p-2 min-w-12 text-center rounded-md transition ease-linear duration-100 hover:text-white hover:bg-blue-500"
        >
          Holiday
        </span>
      </div>
      <div
        class="w-10 h-10 rounded-full p-2 flex items-center justify-center text-white font-bold bg-gradient-to-bl from-blue-200 from-5% to-blue-500 to-65%"
      >
        {{ initials }}
      </div>
    </nav>
    <section class="flex --awae-height box-border">
      <aside
        class="w-48 bg-white border-r border-gray-200 shadow box-border space-y-10 p-4"
      >
        <h1>Menu</h1>
        <div class="flex flex-col gap-2 cursor-pointer">
          <span class="text-gray-500 hover:bg-gray-100 p-2 rounded-md">
            Admin
          </span>
          <span class="text-gray-500 hover:bg-gray-100 p-2 rounded-md">
            Employee
          </span>
        </div>
      </aside>
      <section class="w-full">
        <RouterView></RouterView>
      </section>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { RouterView } from "vue-router";

const initials = "AD";
const navBar = ref<HTMLElement | undefined>(undefined);
const height = ref<string | undefined>(undefined);
onMounted(() => {
  height.value = navBar.value?.getBoundingClientRect().height+"px"
})
</script>

<style scoped>
.--awae-height {
  height: calc(100vh - v-bind(height));
}
</style>