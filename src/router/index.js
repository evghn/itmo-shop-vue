import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { useUserStore } from "@/stores/store.user";

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
          name: "categories",
          component: () => import("@/pages/admin/ProductCategory.vue"),
           meta: { requiresAuth: true, role: "admin" },
          // только авторизованные пользователи могут создавать сообщения
          // meta: { requiresAuth: true, role: "admin" },
          // children: [
          //    {
          //     path: "/:id",
          //     name: "category-update",
          //     component: () => import("@/pages/admin/UpdateCategory.vue"),
          //     meta: { requiresAuth: true, role: "admin" },
          //   },
          // ]
        },

        {
          path: "category-create",
          name: "category-create",
          component: () => import("@/pages/admin/CreateCategory.vue"),
          meta: { requiresAuth: true, role: "admin" },
        },

        {
          path: "categories/:id",
          name: "category-update",
          component: () => import("@/pages/admin/UpdateCategory.vue"),
          meta: { requiresAuth: true, role: "admin" },
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
  
  
  if (!user.isAuthenticated && to.name !== 'admin-login') {
    // перенаправить пользователя на страницу входа
    return { name: 'admin-login' }
  }  else {
    if (user.isAuthenticated && to.meta?.role) {
      if (to.name.meta?.role !== user.role && to.name.meta?.role == "admin") {
        return { name: 'admin-login' }
      }
    } 
  }
})

export default router;
