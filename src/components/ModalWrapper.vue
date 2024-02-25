<template>
  <section
    class="fixed inset-0 backdrop-blur bg-gray-950/50 flex justify-center items-center z-30"
  >
    <slot />
  </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";

onMounted(() => {
  document.querySelector("body")?.classList.add("overflow-hidden");
});

onUnmounted(() => {
  document.querySelector("body")?.classList.remove("overflow-hidden");
});
</script>
