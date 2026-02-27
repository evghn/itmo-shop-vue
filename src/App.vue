<script setup>
import { onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from './stores/store.user';

onMounted(() => {
  const token = localStorage.getItem("token");
 
  if (token) {
    const user = useUserStore();
    const role = localStorage.getItem("role") ?? "client";
    user.setToken(token, role);
  }
})
</script>

<template>
  <div class="bg-gray-500 min-h-screen ">
    <RouterView />
  </div>
</template>
