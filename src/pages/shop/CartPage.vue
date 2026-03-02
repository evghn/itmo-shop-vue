<script setup></script>
<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <h2 class="text-2xl font-bold mb-6">Ваша корзина</h2>
      <div v-if="cartItems.length === 0" class="text-center py-12">
        <p>Корзина пуста</p>
      </div>
      <div v-else>
        <div
          v-for="item in cartItems"
          :key="item.id"
          class="flex items-center justify-between border-b py-4"
        >
          <div>
            <h3>{{ item.name }}</h3>
            <p>{{ item.quantity }} x {{ item.price }} ₽</p>
          </div>
          <div>
            <span class="font-bold">{{ item.total }} ₽</span>
          </div>
        </div>
        <div class="mt-8 text-right">
          <p class="text-xl font-bold">Итого: {{ total }} ₽</p>
          <router-link
            to="/checkout"
            class="mt-4 inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg"
          >
            Оформить заказ
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
