import { defineStore } from "pinia";
import { ref } from "vue";
import { AuthenticationService } from "@/services/awae";
import { Token } from "@/domain/token";

export const useSessionStore = defineStore("session", () => {
  const token = ref<Token | undefined>(undefined);

  type Credential = {
    password: string;
    email: string;
  };

  const login = async (credential: Credential): Promise<void> => {
    try {
      const response = await AuthenticationService.authenticate({
        requestBody: {
          email: credential.email,
          password: credential.password,
        },
      });
      token.value = new Token(response);
      localStorage.setItem("apiAccessToken", token.value.accessToken);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    token,
    login,
  };
});
