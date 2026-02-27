<script setup>
import {} from "@/api/admin/category.api";
import { deleteProduct, getProducts } from "@/api/admin/product.api";

import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const products = ref([]);

const handleCreate = () => {
  router.push({ name: "product-create" });
};

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

const updateProduct = (id) => {
  router.push({ name: "product-update", params: { id } });
};

const deleteProductItem = async (id) => {
  if (deleteProduct(id)) {
    getApiProducts();
  }
};

onMounted(async () => {
  getApiProducts();
});
</script>
<template>
  <div class="card mb-6">
    <div class="card-header">
      <h3 class="text-lg font-medium text-gray-800">Список товаров</h3>
    </div>
    <div class="mb-2 mt-4">
      <button
        class="btn btn-outline-success ml-3 cursor-pointer"
        @click="handleCreate"
      >
        Создать товар
      </button>
    </div>
    <div class="card-body p-0">
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Изображение</th>
              <th>Название</th>
              <th>Действие</th>
            </tr>
          </thead>
          <tbody v-if="products.length">
            <tr v-for="(item, index) in products" :key="item.id">
              <td>{{ index + 1 }}</td>
              <td>
                <div class="flex items-center gap-3">
                  <img
                    src="https://ui-avatars.com/api/?name=John+Doe&amp;background=3b82f6&amp;color=fff"
                    class="w-8 h-8 rounded-full"
                    alt="John Doe"
                  />
                </div>
              </td>
              <td>{{ item.meta.title }}</td>

              <td>
                <div class="flex gap-1">
                  <button
                    @click="updateProduct(item.id)"
                    class="btn btn-sm btn-outline-primary"
                  >
                    Edit
                  </button>
                  <button
                    @click="deleteProductItem(item.id)"
                    class="btn btn-sm btn-outline-danger"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="4">Данные пока отсутствуют</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
