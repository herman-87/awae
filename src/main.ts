import "./assets/main.css";
import messages from "@/i18n.json";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { createI18n } from "vue-i18n";
import { prepareApis } from "@/utils/gateway";

const i18n = createI18n({
  locale: navigator.language.split("-")[0],
  legacy: false,
  messages,
  fallbackLocale: "en",
});

prepareApis();
const app = createApp(App);

app.use(createPinia());
app.use(i18n);
app.use(router);

app.mount("#app");
