import { defineStore } from 'pinia'
import { ref } from 'vue';

export const useSessionStore = defineStore('session', () => {
  const token = ref<string | undefined>(undefined);

  console.log(token);

  return { token }
})
