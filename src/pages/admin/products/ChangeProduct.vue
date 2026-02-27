<script setup>
import { getCategories } from "@/api/admin/category.api";
import {
  createProduct,
  getProducts,
  updateProduct,
} from "@/api/admin/product.api";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

// import router from '@/router';
const router = useRouter();
const route = useRoute();
const title = ref();
const categories = ref([]);
const categoryId = ref();
const productId = ref();

const reset = () => {
  title.value = "";
};
const back = () => {
  router.push();
};

const submit = async () => {
  if (title.value && title.value.length) {
    const data = {
      meta: {
        title: title.value,
      },
      category_id: categoryId.value,
    };

    const response = await (async () => {
      if (productId.value) {
        //update\
        return await updateProduct(productId.value, data);
      } else {
        // create
        return await createProduct(data);
      }
    })();
    if (response) {
      router.push({ name: "products" });
    }
  }
};

onMounted(async () => {
  console.log(route.params?.id);

  if (route.params?.id) {
    productId.value = route.params.id;
    const response = await getProducts(productId.value);
    const data = response.data[0];
    title.value = data.meta.title;
    categoryId.value = data.category_id;
  }

  const responseCategories = await getCategories();
  if (responseCategories) {
    categories.value = responseCategories.data.map((item) => {
      return {
        id: item.id,
        title: item.meta.title,
      };
    });
  }
});
</script>
<template>
  <div class="card card-primary">
    <div class="card-header">
      <h3 class="text-lg font-medium text-gray-800">
        <span v-if="productId">Редактирование товара</span>
        <span v-else>Создание товара</span>
      </h3>
    </div>
    <div class="card-body">
      <div class="form-group">
        <label class="form-label">Select category</label>
        <select class="form-control" v-model="categoryId">
          <option v-for="item in categories" :key="item.id" :value="item.id">
            {{ item.title }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Title</label>
        <input
          v-model.trim="title"
          type="text"
          class="form-control"
          placeholder="Enter title category..."
        />
      </div>

      <div class="form-group">
        <label class="form-label">File Input</label>
        <input type="file" class="form-control" />
      </div>

      <div class="flex gap-2">
        <button @click="back" class="btn btn-info">Back</button>
        <button @click="submit" class="btn btn-primary">Submit</button>
        <button @click="reset" class="btn btn-secondary">Reset</button>
      </div>
    </div>
  </div>
</template>
