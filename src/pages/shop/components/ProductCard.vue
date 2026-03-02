<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  categories: {
    type: Object,
    required: true,
  },
});

// Внутренний компонент звезды
defineEmits(["add-to-cart", "view-details"]);
</script>

<template>
  <div
    class="bg-white rounded-lg shadow overflow-hidden flex flex-col max-w-[18rem]"
  >
    <!-- Изображение товара -->
    <img
      :src="product.images[0] || '/placeholder.jpg'"
      :alt="product.meta.title"
      class="w-full h-48 object-cover"
    />

    <!-- Информация о товаре -->
    <div class="p-4 grow flex flex-col">
      <h3 class="text-lg font-semibold text-gray-800 truncate">
        {{ product.meta.title }}
      </h3>
      <p class="text-gray-600 text-sm mt-1 line-clamp-2">
        {{ categories[product.category_id]?.title }}
      </p>
      <p class="text-gray-600 text-sm mt-1 line-clamp-2">
        {{ product.meta.description }}
      </p>

      <!-- Цена -->
      <div class="mt-4 flex items-center justify-between">
        <span class="text-lg font-bold text-indigo-600"
          >{{ product.meta.price }} ₽</span
        >
        <span
          v-if="product.oldPrice"
          class="text-sm text-gray-500 line-through"
        >
          {{ product.meta.oldPrice }} ₽
        </span>
      </div>

      <!-- Рейтинг -->
      <!-- <div class="mt-2">
        <StarRating
          :rating="product.meta.rating"
          :reviews-count="product.meta.reviewsCount"
        />
      </div> -->
    </div>

    <!-- Кнопки -->
    <div class="p-4 border-t border-gray-100 flex justify-between gap-2">
      <button
        @click="$emit('add-to-cart', product.id)"
        class="flex-1 px-3 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
      >
        В корзину
      </button>
      <button
        @click="$emit('view-details', product.id)"
        class="p-2 border border-gray-300 rounded-lg hover:bg-gray-100"
      >
        Подробнее
      </button>
    </div>
  </div>
</template>
