import AuthPage from "@/views/AuthPage.vue";
import { createRouter, createWebHistory } from "vue-router";
import { ROLE } from "@/utils/enum";

declare module "vue-router" {
  interface RouteMeta {
    isPublic?: boolean;
    allowedRoles?: string[];
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "auth",
      component: AuthPage,
      meta: {
        isPublic: true,
      },
    },
    {
      path: "/users",
      name: "dashboard",
      component: () => import("@/views/layout/EntryPage.vue"),
      meta: {
        isPublic: false,
        allowedRoles: [ROLE.ADMIN, ROLE.SUPER_ADMIN],
      },
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
    {
      path: "/403",
      name: "unauthorized",
      component: () => import("@/views/UnauthorizedPage.vue"),
    },
  ],
});

export default router;
