<script setup>
import { useCartStore } from '@/stores/cart.app';


const cartStore = useCartStore();
const productPlus = (product_id) => {
  cartStore.addToCart(product_id)
}
const productMinus = (product_id) => {
  cartStore.decInCart(product_id)
}


</script>
<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <h2 class="text-2xl font-bold mb-6">Ваша корзина</h2>
      <div v-if="Object.keys(cartStore.cart.items).length === 0" class="text-center py-12">
        <p>Корзина пуста</p>
      </div>
      <div v-else>
        <div
          v-for="item  in cartStore.cart.items"
          :key="item.id"
          class="flex items-center justify-between border-b py-4"
        >
          <div>
            <h3>{{ item?.product?.meta?.title }}</h3>
            <p>{{ item.amount }} x {{ item.product?.price}} ₽</p>
          </div>
          <div class="flex gap-3">
              <button  @click="productMinus(item.product_id)"  class="text-lg cursor-pointer">-</button>
              <span class="font-bold">{{ item.amount }}</span>
              <button @click="productPlus(item.product_id)" class="text-lg cursor-pointer">+</button>

          </div>
          <div>
            <span class="font-bold">{{ item.total }} ₽</span>
          </div>
        </div>
        <div class="mt-8 text-right">
          <p class="text-xl font-bold">Итого: {{ cartStore.cart.total }} ₽</p>
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
