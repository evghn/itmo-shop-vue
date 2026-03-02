<script setup>
import { getCategories } from "@/api/shop/category.api";
import { onMounted, ref } from "vue";
import ProductCard from "./components/ProductCard.vue";
import { getCategoryProducts } from "@/api/shop/product.api";
import { useRouter } from "vue-router";
import { getCategoriesData } from "@/lib/getCategories";

const router = useRouter();
const categories = ref([]);
const categoryMap = ref([]);
const products = ref([]);

const handleAddToCart = (product) => {
  console.log("Добавлен в корзину:", product);
};

const goToProductDetails = (id) => {
  router.push({ name: "product", params: { id: id } });
};

const selectCategory = async (id) => {
  const res = await getCategoryProducts(id);
  if (res) {
    products.value = res.data;
  }
};

const getApiCategories = async () => {
  try {
    const response = await getCategories();

    if (response) {
      categories.value = response.data.filter((val) => val?.meta);
    }
  } catch {
    categories.value = [];
  }
};

onMounted(async () => {
  await getApiCategories();
  if (categories.value.length) {
    categoryMap.value = getCategoriesData(categories.value);
  }
});
</script>
<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <aside class="w-full md:w-1/4 float-left pr-4">
        <h3 class="text-lg font-bold mb-4">Категории</h3>
        <ul class="space-y-2">
          <li v-for="item in categories" :key="item.id" class="flex gap-3">
            <img
              v-if="item.photo"
              :src="item.photo"
              class="w-6 h-6"
              :alt="item.meta.title"
            />
            <a
              href=""
              class="block py-1 hover:text-indigo-600"
              @click.stop.prevent="selectCategory(item.id)"
              >{{ item.meta.title }}</a
            >
          </li>
        </ul>
      </aside>
      <main class="w-full md:w-3/4 float-right">
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6"
        >
          <product-card
            v-for="product in products"
            :key="product.id"
            :product="product"
            :categories="categoryMap"
            @view-details="goToProductDetails"
            @add-to-cart="handleAddToCart"
          />
        </div>
      </main>
    </div>
  </div>
</template>
