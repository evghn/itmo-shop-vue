<script setup>
import { onMounted, provide, ref, watch } from "vue";
import SignIn from "./../components/SignIn.vue";
import SignUp from "../components/SignUp.vue";
import { useUserStore } from "@/stores/store.user";

const userStore = useUserStore();
const modalLogin = ref(false);
const modalRegister = ref(false);

const loginClose = () => (modalLogin.value = false);
const registerClose = () => (modalRegister.value = false);
const changeInUpModal = (isRegister, isLogin) => {
  modalLogin.value = isLogin;
  modalRegister.value = isRegister;
};

provide("userLoginRegister", {
  loginClose,
  registerClose,
  changeInUpModal,
});
provide("loginClose");
provide("registerClose");

onMounted(() => {});
</script>
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow">
      <div
        class="container mx-auto px-4 py-4 flex justify-between items-center"
      >
        <h1 class="text-xl font-bold text-indigo-600">ShopName</h1>
        <nav>
          <ul class="flex space-x-6">
            <li>
              <a
                href="/"
                class="font-medium text-gray-700 hover:text-indigo-600"
                >Главная</a
              >
            </li>
            <li>
              <a
                href="/catalog"
                class="font-medium text-gray-700 hover:text-indigo-600"
                >Каталог</a
              >
            </li>
            <li>
              <a
                href="/cart"
                class="font-medium text-gray-700 hover:text-indigo-600"
                >Корзина</a
              >
            </li>
            <li>
              <a
                href="/profile"
                class="font-medium text-gray-700 hover:text-indigo-600"
                >Профиль</a
              >
            </li>
            <li v-if="!userStore.isAuthenticated">
              <a
                href=""
                class="font-medium text-gray-700 hover:text-indigo-600"
                @click.prevent.stop="modalLogin = true"
                >Вход</a
              >
            </li>
            <li v-if="userStore.isAuthenticated">
              <a
                href=""
                class="font-medium text-gray-700 hover:text-indigo-600"
                @click.prevent.stop="userStore.logout()"
                >Выход ({{ userStore.userData?.login }})</a
              >
            </li>
          </ul>
        </nav>
      </div>
    </header>

    <div class="p-4">
      <RouterView></RouterView>
    </div>
    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-8 mt-12">
      <div class="container mx-auto px-4 text-center">
        <p>&copy; 2026 ShopName. Все права защищены.</p>
      </div>
    </footer>
  </div>
  <sign-in v-if="modalLogin"></sign-in>
  <sign-up v-if="modalRegister"></sign-up>
</template>
