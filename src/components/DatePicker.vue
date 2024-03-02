<template>
  <VueDatePicker v-model="date"></VueDatePicker>
</template>

<script setup>
import { ref } from "vue";
import "@vuepic/vue-datepicker/dist/main.css";
import VueDatePicker from "@vuepic/vue-datepicker";

const date = ref();
</script>
