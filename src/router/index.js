import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { useUserStore } from "@/stores/store.user";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("@/pages/shop/layouts/ShopLayout.vue"),
      children: [
        {
          path: "",
          name: "shop-main",
          component: () => import("@/pages/shop/ShopMain.vue"),
          meta: { requiresAuth: true, role: "admin" },
          // только авторизованные пользователи могут создавать сообщения
        },
      ]
    },

    {
      path: "/admin",
      component: () => import("@/pages/admin/layouts/AdminLayout.vue"),
      meta: { requiresAuth: true, role: "admin" },

      children: [
        {
          path: "",
          name: "admin-panel",
          component: () => import("@/pages/admin/AdminMain.vue"),
          meta: { requiresAuth: true, role: "admin" },
          // только авторизованные пользователи могут создавать сообщения
        },

        {
          path: "categories",
          meta: { requiresAuth: true, role: "admin" },
          children: [
            {
              path: "",
              name: "categories",
              component: () =>
                import("@/pages/admin/categories/CategoryList.vue"),
              meta: { requiresAuth: true, role: "admin" },
            },
            {
              path: "create",
              name: "category-create",
              component: () =>
                import("@/pages/admin/categories/CreateCategory.vue"),
              meta: { requiresAuth: true, role: "admin" },
            },
            {
              path: ":id",
              name: "category-update",
              component: () =>
                import("@/pages/admin/categories/UpdateCategory.vue"),
              meta: { requiresAuth: true, role: "admin" },
            },
          ],
        },
        {
          path: "products",
          meta: { requiresAuth: true, role: "admin" },
          children: [
            {
              path: "",
              name: "products",
              component: () => import("@/pages/admin/products/ProductList.vue"),
              meta: { requiresAuth: true, role: "admin" },
            },
            {
              path: "create",
              name: "product-create",
              component: () =>
                import("@/pages/admin/products/ChangeProduct.vue"),
              meta: { requiresAuth: true, role: "admin" },
            },
            {
              path: ":id",
              name: "product-update",
              component: () =>
                import("@/pages/admin/products/ChangeProduct.vue"),
              meta: { requiresAuth: true, role: "admin" },
            },
          ],
        },
      ],
    },
    {
      path: "/admin/login",
      name: "admin-login",
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

router.beforeEach(async (to, from) => {
  const user = useUserStore();
  // console.log(user);
  
  if (to.meta?.requiresAuth && !user.isAuthenticated) {
    return { name: "admin-login" };
  }

  if (user.isAuthenticated && to.meta?.role) {
    if (to.meta.role === "admin" && user.role !== "admin") {
      return { name: "admin-login" };
    }
  }
  return true;
});

export default router;
