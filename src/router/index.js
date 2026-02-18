import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",

      component: HomeView,
    },

    {
      path: "/admin",
      component: () => import("@/pages/admin/layouts/AdminLayout.vue"),
      children: [
        {
          path: "",
          component: () => import("@/pages/admin/AdminMain.vue"),
          // только авторизованные пользователи могут создавать сообщения
          meta: { requiresAuth: true, role: "admin" },
        },
        
      ],
    },
    {
      path: "/admin/login",
      component: () => import("@/pages/admin/SignIn.vue"),
      // только авторизованные пользователи могут создавать сообщения
      meta: { requiresAuth: false },
    },
    {
      path: "/shop/login",
      component: () => import("@/pages/shop/SignIn.vue"),
      // только авторизованные пользователи могут создавать сообщения
      meta: { requiresAuth: false },
    },
    {
      path: "/shop/register",
      component: () => import("@/pages/shop/SignUp.vue"),
      // только авторизованные пользователи могут создавать сообщения
      meta: { requiresAuth: false },
    },
    
    {
      path: "/page2",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../pages/NotFound.vue"),
    },
  ],
});

export default router;
