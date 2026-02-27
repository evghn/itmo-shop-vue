<script setup>
import router from "@/router";
import { useUserStore } from "@/stores/store.user";
import { ref } from "vue";

const userDropDownPanel = ref(false);
const userStore = useUserStore();

const logout = async () => {
  const res = await userStore.logout();

  if (res) {
    router.push({ path: "/" });
  }
};
</script>
<template>
  <div class="bg-gray-500 min-h-screen">
    <div class="app-wrapper min-h-full">
      <!-- Navbar -->
      <nav
        class="fixed top-0 left-0 right-0 h-14 bg-white border-b border-gray-200 z-30 flex items-center px-4"
      >
        <!-- Left section -->
        <div class="flex items-center">
          <!-- Sidebar Toggle -->
          <button
            type="button"
            data-lte-toggle="sidebar"
            class="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <!-- Nav Links -->
          <RouterLink
            to="/admin"
            class="nav-link px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hidden sm:block"
            >Home
          </RouterLink>
        </div>

        <!-- Spacer -->
        <div class="flex-1"></div>

        <!-- Right nav items -->
        <div class="flex items-center gap-1">
          <!-- Notifications Dropdown -->
          <div class="dropdown relative">
            <button
              type="button"
              data-lte-toggle="dropdown"
              class="p-2 rounded-lg hover:bg-gray-100 text-gray-600 relative"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span
                class="absolute top-0.5 right-0.5 w-4 h-4 bg-yellow-500 rounded-full text-[10px] text-white flex items-center justify-center font-medium"
                >5</span
              >
            </button>
          </div>

          <!-- User Dropdown -->
          <div
            class="dropdown relative ml-1"
            :class="{ 'dropdown-open': userDropDownPanel }"
          >
            <button
              type="button"
              @click="userDropDownPanel = !userDropDownPanel"
              class="flex items-center p-1.5 rounded-lg hover:bg-gray-100 cursor-pointer"
            >
              <img
                src="https://ui-avatars.com/api/?name=Admin+User&background=3b82f6&color=fff"
                alt="Admin"
                class="w-8 h-8 rounded-full"
              />
            </button>
            <div
              class="dropdown-menu absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 hidden z-50"
            >
              <div class="px-4 py-2 border-b border-gray-200">
                <p class="text-sm font-medium text-gray-800">Admin User</p>
                <p class="text-xs text-gray-500">Administrator</p>
              </div>
              <a
                href="#"
                @click.stop.prevent="logout"
                class="dropdown-item flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </a>
            </div>
          </div>
        </div>
      </nav>

      <!-- Sidebar -->
      <aside
        class="app-sidebar fixed top-14 left-0 bottom-0 w-sidebar bg-sidebar text-gray-300 z-20 sidebar-transition overflow-x-hidden flex flex-col"
      >
        <!-- Navigation Menu -->
        <nav
          class="sidebar-menu py-4 px-2 flex-1 overflow-y-auto"
          data-lte-toggle="treeview"
        >
          <ul class="space-y-1">
            <!-- Dashboard -->
            <li class="nav-item has-treeview menu-open">
              <a
                href="#"
                class="nav-link flex items-center px-3 py-2 rounded-lg hover:bg-sidebar-light text-gray-300 hover:text-white"
              >
                <svg
                  class="w-5 h-5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <span class="ml-3 flex-1">Управление категориями</span>
                <svg
                  class="w-4 h-4 treeview-icon rotate-90"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
              <ul class="nav-treeview ml-4 mt-1 space-y-1">
                <li class="nav-item">
                  <a
                    href=""
                    @click.stop.prevent="router.push({ name: 'categories' })"
                    class="nav-link flex items-center px-3 py-2 rounded-lg hover:bg-sidebar-light text-gray-400 hover:text-white text-sm"
                  >
                    <span
                      class="w-1.5 h-1.5 rounded-full bg-gray-500 mr-3"
                    ></span>
                    <span>Категории</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    href=""
                    @click.stop.prevent="
                      router.push({ name: 'category-create' })
                    "
                    class="nav-link flex items-center px-3 py-2 rounded-lg hover:bg-sidebar-light text-gray-400 hover:text-white text-sm"
                  >
                    <span
                      class="w-1.5 h-1.5 rounded-full bg-gray-500 mr-3"
                    ></span>
                    <span>Добавление категорий</span>
                  </a>
                </li>
              </ul>
            </li>

            <li class="nav-item has-treeview menu-open">
              <a
                href="#"
                class="nav-link flex items-center px-3 py-2 rounded-lg hover:bg-sidebar-light text-gray-300 hover:text-white"
              >
                <svg
                  class="w-5 h-5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <span class="ml-3 flex-1">Управление товарами</span>
                <svg
                  class="w-4 h-4 treeview-icon rotate-90"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
              <ul class="nav-treeview ml-4 mt-1 space-y-1">
                <li class="nav-item">
                  <a
                    href=""
                    @click.stop.prevent="router.push({ name: 'products' })"
                    class="nav-link flex items-center px-3 py-2 rounded-lg hover:bg-sidebar-light text-gray-400 hover:text-white text-sm"
                  >
                    <span
                      class="w-1.5 h-1.5 rounded-full bg-gray-500 mr-3"
                    ></span>
                    <span>Список товаров</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    href=""
                    @click.stop.prevent="
                      router.push({ name: 'product-create' })
                    "
                    class="nav-link flex items-center px-3 py-2 rounded-lg hover:bg-sidebar-light text-gray-400 hover:text-white text-sm"
                  >
                    <span
                      class="w-1.5 h-1.5 rounded-full bg-gray-500 mr-3"
                    ></span>
                    <span>Добавление товара</span>
                  </a>
                </li>
              </ul>
            </li>

            <!-- Section Header -->
            <li class="nav-section-header px-3 py-2 mt-4">
              <span
                class="nav-section-text text-xs font-semibold text-gray-500 uppercase tracking-wider"
                >Заказы</span
              >
              <hr
                class="nav-section-divider hidden border-t border-sidebar-light mt-2"
              />
            </li>
          </ul>
        </nav>

        <!-- User Panel -->
        <div class="p-4 border-t border-sidebar-light shrink-0">
          <div class="flex items-center gap-3">
            <img
              src="https://ui-avatars.com/api/?name=Admin+User&background=3b82f6&color=fff"
              alt="Admin"
              class="w-10 h-10 rounded-full"
            />
            <div>
              <p class="text-sm font-medium text-white">Admin User</p>
              <p class="text-xs text-gray-400">Administrator</p>
            </div>
          </div>
        </div>
      </aside>

      <!-- Sidebar Overlay (mobile) -->
      <div class="sidebar-overlay"></div>

      <!-- Main Content -->
      <main
        class="main-content ml-sidebar pt-14 min-h-screen transition-[margin] duration-300"
      >
        <div class="p-4">
          <RouterView></RouterView>
        </div>

        <!-- Footer -->
        <!-- <footer class="bg-white border-t border-gray-200 p-4">
                    <div class="flex flex-col md:flex-row md:items-center md:justify-between text-sm text-gray-500">
                        <div>
                            <strong>Copyright &copy; 2026 <a href="https://adminlte.io"
                                    class="text-blue-600 hover:underline">AdminLTE.io</a>.</strong>
                            All rights reserved.
                        </div>
                        <div class="mt-2 md:mt-0">
                            <b>Version</b> 4.0.0-tailwind
                        </div>
                    </div>
                </footer> -->
      </main>
    </div>
  </div>
</template>
