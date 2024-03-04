import AuthPage from "@/views/AuthPage.vue";
import { createRouter, createWebHistory } from "vue-router";
import { ROLE } from "@/utils/enum";

declare module "vue-router" {
  interface RouteMeta {
    isPublic?: boolean;
    allowedRoles?: string[];
    tag?: string;
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
      children: [
        {
          path: "",
          name: "users page",
          component: () => import("@/views/users/UsersListPage.vue"),
          meta: {
            isPublic: false,
            allowedRoles: [ROLE.ADMIN, ROLE.SUPER_ADMIN],
            tag: "user",
          },
        },
        {
          path: "/users/:userId",
          name: "user details page",
          props: true,
          component: () => import("@/views/users/UserDetailsPage.vue"),
          meta: {
            isPublic: false,
            allowedRoles: [ROLE.ADMIN, ROLE.SUPER_ADMIN],
            tag: "user",
          },
        },
        {
          path: "/holidays",
          name: "holidays page",
          component: () => import("@/views/holidays/HolidaysListPage.vue"),
          meta: {
            isPublic: false,
            allowedRoles: [ROLE.ADMIN, ROLE.SUPER_ADMIN, ROLE.EMPLOYEE],
            tag: "holiday",
          },
        },
        {
          path: "/settings",
          name: "settings page",
          component: () => import("@/views/settings/SettingsList.vue"),
          meta: {
            isPublic: false,
            allowedRoles: [ROLE.SUPER_ADMIN, ROLE.ADMIN],
            tag: "settings",
          },
        },
        {
          path: "/settings/:id",
          props: true,
          name: "setting details page",
          component: () => import("@/views/settings/SettingsDetails.vue"),
          meta: {
            isPublic: false,
            allowedRoles: [ROLE.SUPER_ADMIN, ROLE.ADMIN],
            tag: "settings",
          },
        },
        {
          path: "/settings/:holidayTypeId/:configId",
          props: true,
          name: "config details page",
          component: () => import("@/views/settings/ConfigDetails.vue"),
          meta: {
            isPublic: false,
            allowedRoles: [ROLE.SUPER_ADMIN, ROLE.ADMIN],
            tag: "settings",
          },
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
