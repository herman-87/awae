import AuthPage from "@/views/AuthPage.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "auth",
      component: AuthPage,
    },
    {
      path: "/users",
      name: "dashboard",
      component: () => import("@/views/layout/EntryPage.vue"),
      children: [
        {
          path: "",
          name: "users page",
          component: () => import("@/views/users/UsersListPage.vue"),
        },
        {
          path: "/users/:userId",
          name: "user details page",
          props: true,
          component: () => import("@/views/users/UserDetailsPage.vue"),
        },
      ],
    },
  ],
});

export default router;
