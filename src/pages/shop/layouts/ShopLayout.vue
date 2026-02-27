<script setup>
import { getCategories } from '@/api/admin/category.api';
import { getProducts } from '@/api/admin/product.api';
import { getCategoriesData } from '@/pages/admin/lib/getCategories';
import { computed, onMounted, ref } from 'vue';

const products = ref([])
const categories = ref([])

const featuredProducts = [
  { id: 1, title: 'Товар 1', price: 1000 },
  { id: 2, title: 'Товар 2', price: 2000 },
  { id: 3, title: 'Товар 3', price: 1500 },
  { id: 4, title: 'Товар 4', price: 3000 }
]

const ProductCard = ({ product }) => (
  `<div class="bg-white p-4 rounded-lg shadow hover:shadow-md">
    <img src="${product.images[0]}" class="w-32 h-32"  alt="${product.meta.title}"/>
     <h3 class="font-semibold">${product.meta.title}</h3>     
   </div>`
)

const productRecommended = computed(() => {
    if (products.value.length) {
        return products.value.filter(item => item.meta.recommended)
    }
    return []
})

const getApiProducts = async () => {
  try {
    const response = await getProducts();

    if (response) {
      products.value = response.data.filter((val) => val?.meta);
    }
  } catch {
    products.value = [];
  }
};



onMounted(async () => {
  getApiProducts();
  const responseCategories = await getCategories();
  categories.value = getCategoriesData(responseCategories.data);
  
});
</script>
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 class="text-xl font-bold text-indigo-600">ShopName</h1>
        <nav>
          <ul class="flex space-x-6">
            <li><a href="/" class="font-medium text-gray-700 hover:text-indigo-600">Главная</a></li>
            <li><a href="/catalog" class="font-medium text-gray-700 hover:text-indigo-600">Каталог</a></li>
            <li><a href="/cart" class="font-medium text-gray-700 hover:text-indigo-600">Корзина</a></li>
            <li><a href="/profile" class="font-medium text-gray-700 hover:text-indigo-600">Профиль</a></li>
          </ul>
        </nav>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-20">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-4xl font-bold mb-4">Новые поступления уже здесь!</h2>
        <p class="mb-6 max-w-lg mx-auto">Откройте для себя лучшие предложения и эксклюзивные товары.</p>
        <button class="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
          Перейти в каталог
        </button>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="py-12 container mx-auto px-4">
      <h2 class="text-2xl font-bold mb-8 text-center">Рекомендуемые товары</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
        <div v-for="product in productRecommended" :key="product.id" :product="product"  class="text-center">
            <div class="bg-white p-4 rounded-lg shadow hover:shadow-md flex flex-col justify-center items-center">
    <img :src="product.images[0]" class="w-32 h-32"  alt="${product.meta.title}"/>
     <h3 class="font-semibold">{{ product.meta.title }}</h3>  
     <p class="text-indigo-600 font-bold">{{ product.meta.price ?? 0.0}} ₽</p>   
   </div>
        </div>    
        
            
        
      </div>
    </section>
    
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
</template>
